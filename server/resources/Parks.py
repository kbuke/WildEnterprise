from models.ParkModels import ParkModel

from resources.BaseResource import BaseResource

class BasePark(BaseResource):
    model = ParkModel

    field_map = {
        "name": "name",
        "img": "img",
        "info": "info",
        "location": "location"
    }

class AllParks(BasePark):
    def get(self):
        return self.get_all()

    def post(self):
        return self.post_instance()

class SpecificPark(BasePark):
    def get(self, id):
        return self.get_specific(id)

    def patch(self, id):
        return self.patch_instance(id)

    def delete(self, id):
        return self.delete_instance(id)