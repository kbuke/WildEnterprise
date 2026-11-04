# event_functions/create_event_booking.py
from config import db

from models.EventModels.EventModel import EventModel
from models.EventModels.EventBookingModel import EventBookingModel

from functions.sa_today import sa_today
from functions.check_valid_email import check_validate_email

from event_functions.create_event_tickets import create_event_tickets
from email_functions.send_event_ticket import send_booking_tickets

MAX_TICKETS_PER_BOOKING = 10


def create_event_booking(event, name, email, attendees, send_separately):
    name = (name or "").strip()
    if len(name) < 2:
        raise ValueError("Please enter your name")
    email = check_validate_email((email or "").strip())

    if not isinstance(attendees, list) or not 1 <= len(attendees) <= MAX_TICKETS_PER_BOOKING:
        raise ValueError(f"You can book 1 to {MAX_TICKETS_PER_BOOKING} tickets at a time")

    if (event.end_date or event.start_date) < sa_today():
        raise ValueError("This event has already finished")

    party = len(attendees)

    # Build tickets first: bad names or emails fail before we touch the database
    tickets = create_event_tickets(attendees, event.ticket_price, email, send_separately)

    # Claim the tickets in one atomic statement, so two buyers can't both take the last one
    claimed = (
        EventModel.query
        .filter(EventModel.id == event.id, EventModel.tickets_remaining >= party)
        .update({
            EventModel.tickets_remaining: EventModel.tickets_remaining - party,
            EventModel.tickets_sold: EventModel.tickets_sold + party,
        }, synchronize_session=False)
    )
    if not claimed:
        db.session.rollback()
        raise ValueError("Not enough tickets remaining")

    booking = EventBookingModel(
        name=name,
        email=email,
        no_of_people=party,
        total_cost=event.ticket_price * party,
        event_id=event.id,
        send_tickets_to_all=send_separately,
        tickets=tickets,
    )
    db.session.add(booking)
    db.session.commit()          # booking saved; email problems can't undo it

    send_booking_tickets(booking)
    return booking