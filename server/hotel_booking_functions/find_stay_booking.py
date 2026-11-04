from datetime import datetime
from backports.zoneinfo import ZoneInfo

from sqlalchemy import func

from models.HotelModels.WildEnterpriseHotels.BookingModel import WEHotelBookingModel

SA_TZ = ZoneInfo("Africa/Johannesburg")


def sa_today():
    # The server may run in UTC, but stays follow South African dates
    return datetime.now(SA_TZ).date()


def find_booking_by_credentials(data, model=WEHotelBookingModel, lock=False):
    """Looks a stay up by park + booking reference + email.
    Returns (booking, None) or (None, (error_dict, status))."""
    try:
        park_id = int(data["parkId"])
        ref = str(data["bookingRef"]).strip().upper()
        email = str(data["email"]).strip().lower()
    except (KeyError, ValueError, TypeError):
        return None, ({"error": "parkId, bookingRef and email are required"}, 400)

    # NOTE: assumes the model has booking_ref, email and park_id columns.
    # PartnerHotelBookingModel may need a join if it reaches the park via a hotel.
    query = model.query.filter(
        model.booking_ref == ref,
        model.park_id == park_id,
        func.lower(model.email) == email,
    )
    if lock:
        query = query.with_for_update()
    booking = query.first()

    # One message for wrong ref, wrong email or wrong park, so nobody can probe which was right
    if not booking:
        return None, ({"error": "We couldn't find a booking matching those details"}, 404)

    return booking, None