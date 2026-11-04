import calendar
from datetime import date as date_cls, timedelta

from flask import request
from sqlalchemy.exc import IntegrityError

from config import db

from models.ActivityModels.ActivityBookingModel import ActivityBookingModel
from models.ActivityModels.BaseActivityModel import BaseActivityModel
from models.HotelModels.WildEnterpriseHotels.BookingModel import WEHotelBookingModel
from models.HotelModels.PartnerHotels.PartnerHotelBookingsModel import PartnerHotelBookingModel

from resources.BaseResource import BaseResource

from hotel_booking_functions.find_stay_booking import find_booking_by_credentials, sa_today

from schemas.activity_schemas.activity_bookings import ActivityBookingSchema, ActivityBookingDetailedSchema

MAX_ADVANCE_DAYS = 365
STAY_INCLUDES_DEPARTURE_DAY = True   # set False if checkout day shouldn't count

# stayType -> (model to look the stay up in, column on ActivityBookingModel)
STAY_TYPES = {
    "we": (WEHotelBookingModel, "hotel_booking_id"),
    "partner": (PartnerHotelBookingModel, "partner_hotel_booking_id"),
}


def fail(message, status):
    db.session.rollback()   # also releases the row lock on the stay
    return {"error": message}, status


class BaseActivityBooking(BaseResource):
    model = ActivityBookingModel

    schema = ActivityBookingSchema

    detail_schema = ActivityBookingDetailedSchema

    # No stay ids here: otherwise a PATCH could attach a booking to someone else's stay
    field_map = {
        "date": "date",
        "noOfPeople": "no_of_people",
        "activityId": "activity_id",
    }


class AllActivityBookings(BaseActivityBooking):
    # WARNING: this is public and lists every booking. Protect it or remove it.
    def get(self):
        return self.get_all()

    def post(self):
        data = request.get_json() or {}

        # ------------------------------------------------------------
        # Basic input
        # ------------------------------------------------------------
        try:
            activity_id = int(data["activityId"])
            no_of_people = int(data["noOfPeople"])
            activity_date = date_cls.fromisoformat(data["date"])
        except (KeyError, ValueError, TypeError):
            return {"error": "activityId, noOfPeople and date are required"}, 400

        if no_of_people < 1:
            return {"error": "noOfPeople must be at least 1"}, 400

        today = sa_today()
        if activity_date < today:
            return {"error": "You can't book an activity in the past"}, 400
        if activity_date > today + timedelta(days=MAX_ADVANCE_DAYS):
            return {"error": f"Activities can be booked up to {MAX_ADVANCE_DAYS} days ahead"}, 400

        # ------------------------------------------------------------
        # Activity + seasonal check (applies to the specific day booked)
        # ------------------------------------------------------------
        activity = BaseActivityModel.query.get(activity_id)
        if not activity:
            return {"error": "Activity not found"}, 404

        if (not activity.all_year_round and activity.available_months
                and activity_date.month not in activity.available_months):
            return {
                "error": f"{activity.name} isn't available in {calendar.month_name[activity_date.month]}"
            }, 400

        # ------------------------------------------------------------
        # Stay verification (only if the person says they're staying)
        # ------------------------------------------------------------
        hotel_booking = None
        fk_name = None

        if data.get("bookingRef") or data.get("email"):
            stay_type = data.get("stayType", "we")
            if stay_type not in STAY_TYPES:
                return {"error": "stayType must be 'we' or 'partner'"}, 400

            model, fk_name = STAY_TYPES[stay_type]

            # parkId comes from the activity, so the stay must be at the activity's park
            hotel_booking, error = find_booking_by_credentials(
                {**data, "parkId": activity.park_id}, model=model, lock=True
            )
            if error:
                return fail(*error)

            if no_of_people > hotel_booking.guests:
                return fail(
                    f"Your stay is booked for {hotel_booking.guests} guest(s), "
                    f"so you can't book for {no_of_people}", 400)

            last_day = hotel_booking.departure
            if not STAY_INCLUDES_DEPARTURE_DAY:
                last_day -= timedelta(days=1)

            if not (hotel_booking.arrival <= activity_date <= last_day):
                return fail(
                    f"Your stay runs from {hotel_booking.arrival} to {hotel_booking.departure}. "
                    "Please pick a day within it", 400)

            already = ActivityBookingModel.query.filter_by(
                activity_id=activity.id, date=activity_date, **{fk_name: hotel_booking.id}
            ).first()
            if already:
                return fail(f"You've already booked {activity.name} for {activity_date}", 409)

        # ------------------------------------------------------------
        # Price: always calculated here, never taken from the client
        # ------------------------------------------------------------
        total_price = activity.price * no_of_people
        if hotel_booking:
            if activity.free_with_stay:
                total_price = 0.0
            elif activity.discount_with_stay:
                total_price = total_price * (1 - (activity.stay_discount or 0))

        # ------------------------------------------------------------
        # Create
        # ------------------------------------------------------------
        activity_booking = ActivityBookingModel(
            date=activity_date,
            no_of_people=no_of_people,
            activity_id=activity.id,
            total_price=round(total_price, 2),
            **({fk_name: hotel_booking.id} if hotel_booking else {}),
        )
        db.session.add(activity_booking)

        try:
            db.session.commit()
        except IntegrityError:   # two simultaneous requests slipped past the check
            return fail(f"You've already booked {activity.name} for {activity_date}", 409)

        return ActivityBookingSchema().dump(activity_booking), 201


