from resources.Hotels.BaseHotel import BaseHotel

from models.HotelModels.PartnerHotels.PartnerHotelModel import PartnerHotelModel

from decorators.require_admin_login import require_admin_login

from flask_restful import Resource

from hotel_booking_functions.change_hotel_credentials import change_hotel_credentials

from schemas.hotels.partner_hotels.partner_hotel_schema import PartnerHotelSchema, PartnerHotelDetailedSchema

class BasePartnerHotel(BaseHotel):
    model = PartnerHotelModel

    schema = PartnerHotelSchema

    detail_schema = PartnerHotelDetailedSchema

    field_map = {
        **BaseHotel.field_map,
    }

class AllPartnerHotels(BasePartnerHotel):
    def get(self):
        return self.get_all()

    @require_admin_login
    def post(self):
        return self.post_instance()

class SpecificPartnerHotel(BasePartnerHotel):
    def get(self, id):
        return self.get_specific(id)

    def patch(self, id):
        return self.patch_instance(id)

    @require_admin_login
    def delete(self, id):
        return self.delete_instance(id)

class ChangePartnerHotelCredentials(Resource):
    def patch(self, id):
        return change_hotel_credentials(model_name=PartnerHotelModel, id=id)