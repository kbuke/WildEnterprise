from datetime import date
 
from flask import request
from flask_restful import Resource  # adjust if you register routes differently
from sqlalchemy import extract
 
from config import db
 
# ---- adjust these import paths to match your project ------------------------
from models.ParkModels import ParkModel
from models.EventModels.EventModel import EventModel
from models.EventModels.EventBookingModel import EventBookingModel
from models.ActivityModels.BaseActivityModel import BaseActivityModel
from models.ActivityModels.ActivityBookingModel import ActivityBookingModel
from models.HotelModels.WildEnterpriseHotels.BookingModel import WEHotelBookingModel
# from models.HotelModels.WildEnterpriseHotels.WEHotelBookingModel import WEHotelBookingModel
# -----------------------------------------------------------------------------
 
 
def _empty_months():
    return {m: {"month": m, "hotel": 0.0, "events": 0.0, "activities": 0.0} for m in range(1, 13)}
 
 
def _event_booking_revenue(booking):
    """Money actually held for a booking: tickets that haven't been cancelled.
    Using tickets (not total_cost) means partial cancellations are handled."""
    return sum(t.price_paid for t in booking.tickets if t.status != "Cancelled")
 
 
def build_park_finance(park_id: int, year: int) -> dict:
    monthly = _empty_months()
 
    # ------------------------------------------------------------------ HOTEL
    # Revenue is counted in the month of ARRIVAL (when the stay happens).
    # If you later add a created_at to bookings you may prefer booking month.
    stays = (
        WEHotelBookingModel.query
        .filter(WEHotelBookingModel.park_id == park_id)
        .filter(extract("year", WEHotelBookingModel.arrival) == year)
        .all()
    )
    hotel_count = 0
    for stay in stays:
        revenue = sum(rb.price_locked or 0 for rb in stay.room_bookings)
        monthly[stay.arrival.month]["hotel"] += revenue
        hotel_count += 1
 
    # ------------------------------------------------------------- ACTIVITIES
    # Counted in the month the activity takes place (booking.date).
    activity_rows = (
        ActivityBookingModel.query
        .join(BaseActivityModel, ActivityBookingModel.activity_id == BaseActivityModel.id)
        .filter(BaseActivityModel.park_id == park_id)
        .filter(extract("year", ActivityBookingModel.date) == year)
        .all()
    )
    per_activity = {}
    for ab in activity_rows:
        price = ab.total_price or 0
        monthly[ab.date.month]["activities"] += price
        entry = per_activity.setdefault(ab.activity_id, {
            "id": ab.activity_id,
            "name": ab.activity.name,
            "revenue": 0.0,
            "bookings": 0,
            "people": 0,
        })
        entry["revenue"] += price
        entry["bookings"] += 1
        entry["people"] += ab.no_of_people
 
    # ----------------------------------------------------------------- EVENTS
    # Monthly: counted in the month the booking was MADE (when cash came in).
    # Per-event: all-time revenue for that event, whatever year it was booked.
    event_bookings = (
        EventBookingModel.query
        .join(EventModel, EventBookingModel.event_id == EventModel.id)
        .filter(EventModel.park_id == park_id)
        .all()
    )
    per_event = {}
    for eb in event_bookings:
        if eb.booking_status == "Cancelled":
            continue
        revenue = _event_booking_revenue(eb)
        active = len(eb.active_tickets)
 
        entry = per_event.setdefault(eb.event_id, {"revenue": 0.0, "tickets": 0, "bookings": 0})
        entry["revenue"] += revenue
        entry["tickets"] += active
        entry["bookings"] += 1
 
        if eb.booking_date.year == year:
            monthly[eb.booking_date.month]["events"] += revenue
 
    events_in_year = (
        EventModel.query
        .filter(EventModel.park_id == park_id)
        .filter(extract("year", EventModel.start_date) == year)
        .order_by(EventModel.start_date)
        .all()
    )
    events_out = []
    for ev in events_in_year:
        stats = per_event.get(ev.id, {"revenue": 0.0, "tickets": 0, "bookings": 0})
        capacity = ev.no_of_tickets or 0
        events_out.append({
            "id": ev.id,
            "name": ev.name,
            "start_date": ev.start_date.isoformat(),
            "ticket_price": ev.ticket_price,
            "no_of_tickets": capacity,
            "tickets_sold": stats["tickets"],
            "sell_through": round(stats["tickets"] / capacity, 3) if capacity else 0,
            "bookings": stats["bookings"],
            "revenue": stats["revenue"],
            "potential_revenue": capacity * ev.ticket_price,
        })
 
    # ----------------------------------------------------------------- TOTALS
    months_out = []
    for m in range(1, 13):
        row = monthly[m]
        row["total"] = row["hotel"] + row["events"] + row["activities"]
        months_out.append(row)
 
    totals = {
        "hotel": sum(r["hotel"] for r in months_out),
        "events": sum(r["events"] for r in months_out),
        "activities": sum(r["activities"] for r in months_out),
    }
    totals["total"] = totals["hotel"] + totals["events"] + totals["activities"]
 
    return {
        "year": year,
        "totals": totals,
        "counts": {
            "hotel_stays": hotel_count,
            "activity_bookings": len(activity_rows),
            "event_bookings": sum(1 for eb in event_bookings
                                  if eb.booking_status != "Cancelled"
                                  and eb.booking_date.year == year),
        },
        "monthly": months_out,
        "events": events_out,
        "activities": sorted(per_activity.values(), key=lambda a: a["revenue"], reverse=True),
    }
 
 
class ParkFinance(Resource):
    def get(self, id):
        year = request.args.get("year", type=int) or date.today().year
        if not db.session.get(ParkModel, id):
            return {"error": "Park not found"}, 404
        return build_park_finance(id, year), 200