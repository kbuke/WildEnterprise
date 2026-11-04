# event_functions/cancel_event_booking.py
from models.EventModels.EventModel import EventModel
from models.EventModels.EventTicketModel import EventTicketModel

from functions.sa_today import sa_today

MIN_DAYS_BEFORE = 14


def cancel_event_tickets(booking, tickets=None):
    """tickets=None cancels everything still valid. Returns the refund amount.
    The caller commits."""
    event = booking.event
    if (event.start_date - sa_today()).days < MIN_DAYS_BEFORE:
        raise ValueError(f"Tickets can only be cancelled {MIN_DAYS_BEFORE} or more days before the event")

    if tickets is None:
        targets = [t for t in booking.tickets if t.status == "Valid"]
    else:
        targets = list(tickets)
    if not targets:
        raise ValueError("There are no tickets to cancel")

    ids = [t.id for t in targets]
    # Only rows still "Valid" are changed, so a double click can't release the seats twice
    changed = (
        EventTicketModel.query
        .filter(EventTicketModel.id.in_(ids), EventTicketModel.status == "Valid")
        .update({EventTicketModel.status: "Cancelled"}, synchronize_session=False)
    )
    if changed != len(ids):
        raise ValueError("Some of those tickets were already cancelled or used")

    EventModel.query.filter_by(id=event.id).update({
        EventModel.tickets_sold: EventModel.tickets_sold - changed,
        EventModel.tickets_remaining: EventModel.tickets_remaining + changed,
    }, synchronize_session=False)

    left = EventTicketModel.query.filter(
        EventTicketModel.booking_id == booking.id,
        EventTicketModel.status != "Cancelled",
    ).count()
    booking.booking_status = "Partially Cancelled" if left else "Cancelled"

    return sum(t.price_paid for t in targets)