class SpecificActivityBooking(BaseActivityBooking):
    def get(self, id):
        return self.get_specific(id)

    def patch(self, id):
        return self.patch_instance(id)

    def delete(self, id):
        return self.delete_instance(id)

# from datetime import date as date_cls

# from flask import request

# from config import db

# from models.ActivityModels.ActivityBookingModel import ActivityBookingModel
# from models.ActivityModels.BaseActivityModel import BaseActivityModel
# from models.HotelModels.WildEnterpriseHotels.BookingModel import WEHotelBookingModel
# from models.HotelModels.PartnerHotels.PartnerHotelBookingsModel import PartnerHotelBookingModel

# from resources.BaseResource import BaseResource

# from functions.check_instance_exists import check_instance_exists

# from schemas.activity_schemas.activity_bookings import ActivityBookingSchema, ActivityBookingDetailedSchema


# class BaseActivityBooking(BaseResource):
#     model = ActivityBookingModel

#     schema = ActivityBookingSchema

#     detail_schema = ActivityBookingDetailedSchema

#     field_map = {
#         "date": "date",
#         "noOfPeople": "no_of_people",
#         "activityId": "activity_id",
#         "hotelBookingId": "hotel_booking_id",
#         "partnerHotelBookingId": "partner_hotel_booking_id"
#     }


# class AllActivityBookings(BaseActivityBooking):

#     def get(self):
#         return self.get_all()

#     def post(self):
#         data = request.get_json() or {}

#         # ================================================================
#         # VALIDATE BASIC INPUT
#         # ================================================================

#         try:
#             activity_id = int(data["activityId"])
#             no_of_people = int(data["noOfPeople"])
#             activity_date = date_cls.fromisoformat(data["date"])
#         except (KeyError, ValueError, TypeError):
#             return {
#                 "error": "activityId, noOfPeople and date are required"
#             }, 400

#         if no_of_people < 1:
#             return {
#                 "error": "noOfPeople must be at least 1"
#             }, 400

#         # ================================================================
#         # GET ACTIVITY
#         # ================================================================

#         activity = check_instance_exists(
#             model=BaseActivityModel,
#             id=activity_id,
#             return_instance=True
#         )

#         if not activity:
#             return {
#                 "error": "Activity not found"
#             }, 404

#         # ================================================================
#         # CHECK ACTIVITY AVAILABILITY
#         # ================================================================

#         if (
#             activity.all_year_round is False
#             and activity.available_months
#         ):
#             if activity_date.month not in activity.available_months:
#                 return {
#                     "error": (
#                         f"This activity is not available "
#                         f"in month {activity_date.month}"
#                     )
#                 }, 400

#         # ================================================================
#         # CHECK HOTEL BOOKINGS
#         # ================================================================

