from datetime import date as date_cls

from flask import request

from config import db

from models.ActivityModels.ActivityBookingModel import ActivityBookingModel
from models.ActivityModels.BaseActivityModel import BaseActivityModel
from models.HotelModels.WildEnterpriseHotels.BookingModel import WEHotelBookingModel
from models.HotelModels.PartnerHotels.PartnerHotelBookingsModel import PartnerHotelBookingModel

from resources.BaseResource import BaseResource

from functions.check_instance_exists import check_instance_exists


class BaseActivityBooking(BaseResource):
    model = ActivityBookingModel

    field_map = {
        "date": "date",
        "noOfPeople": "no_of_people",
        "activityId": "activity_id",
        "hotelBookingId": "hotel_booking_id",
        "partnerHotelBookingId": "partner_hotel_booking_id"
    }


class AllActivityBookings(BaseActivityBooking):

    def get(self):
        return self.get_all()

    def post(self):
        data = request.get_json() or {}

        # ================================================================
        # VALIDATE BASIC INPUT
        # ================================================================

        try:
            activity_id = int(data["activityId"])
            no_of_people = int(data["noOfPeople"])
            activity_date = date_cls.fromisoformat(data["date"])
        except (KeyError, ValueError, TypeError):
            return {
                "error": "activityId, noOfPeople and date are required"
            }, 400

        if no_of_people < 1:
            return {
                "error": "noOfPeople must be at least 1"
            }, 400

        # ================================================================
        # GET ACTIVITY
        # ================================================================

        activity = check_instance_exists(
            model=BaseActivityModel,
            id=activity_id,
            return_instance=True
        )

        if not activity:
            return {
                "error": "Activity not found"
            }, 404

        # ================================================================
        # CHECK ACTIVITY AVAILABILITY
        # ================================================================

        if (
            activity.all_year_round is False
            and activity.available_months
        ):
            if activity_date.month not in activity.available_months:
                return {
                    "error": (
                        f"This activity is not available "
                        f"in month {activity_date.month}"
                    )
                }, 400

        # ================================================================
        # CHECK HOTEL BOOKINGS
        # ================================================================

        hotel_booking = None
        hotel_booking_id = None

        we_hotel_booking_id = data.get("hotelBookingId")
        partner_hotel_booking_id = data.get(
            "partnerHotelBookingId"
        )

        # ------------------------------------------------
        # Prevent both types being supplied
        # ------------------------------------------------

        if we_hotel_booking_id and partner_hotel_booking_id:
            return {
                "error": (
                    "You cannot provide both hotelBookingId "
                    "and partnerHotelBookingId"
                )
            }, 400

        # ================================================================
        # WILD ENTERPRISE HOTEL
        # ================================================================

        if we_hotel_booking_id:

            try:
                we_hotel_booking_id = int(we_hotel_booking_id)
            except (ValueError, TypeError):
                return {
                    "error": "hotelBookingId must be an integer"
                }, 400

            hotel_booking = check_instance_exists(
                model=WEHotelBookingModel,
                id=we_hotel_booking_id,
                return_instance=True
            )

            if not hotel_booking:
                return {
                    "error": "This is not a valid hotel booking"
                }, 404

            hotel_booking_id = hotel_booking.id

        # ================================================================
        # PARTNER HOTEL
        # ================================================================

        elif partner_hotel_booking_id:

            try:
                partner_hotel_booking_id = int(
                    partner_hotel_booking_id
                )
            except (ValueError, TypeError):
                return {
                    "error": "partnerHotelBookingId must be an integer"
                }, 400

            hotel_booking = check_instance_exists(
                model=PartnerHotelBookingModel,
                id=partner_hotel_booking_id,
                return_instance=True
            )

            if not hotel_booking:
                return {
                    "error": "This is not a valid partner hotel booking"
                }, 404

            hotel_booking_id = hotel_booking.id

        # ================================================================
        # VALIDATE HOTEL BOOKING
        # ================================================================

        if hotel_booking:

            if no_of_people > hotel_booking.guests:
                return {
                    "error": (
                        f"This hotel booking is for "
                        f"{hotel_booking.guests} guests "
                        f"but you are trying to book for "
                        f"{no_of_people} people"
                    )
                }, 400

            if not (
                hotel_booking.arrival
                <= activity_date
                <= hotel_booking.departure
            ):
                return {
                    "error": (
                        f"Hotel stay is from "
                        f"{hotel_booking.arrival} to "
                        f"{hotel_booking.departure}. "
                        f"Please book within this date range"
                    )
                }, 400

        # ================================================================
        # CALCULATE ACTIVITY PRICE
        # ================================================================

        if hotel_booking:

            if activity.free_with_stay:
                total_price = 0.00

            elif activity.discount_with_stay:
                total_price = (
                    activity.price * no_of_people
                ) * (1 - activity.stay_discount)

            else:
                total_price = (
                    activity.price * no_of_people
                )

        else:
            total_price = (
                activity.price * no_of_people
            )

        # ================================================================
        # CREATE ACTIVITY BOOKING
        # ================================================================

        activity_booking = ActivityBookingModel(
            date=activity_date,
            no_of_people=no_of_people,
            activity_id=activity.id,

            hotel_booking_id=(
                hotel_booking_id
                if we_hotel_booking_id
                else None
            ),

            partner_hotel_booking_id=(
                hotel_booking_id
                if partner_hotel_booking_id
                else None
            ),

            total_price=total_price
        )

        db.session.add(activity_booking)
        db.session.commit()

        return activity_booking.to_dict(), 201


        # if data.get("hotelBookingId"):
        #     we_hotel_booking = check_hotel_booking(
        #         we_hotel_booking, 
        #         WEHotelBookingModel,
        #         data.get("hotelBookingId")
        #     )

        #     if we_hotel_booking and activity.free_with_stay:
        #         total_price = 0.00
        #     else

        # if data.get("hotelBookingId"):
        #     pass 

        # if data.get("partnerHotelBookingId"):
        #     pass

        # hotel_booking_id = data.get("hotelBookingId")
        # hotel_booking = None

        # if hotel_booking_id:
        #     hotel_booking = check_instance_exists(model=BookingModel, id=hotel_booking_id, return_instance=True)
        #     if not hotel_booking:
        #         return {"error": "This is not a valid hotel booking"}, 404

        #     if no_of_people > hotel_booking.guests:
        #         return {
        #             "error": f"This hotel booking is for {hotel_booking.guests} guests "
        #                      f"but you are trying to book for {no_of_people} people"
        #         }, 400

        #     if not (hotel_booking.arrival_date <= activity_date <= hotel_booking.departure_date):
        #         return {
        #             "error": f"Hotel stay is from {hotel_booking.arrival_date} to "
        #                      f"{hotel_booking.departure_date}. Please book within this date range"
        #         }, 400

        # # Pricing: only apply stay-based free/discount if a valid, verified
        # # hotel booking was actually supplied. No hotel booking = full price,
        # # even if the activity supports a stay perk.
        # if hotel_booking and activity.free_with_stay:
        #     total_price = 0.00
        # elif hotel_booking and activity.discount_with_stay:
        #     total_price = (activity.price * no_of_people) * (1 - activity.stay_discount)
        # else:
        #     total_price = activity.price * no_of_people

        # activity_booking = ActivityBookingModel(
        #     date=activity_date,
        #     no_of_people=no_of_people,
        #     activity_id=activity.id,
        #     hotel_booking_id=hotel_booking.id if hotel_booking else None,
        #     total_price=round(total_price, 2),
        # )
        # db.session.add(activity_booking)
        # db.session.commit()

        # return activity_booking.to_dict(), 201


class SpecificActivityBooking(BaseActivityBooking):
    def get(self, id):
        return self.get_specific(id)

    def patch(self, id):
        pass

    def delete(self, id):
        return self.delete_instance(id)