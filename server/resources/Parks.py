from models.ParkModels import ParkModel

from resources.BaseResource import BaseResource

from decorators.require_admin_login import require_admin_login

from schemas.park import ParkSchema, ParkDetailSchema

class BasePark(BaseResource):
    model = ParkModel
    schema = ParkSchema
    detail_schema = ParkDetailSchema
    field_map = {
        "name": "name",
        "img": "img",
        "info": "info",
        "location": "location",
        "cardInfo": "card_info",
        "pI1": "primary_img_1",
        "pI2": "primary_img_2",
        "pI3": "primary_img_3",
        "pI4": "primary_img_4",
        "pI5": "primary_img_5",
        "accomodation": "accomodation",
        "email": "email",
        "password": "password_hash"
    }

class AllParks(BasePark):
    def get(self):
        return self.get_all()

    @require_admin_login
    def post(self):
        return self.post_instance()

class SpecificPark(BasePark):
    def get(self, id):
        return self.get_specific(id)

    def patch(self, id):
        return self.patch_instance(id)

    def delete(self, id):
        return self.delete_instance(id)