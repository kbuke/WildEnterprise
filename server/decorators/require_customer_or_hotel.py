from functools import wraps
from flask import request, session
from functions.check_instance_exists import check_instance_exists
from models.HotelModels.WildEnterpriseHotels.BookingModel import BookingModel

def require_customer_or_hotel(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        booking_id = kwargs.get("id")
        booking = check_instance_exists(BookingModel, booking_id, True)

        # Hotel admin for this booking's hotel
        if session.get("hotel_id") == booking.hotel_id:
            return f(*args, **kwargs)

        # Customer: ref + name must match this specific booking
        data = request.get_json(silent=True) or {}
        ref = data.get("bookingRef")
        name = data.get("name")
        if ref and name and ref == booking.booking_ref and name.strip().lower() == booking.name.strip().lower():
            return f(*args, **kwargs)

        return {"error": "Unauthorized"}, 401
    return wrapper