from flask import request
from resources.BaseResource import BaseResource
from models.HotelModels.WildEnterpriseHotels.DiscountModel import DiscountModel

from decorators.require_hotel_login import require_hotel_login

from hotel_booking_functions.check_hotel_owner import post_hotel_info, patch_delete_hotel_info
from hotel_booking_functions.check_hotel_dates import check_hotel_dates

from functions.check_retrieve_dates import check_retrieve_dates

class BaseDiscounts(BaseResource):
    model = DiscountModel

    field_map = {
        "name": "name",
        "code": "code",
        "percentageOff": "percentage_off",
        "priority": "priority",
        "discountOnBooking": "discount_based_on_booking",
        "bookingStart": "booking_start_date",
        "bookingEnd": "booking_end_date",
        "stayStart": "stay_start_date",
        "stayEnd": "stay_end_date",
        "isHotelDiscount": "is_hotel_wide_discount",
        "hotelId": "hotel_id",
        "roomId": "room_id"
    }

class AllDiscounts(BaseDiscounts):
    def get(self):
        return self.get_all()

    @require_hotel_login
    def post(self):
        result = post_hotel_info()

        if result: 
            return result

        data = request.get_json()

        if data.get("bookingStart") and data.get("bookingEnd"):
            date_range = check_retrieve_dates(data, "bookingStart", "bookingEnd")
            data["bookingStart"], data["bookingEnd"] = date_range[0], date_range[1]

        if data.get("stayStart") and data.get("stayEnd"):
            date_range = check_retrieve_dates(data, "stayStart", "stayEnd")
            data["stayStart"], data["stayEnd"] = date_range[0], date_range[1]
        return self.post_instance()

class SpecificDiscount(BaseDiscounts):
    def get(self, id):
        return self.get_specific(id)

    @require_hotel_login
    def patch(self, id):
        result = patch_delete_hotel_info(DiscountModel, id)
        if result:
            return result
        
        return self.patch_instance(id)

    @require_hotel_login
    def delete(self, id):
        result = patch_delete_hotel_info(DiscountModel, id)
        if result:
            return result
        
        return self.delete_instance(id)