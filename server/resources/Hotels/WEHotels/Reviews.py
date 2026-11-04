from datetime import datetime
from backports.zoneinfo import ZoneInfo

from flask import request
from flask_restful import Resource
from sqlalchemy import func

from config import db
from models.HotelModels.WildEnterpriseHotels.BookingModel import WEHotelBookingModel
from schemas.hotels.we_hotels.we_hotel_booking_schema import WeHotelReviewSchema

SA_TZ = ZoneInfo("Africa/Johannesburg")


def sa_today():
    # The server may run in UTC; "after departure" should follow South African dates
    return datetime.now(SA_TZ).date()


def find_reviewable_booking(data, lock=False):
    """Returns (booking, None) or (None, error_response)."""
    try:
        park_id = int(data["parkId"])
        ref = str(data["bookingRef"]).strip().upper()
        email = str(data["email"]).strip().lower()
    except (KeyError, ValueError, TypeError):
        return None, ({"error": "parkId, bookingRef and email are required"}, 400)

    query = WEHotelBookingModel.query.filter(
        WEHotelBookingModel.booking_ref == ref,
        WEHotelBookingModel.park_id == park_id,
        func.lower(WEHotelBookingModel.email) == email,
    )
    if lock:
        query = query.with_for_update()   # two simultaneous submissions can't both pass
    booking = query.first()

    # One generic message for a wrong ref, wrong email or wrong park,
    # so nobody can probe which part was right
    if not booking:
        return None, ({"error": "We couldn't find a booking matching those details"}, 404)

    if sa_today() <= booking.departure:
        return None, ({
            "error": f"You can leave a review once your stay has ended ({booking.departure.isoformat()})"
        }, 403)

    if booking.rating is not None:
        return None, ({"error": "This booking has already been reviewed"}, 409)

    return booking, None


class VerifyReviewBooking(Resource):
    def post(self):
        booking, error = find_reviewable_booking(request.get_json() or {})
        if error:
            return error
        return {"bookingName": booking.name}, 200


class AllReviews(Resource):
    def get(self):
        try:
            park_id = int(request.args["parkId"])
        except (KeyError, ValueError):
            return {"error": "parkId is required"}, 400

        reviews = (
            WEHotelBookingModel.query
            .filter(WEHotelBookingModel.park_id == park_id,
                    WEHotelBookingModel.rating.isnot(None))
            .order_by(WEHotelBookingModel.review_date.desc(), WEHotelBookingModel.id.desc())
            .limit(50)
            .all()
        )
        return WeHotelReviewSchema(many=True).dump(reviews), 200

    def post(self):
        data = request.get_json() or {}

        booking, error = find_reviewable_booking(data, lock=True)
        if error:
            return error

        try:
            booking.rating = data["rating"]
            booking.review = data["review"]
            booking.reviewer_name = data["reviewerName"]
        except KeyError:
            db.session.rollback()
            return {"error": "rating, review and reviewerName are required"}, 400
        except ValueError as e:        # raised by the model validators
            db.session.rollback()
            return {"error": str(e)}, 400

        booking.review_date = sa_today()   # never taken from the client
        db.session.commit()

        return WeHotelReviewSchema().dump(booking), 201