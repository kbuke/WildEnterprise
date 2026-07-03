from resources.BaseResource import BaseResource
from models.SiteAnimalsModel import SiteAnimalsModel

class SiteAnimalList(BaseResource):
    model = SiteAnimalsModel

    field_map = {
        "animalId": "animal_id",
        "siteId": "site_id"
    }

    def get(self):
        return self.get_all()
    
    def post(self):
        return self.post_instance()


class SpecificSiteAnimal(BaseResource):
    model = SiteAnimalsModel

    field_map = {
        "name": "name",
        "img": "img",
        "info": "info"
    }

    def get(self, id):
        return self.get_specific(id)
    
    def delete(self, id):
        return self.delete_instance(id)