#         hotel_booking = None
#         hotel_booking_id = None

#         we_hotel_booking_id = data.get("hotelBookingId")
#         partner_hotel_booking_id = data.get(
#             "partnerHotelBookingId"
#         )

#         # ------------------------------------------------
#         # Prevent both types being supplied
#         # ------------------------------------------------

#         if we_hotel_booking_id and partner_hotel_booking_id:
#             return {
#                 "error": (
#                     "You cannot provide both hotelBookingId "
#                     "and partnerHotelBookingId"
#                 )
#             }, 400

#         # ================================================================
#         # WILD ENTERPRISE HOTEL
#         # ================================================================

#         if we_hotel_booking_id:

#             try:
#                 we_hotel_booking_id = int(we_hotel_booking_id)
#             except (ValueError, TypeError):
#                 return {
#                     "error": "hotelBookingId must be an integer"
#                 }, 400

#             hotel_booking = check_instance_exists(
#                 model=WEHotelBookingModel,
#                 id=we_hotel_booking_id,
#                 return_instance=True
#             )

#             if not hotel_booking:
#                 return {
#                     "error": "This is not a valid hotel booking"
#                 }, 404

#             hotel_booking_id = hotel_booking.id

#         # ================================================================
#         # PARTNER HOTEL
#         # ================================================================

#         elif partner_hotel_booking_id:

#             try:
#                 partner_hotel_booking_id = int(
#                     partner_hotel_booking_id
#                 )
#             except (ValueError, TypeError):
#                 return {
#                     "error": "partnerHotelBookingId must be an integer"
#                 }, 400

#             hotel_booking = check_instance_exists(
#                 model=PartnerHotelBookingModel,
#                 id=partner_hotel_booking_id,
#                 return_instance=True
#             )

#             if not hotel_booking:
#                 return {
#                     "error": "This is not a valid partner hotel booking"
#                 }, 404

#             hotel_booking_id = hotel_booking.id

#         # ================================================================
#         # VALIDATE HOTEL BOOKING
#         # ================================================================

#         if hotel_booking:

#             if no_of_people > hotel_booking.guests:
#                 return {
#                     "error": (
#                         f"This hotel booking is for "
#                         f"{hotel_booking.guests} guests "
#                         f"but you are trying to book for "
#                         f"{no_of_people} people"
#                     )
#                 }, 400

#             if not (
#                 hotel_booking.arrival
#                 <= activity_date
#                 <= hotel_booking.departure
#             ):
#                 return {
#                     "error": (
#                         f"Hotel stay is from "
#                         f"{hotel_booking.arrival} to "
#                         f"{hotel_booking.departure}. "
#                         f"Please book within this date range"
#                     )
#                 }, 400

#         # ================================================================
#         # CALCULATE ACTIVITY PRICE
#         # ================================================================

#         if hotel_booking:

#             if activity.free_with_stay:
#                 total_price = 0.00

#             elif activity.discount_with_stay:
#                 total_price = (
#                     activity.price * no_of_people
#                 ) * (1 - activity.stay_discount)

#             else:
#                 total_price = (
#                     activity.price * no_of_people
#                 )

#         else:
#             total_price = (
#                 activity.price * no_of_people
#             )

#         # ================================================================
#         # CREATE ACTIVITY BOOKING
#         # ================================================================

#         activity_booking = ActivityBookingModel(
#             date=activity_date,
#             no_of_people=no_of_people,
#             activity_id=activity.id,

#             hotel_booking_id=(
#                 hotel_booking_id
#                 if we_hotel_booking_id
#                 else None
#             ),

#             partner_hotel_booking_id=(
#                 hotel_booking_id
#                 if partner_hotel_booking_id
#                 else None
#             ),

#             total_price=total_price
#         )

#         db.session.add(activity_booking)
#         db.session.commit()

#         # return activity_booking.to_dict(), 201
#         return self._detail().dump(activity_booking), 201


# class SpecificActivityBooking(BaseActivityBooking):
#     def get(self, id):
#         return self.get_specific(id)

#     def patch(self, id):
#         return self.patch_instance(id)

#     def delete(self, id):
#         return self.delete_instance(id)