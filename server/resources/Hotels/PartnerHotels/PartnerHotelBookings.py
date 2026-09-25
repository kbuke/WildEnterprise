from models.HotelModels.PartnerHotels.PartnerHotelBookingsModel import PartnerHotelBookingModel

from resources.BaseResource import BaseResource

from hotel_or_partner_functions.check_hotel_owner import post_hotel_info

from decorators.require_partner_hotel_login import require_partner_hotel_login

from functions.check_retrieve_dates import check_retrieve_dates

from flask import request

from resources.Hotels.BaseHotelBooking import BaseHotelBooking

# class BasePartnerHotelBookings(BaseResource):
#     model = PartnerHotelBookingModel

#     field_map = {
#         "refCode": "ref_code",
#         "arrival": "arrival_date",
#         "departure": "departure_date",
#         "people": "people",
#         "email": "email",
#         "partnerHotelId": "partner_hotel_id"
#     }

class BasePartnerHotelBookings(BaseHotelBooking):
    model = PartnerHotelBookingModel

    field_map = {
        **BaseHotelBooking.field_map,
        "refCode": "ref_code",
        "partnerHotelId": "partner_hotel_id"
    }

class AllPartnerHotelBookings(BasePartnerHotelBookings):
    def get(self):
        return self.get_all()

    @require_partner_hotel_login
    def post(self):

        data = request.get_json()

        date_range = check_retrieve_dates(data, "arrival", "departure")
        data["arrival"], data["departure"] = date_range[0], date_range[1]

        result = post_hotel_info(hotel_type="Partner")
        if result:
            return result
        
        return self.post_instance()

class SpecificPartnerHotelBooking(BasePartnerHotelBookings):
    def get(self, id):
        return self.get_specific(id)

    def patch(self, id):
        return self.patch_instance(id)

    def delete(self, id):
        return self.delete_instance(id)