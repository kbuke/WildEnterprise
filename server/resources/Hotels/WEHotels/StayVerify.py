# resources/Hotels/WEHotels/StayVerify.py
from flask import request
from flask_restful import Resource

from hotel_booking_functions.find_stay_booking import find_booking_by_credentials, sa_today


class VerifyStay(Resource):
    def post(self):
        booking, error = find_booking_by_credentials(request.get_json() or {})
        if error:
            return error
        if sa_today() > booking.departure:
            return {"error": "This stay has already ended"}, 403
        return {
            "bookingName": booking.name,
            "arrival": booking.arrival.isoformat(),
            "departure": booking.departure.isoformat(),
            "guests": booking.guests,
        }, 200