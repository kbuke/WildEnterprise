from resources.BaseResource import BaseResource

from models.HotelModels import HotelModel

from decorators.require_admin_login import require_admin_login

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

    def patch(self, id):
        return self.patch_instance(id)

    @require_admin_login
    def delete(self, id):
        return self.delete_instance(id)