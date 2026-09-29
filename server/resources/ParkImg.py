from models.ParkImgModel import ParkImgModel
from resources.BaseResource import BaseResource

from schemas.park_img import ParkImgSchema, ParkImgDetailedSchema

class BaseParkImg(BaseResource):
    model = ParkImgModel

    schema = ParkImgSchema

    detail_schema = ParkImgDetailedSchema
    
    field_map = {
        "img": "img",
        "parkId": "park_id"
    }

class AllParkImages(BaseParkImg):
    def get(self):
        return self.get_all()

    def post(self):
        return self.post_instance()

class SpecificParkImg(BaseResource):
    def get(self, id):
        return self.get_specific(id)

    def patch(self, id):
        return self.patch_instance(id)

    def delete(self, id):
        return self.delete_instance(id)