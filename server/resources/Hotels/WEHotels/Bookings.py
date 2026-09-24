from datetime import date

from flask import request

from config import db

from resources.BaseResource import BaseResource

from models.HotelModels.WildEnterpriseHotels.RoomModel import RoomModel
from models.HotelModels.WildEnterpriseHotels.BookingModel import BookingModel
from models.HotelModels.WildEnterpriseHotels.RoomBookingModel import RoomBookingModel
from models.HotelModels.WildEnterpriseHotels.RoomHoldModel import RoomHoldModel

from hotel_booking_functions.get_available_rooms import get_available_rooms
from hotel_booking_functions.price_room_stay import price_room_stay

from email_functions.send_hotel_stay_confirmation import send_guest_confirmation, send_hotel_notification
from email_functions.send_hotel_stay_changes_confirmed import send_guest_ammendment, send_hotel_ammendment

from decorators.require_hotel_login import require_hotel_login
from decorators.require_customer_or_hotel import require_customer_or_hotel

from functions.check_instance_exists import check_instance_exists

from flask import session


class BaseBooking(BaseResource):
    model = BookingModel

    field_map = {
        "name": "name",
        "email": "email",
        "arrival": "arrival_date",
        "departure": "departure_date",
    }


class AllBookings(BaseBooking):
    @require_hotel_login
    def get(self):
        # Only this hotel's bookings — not every hotel's guest list.
        hotel_id = session.get("hotel_id")
        bookings = BookingModel.query.filter_by(hotel_id=hotel_id).all()
        return [b.to_dict() for b in bookings], 200

    def post(self):
        data = request.get_json() or {}

        try:
            hotel_id = int(data["hotelId"])
            arrival = date.fromisoformat(data["arrival"])
            departure = date.fromisoformat(data["departure"])
            guests = int(data["guests"])
            room_selections = data["rooms"]  # [{roomId, quantity}, ...]
        except (KeyError, ValueError):
            return {"error": "hotelId, arrival, departure, guests, rooms are required"}, 400

        if departure <= arrival:
            return {"error": "departure must be after arrival"}, 400

        if not room_selections:
            return {"error": "At least one room selection is required"}, 400

        session_token = data.get("sessionToken")

        total_capacity = 0
        room_bookings = []

        for sel in room_selections:
            try:
                quantity = int(sel["quantity"])
                room_id = int(sel["roomId"])
            except (KeyError, ValueError):
                db.session.rollback()
                return {"error": "Each room selection needs a valid roomId and quantity"}, 400

            if quantity < 1:
                db.session.rollback()
                return {"error": "quantity must be at least 1"}, 400

            room = RoomModel.query.with_for_update().get(room_id)
            if not room:
                db.session.rollback()
                return {"error": f"Room {room_id} not found"}, 404

            if room.hotel_id != hotel_id:
                db.session.rollback()
                return {"error": f"Room '{room.name}' does not belong to the selected hotel"}, 400

            total_capacity += room.max_people * quantity

            available = get_available_rooms(
                room.id, arrival, departure,
                exclude_session_token=session_token
            )
            if available < quantity:
                db.session.rollback()
                return {"error": f"Only {available} of '{room.name}' available"}, 400

            unit_price = price_room_stay(room, arrival, departure)
            room_bookings.append(RoomBookingModel(
                room_id=room.id,
                quantity=quantity,
                unit_price=unit_price,
                price_locked=unit_price * quantity,
            ))

        if total_capacity < guests:
            db.session.rollback()
            return {
                "error": f"Selected rooms only accommodate {total_capacity} guests, but {guests} guests specified"
            }, 400

        booking = BookingModel(
            name=data["name"],
            email=data["email"],
            guests=guests,
            arrival_date=arrival,
            departure_date=departure,
            hotel_id=hotel_id,
            room_bookings=room_bookings,
        )
        db.session.add(booking)

        if session_token:
            RoomHoldModel.query.filter_by(session_token=session_token).delete()

        db.session.commit()

        send_guest_confirmation(booking)
        send_hotel_notification(booking)

        return booking.to_dict(), 201


class SpecificBooking(BaseBooking):
    @require_customer_or_hotel
    def get(self, id):
        return self.get_specific(id)

    @require_customer_or_hotel
    def patch(self, id):
        booking = check_instance_exists(BookingModel, id, True)
        result = self.patch_instance(id)
        send_guest_ammendment(booking=booking)
        send_hotel_ammendment(booking=booking)
        return result

    @require_customer_or_hotel
    def delete(self, id):
        return self.delete_instance(id)