# event_functions/check_in_ticket.py
from datetime import datetime
from functions.sa_today import sa_today


def check_in_ticket(ticket):
    if ticket.status == "Cancelled":
        raise ValueError("This ticket has been cancelled")
    if ticket.checked_in:
        raise ValueError("This ticket is already checked in")

    event = ticket.booking.event
    last_day = event.end_date or event.start_date
    if not (event.start_date <= sa_today() <= last_day):
        raise ValueError("This ticket can only be checked in while the event is on")

    ticket.checked_in = True
    ticket.status = "Checked In"
    ticket.checked_in_at = datetime.now()
    return ticket