# event_functions/create_event_tickets.py
from models.EventModels.EventTicketModel import EventTicketModel


def create_event_tickets(attendees, price, booker_email, send_separately):
    """Guest 1 is always the booker. Others get their own email only in separate mode."""
    tickets = []
    for i, attendee in enumerate(attendees):
        if not isinstance(attendee, dict):
            raise ValueError("Each attendee needs a name")

        if i == 0 or not send_separately:
            email = booker_email
        else:
            email = (attendee.get("email") or "").strip()
            if not email:
                raise ValueError(f"Guest {i + 1} needs an email address to send their ticket to")

        tickets.append(EventTicketModel(
            attendee_name=attendee.get("name"),
            attendee_email=email,
            price_paid=price,
        ))
    return tickets