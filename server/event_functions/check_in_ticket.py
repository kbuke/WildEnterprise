# event_functions/check_in_ticket.py
from datetime import datetime

from config import db
from functions.sa_today import sa_today


class CheckInError(ValueError):
    """A scan that can't be accepted.

    Subclasses ValueError so any existing `except ValueError` still catches it.
    `code` is a stable string the frontend switches on; `status` is the HTTP status.
    """

    def __init__(self, code, message, status=409):
        super().__init__(message)
        self.code = code
        self.status = status


def check_in_ticket(ticket, event_id=None):
    """Check one ticket in.

    Always pass event_id from the scanner: it's what stops a valid ticket for a
    *different* event being accepted at this gate.
    """
    booking = ticket.booking
    event = booking.event

    # 1. Right event?
    if event_id is not None and booking.event_id != event_id:
        raise CheckInError(
            "wrong_event",
            f"This ticket is for a different event: {event.name}",
        )

    # 2. Still a live ticket?
    if ticket.status == "Cancelled" or booking.booking_status == "Cancelled":
        raise CheckInError("cancelled", "This ticket has been cancelled")

    # 3. Not already scanned? (fast path; the atomic update below is the real guard)
    if ticket.checked_in:
        raise CheckInError("already_checked_in", "This ticket has already been scanned")

    # 4. Is the event on today?
    last_day = event.end_date or event.start_date
    if not (event.start_date <= sa_today() <= last_day):
        raise CheckInError(
            "not_today",
            "This ticket can only be checked in while the event is on",
        )

    # 5. Claim the ticket atomically. The WHERE clause means that if two phones scan
    # the same code at the same instant, the database lets exactly one of them
    # through (rowcount 1) and the other gets rowcount 0.
    claimed = (
        type(ticket).query
        .filter_by(id=ticket.id, checked_in=False, status="Valid")
        .update(
            {
                "checked_in": True,
                "status": "Checked In",
                "checked_in_at": datetime.now(),
            },
            synchronize_session=False,
        )
    )

    db.session.refresh(ticket)  # pick up whatever the database now says

    if claimed == 0:
        if ticket.checked_in:
            raise CheckInError("already_checked_in", "This ticket has already been scanned")
        raise CheckInError("invalid_status", f"A {ticket.status.lower()} ticket can't be checked in")

    return ticket