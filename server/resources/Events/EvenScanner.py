from flask import request
from flask_restful import Resource

from config import db

from models.EventModels.EventModel import EventModel
from models.EventModels.EventBookingModel import EventBookingModel
from models.EventModels.EventTicketModel import EventTicketModel

from event_functions.check_in_ticket import check_in_ticket, CheckInError

from decorators.require_scanner_admin_login import require_scanner_admin_login


def _tickets_for_event(event_id):
    return (
        EventTicketModel.query
        .join(EventBookingModel, EventTicketModel.booking_id == EventBookingModel.id)
        .filter(EventBookingModel.event_id == event_id)
    )


def _event_counts(event_id):
    """Scanned vs purchased for the whole event. Cancelled tickets aren't 'purchased'."""
    base = _tickets_for_event(event_id)
    return {
        "checked_in": base.filter(EventTicketModel.checked_in.is_(True)).count(),
        "total": base.filter(EventTicketModel.status != "Cancelled").count(),
    }


def _ticket_info(ticket):
    return {
        "id": ticket.id,
        "ticket_ref": ticket.ticket_ref,
        "attendee_name": ticket.attendee_name,
        "checked_in_at": ticket.checked_in_at.isoformat() if ticket.checked_in_at else None,
    }


def _booking_info(booking):
    active = booking.active_tickets
    return {
        "booking_ref": booking.booking_ref,
        "name": booking.name,
        "tickets_total": len(active),
        "tickets_checked_in": sum(1 for t in active if t.checked_in),
    }


class CheckInTicket(Resource):
    """POST /eventtickets/checkin   body: {"ticketRef": "...", "eventId": 1}"""

    @require_scanner_admin_login
    def post(self):
        data = request.get_json(silent=True)

        if not data:
            return {"error": "Missing JSON data", "code": "bad_request"}, 400

        ticket_ref = str(data.get("ticketRef") or "").strip()
        event_id = data.get("eventId")

        if not ticket_ref:
            return {"error": "ticketRef is required", "code": "bad_request"}, 400

        # bool is a subclass of int in Python, so rule it out explicitly
        if not isinstance(event_id, int) or isinstance(event_id, bool):
            return {"error": "eventId is required", "code": "bad_request"}, 400

        ticket = EventTicketModel.query.filter_by(ticket_ref=ticket_ref).first()

        if not ticket:
            return {"error": "No ticket matches this code", "code": "invalid"}, 404

        try:
            check_in_ticket(ticket, event_id)
            db.session.commit()

        except CheckInError as e:
            db.session.rollback()
            body = {"error": str(e), "code": e.code}

            # Give staff who/when for repeat scans, but don't expose another
            # event's customer details when the ticket is for the wrong event.
            if e.code != "wrong_event":
                body["ticket"] = _ticket_info(ticket)
                body["booking"] = _booking_info(ticket.booking)

            return body, e.status

        return {
            "code": "checked_in",
            "message": "Ticket successfully checked in",
            "ticket": _ticket_info(ticket),
            "booking": _booking_info(ticket.booking),
            "event": _event_counts(event_id),
        }, 200


class EventScanStats(Resource):
    """GET /eventtickets/stats/<event_id>  - header numbers and recent scans for the scanner page"""

    @require_scanner_admin_login
    def get(self, event_id):
        event = db.session.get(EventModel, event_id)

        if not event:
            return {"error": f"Event {event_id} not found"}, 404

        counts = _event_counts(event_id)

        recent = (
            _tickets_for_event(event_id)
            .filter(EventTicketModel.checked_in.is_(True))
            .order_by(EventTicketModel.checked_in_at.desc())
            .limit(5)
            .all()
        )

        return {
            "event": {
                "id": event.id,
                "name": event.name,
                "start_date": event.start_date.isoformat(),
                "end_date": event.end_date.isoformat() if event.end_date else None,
            },
            **counts,
            "remaining": counts["total"] - counts["checked_in"],
            "recent": [
                {
                    **_ticket_info(t),
                    "booking_ref": t.booking.booking_ref,
                    "booking_name": t.booking.name,
                }
                for t in recent
            ],
        }, 200


# app.py (replace the CheckInTicket import from resources.Events.EventTicket):
# from resources.Events.EventScanner import CheckInTicket, EventScanStats
# api.add_resource(CheckInTicket, "/eventtickets/checkin")
# api.add_resource(EventScanStats, "/eventtickets/stats/<int:event_id>")