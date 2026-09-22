from resources.BaseResource import BaseResource

from models.HotelModels.HotelModel import HotelModel

from decorators.require_admin_login import require_admin_login
from decorators.require_hotel_login import require_hotel_login

from functions.check_hotel_id_session import check_hotel_id_session

class BaseHotels(BaseResource):
    model = HotelModel

    field_map = {
        "name": "name",
        "img": "img",
        "info": "info",
        "email": "email",
        "password": "password_hash"
    }

class AllHotels(BaseHotels):
    def get(self):
        return self.get_all()

    @require_admin_login
    def post(self):
        return self.post_instance()

class SpecificHotel(BaseHotels):
    def get(self, id):
        return self.get_specific(id)

    @require_hotel_login
    def patch(self, id):
        error = check_hotel_id_session(id)
        if error:
            return error
        return self.patch_instance(id)

    @require_admin_login
    def delete(self, id):
        return self.delete_instance(id)