from collections import defaultdict
from datetime import date, timedelta
 
from flask_restful import Resource
 
from config import db
 
from models.EventModels.EventModel import EventModel
from models.EventModels.EventBookingModel import EventBookingModel
 
# If your cancel endpoint already has this rule as a constant, import that
# instead so the table and the real rule can never drift apart.
CANCELLATION_WINDOW_DAYS = 28
 
 
def _paid(booking):
    return sum(t.price_paid for t in booking.tickets if t.status != "Cancelled")
 
 
def _refunded(booking):
    return sum(t.price_paid for t in booking.tickets if t.status == "Cancelled")
 
 
def _build_timeline(start, end, revenue_by_date, tickets_by_date, today):
    """Bucket sales between `start` and `end`. Daily when the window is short,
    weekly when it is long, so the charts stay readable."""
    days = (end - start).days + 1
    step = 1 if days <= 60 else 7
 
    points = []
    cum_revenue = 0
    cum_tickets = 0
    cursor = start
    while cursor <= end:
        bucket_end = cursor + timedelta(days=step)  # exclusive
        revenue = sum(v for d, v in revenue_by_date.items() if cursor <= d < bucket_end)
        tickets = sum(v for d, v in tickets_by_date.items() if cursor <= d < bucket_end)
        cum_revenue += revenue
        cum_tickets += tickets
 
        in_future = cursor > today
        points.append({
            "date": cursor.isoformat(),
            "revenue": revenue,
            "tickets": tickets,
            # null for buckets that haven't happened yet, so the line stops at today
            "cumulative_revenue": None if in_future else cum_revenue,
            "cumulative_tickets": None if in_future else cum_tickets,
        })
        cursor = bucket_end
 
    return ("day" if step == 1 else "week"), points
 
 
def build_event_finance(event):
    today = date.today()
    cancel_deadline = event.start_date - timedelta(days=CANCELLATION_WINDOW_DAYS)
 
    bookings = (
        EventBookingModel.query
        .filter(EventBookingModel.event_id == event.id)
        .order_by(EventBookingModel.booking_date.desc(), EventBookingModel.id.desc())
        .all()
    )
 
    revenue_by_date = defaultdict(float)
    tickets_by_date = defaultdict(int)
    rows = []
 
    revenue = 0.0
    refunded = 0.0
    tickets_sold = 0
    live_bookings = 0
    cancelled_bookings = 0
 
    for b in bookings:
        paid = _paid(b)
        refund = _refunded(b)
        active = len(b.active_tickets)
 
        revenue += paid
        refunded += refund
        tickets_sold += active
 
        if b.booking_status == "Cancelled":
            cancelled_bookings += 1
        else:
            live_bookings += 1
 
        # Net revenue is attributed to the day of booking (we don't store a
        # cancellation date), so cancelled tickets simply never show up.
        revenue_by_date[b.booking_date] += paid
        tickets_by_date[b.booking_date] += active
 
        rows.append({
            "id": b.id,
            "booking_ref": b.booking_ref,
            "name": b.name,
            "email": b.email,
            "no_of_people": b.no_of_people,
            "active_tickets": active,
            "booking_date": b.booking_date.isoformat(),
            "total_cost": b.total_cost,
            "paid": paid,
            "refunded": refund,
            "booking_status": b.booking_status,
            "payment_status": b.payment_status,
            "can_cancel": b.booking_status != "Cancelled" and active > 0 and today <= cancel_deadline,
        })
 
    # Timeline runs from when the event was created to the event itself.
    # No created_at yet? Fall back to the first booking, then the event date.
    booking_dates = list(revenue_by_date.keys())
    created = getattr(event, "created_at", None)
    start = min([d for d in [created] + booking_dates if d is not None] or [event.start_date])
    end = max([event.start_date] + booking_dates)
    granularity, timeline = _build_timeline(start, end, revenue_by_date, tickets_by_date, today)
 
    capacity = event.no_of_tickets or 0
    potential = capacity * (event.ticket_price or 0)
 
    return {
        "event": {
            "id": event.id,
            "name": event.name,
            "start_date": event.start_date.isoformat(),
            "ticket_price": event.ticket_price,
            "no_of_tickets": capacity,
            "timeline_start": start.isoformat(),
        },
        "summary": {
            "revenue": revenue,
            "refunded": refunded,
            "tickets_sold": tickets_sold,
            "no_of_tickets": capacity,
            "sell_through": round(tickets_sold / capacity, 3) if capacity else 0,
            "potential_revenue": potential,
            "bookings": live_bookings,
            "cancelled_bookings": cancelled_bookings,
            "average_booking_value": round(revenue / live_bookings, 2) if live_bookings else 0,
            "days_until_event": (event.start_date - today).days,
            "cancellation_deadline": cancel_deadline.isoformat(),
        },
        "granularity": granularity,
        "timeline": timeline,
        "bookings": rows,
    }
 
 
class EventFinance(Resource):
    # TODO: protect with your admin auth check
    def get(self, id):
        event = db.session.get(EventModel, id)
        if not event:
            return {"error": "Event not found"}, 404
        return build_event_finance(event), 200