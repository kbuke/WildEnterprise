from flask import request
from flask_restful import Resource
from sqlalchemy import func

from config import db

from models.EventModels.EventModel import EventModel
from models.EventModels.EventBookingModel import EventBookingModel

from decorators.require_admin_login import require_admin_login

from event_functions.create_event_booking import create_event_booking
from event_functions.cancel_event_booking import cancel_event_tickets

from schemas.event_bookings import EventBookingSchema, EventBookingAdminSchema


def find_event_booking(data):
    """Booking reference + email must both match."""
    ref = str(data.get("bookingRef") or "").strip().upper()
    email = str(data.get("email") or "").strip().lower()
    if not ref or not email:
        return None, ({"error": "bookingRef and email are required"}, 400)

    booking = EventBookingModel.query.filter(
        EventBookingModel.booking_ref == ref,
        func.lower(EventBookingModel.email) == email,
    ).first()

    # One message for a wrong ref or a wrong email
    if not booking:
        return None, ({"error": "We couldn't find a booking matching those details"}, 404)
    return booking, None


class AllEventBookings(Resource):
    @require_admin_login
    def get(self):
        bookings = EventBookingModel.query.order_by(EventBookingModel.id.desc()).all()
        return EventBookingAdminSchema(many=True).dump(bookings), 200


class PostEventBooking(Resource):
    def post(self):
        data = request.get_json() or {}

        try:
            event_id = int(data["eventId"])
        except (KeyError, ValueError, TypeError):
            return {"error": "eventId is required"}, 400

        event = EventModel.query.get(event_id)
        if not event:
            return {"error": "Event does not exist"}, 404

        try:
            booking = create_event_booking(
                event=event,
                name=data.get("name"),
                email=data.get("email"),
                attendees=data.get("attendees"),
                send_separately=data.get("sendTicketsToAll") is True,
            )
        except ValueError as e:
            db.session.rollback()
            return {"error": str(e)}, 400

        return EventBookingSchema().dump(booking), 201


class LookupEventBooking(Resource):
    def post(self):
        booking, error = find_event_booking(request.get_json() or {})
        if error:
            return error
        return EventBookingSchema().dump(booking), 200


class CancelEventBooking(Resource):
    def post(self):
        data = request.get_json() or {}
        booking, error = find_event_booking(data)
        if error:
            return error

        tickets = None                      # omitted ticketIds means cancel everything
        ids = data.get("ticketIds")
        if ids is not None:
            if (not isinstance(ids, list) or not ids
                    or not all(isinstance(i, int) and not isinstance(i, bool) for i in ids)):
                return {"error": "ticketIds must be a non-empty list of ids"}, 400
            by_id = {t.id: t for t in booking.tickets}
            if any(i not in by_id for i in ids):
                return {"error": "Those tickets don't belong to this booking"}, 400
            tickets = [by_id[i] for i in set(ids)]

        try:
            refund = cancel_event_tickets(booking, tickets)
            db.session.commit()
        except ValueError as e:
            db.session.rollback()
            return {"error": str(e)}, 400

        return {"refund": refund, "booking": EventBookingSchema().dump(booking)}, 200