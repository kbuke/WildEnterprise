from resources.BaseResource import BaseResource
from models.AnimalModel import AnimalModel

class AnimalList(BaseResource):
    model = AnimalModel

    field_map = {
        "name": "name",
        "img": "img",
        "info": "info",
        "endangeredLevel": "endangered_level",
        "animalType": "animal_type"
    }

    def get(self):
        return self.get_all()
    
    def post(self):
        return self.post_instance()
    
class SpecificAnimal(BaseResource):
    model = AnimalModel

    field_map = {
        "name": "name",
        "img": "img",
        "info": "info",
        "endangeredLevel": "endangered_level",
        "animalType": "animal_type"
    }

    def get(self, id):
        return self.get_specific(id)
    
    def patch(self, id):
        return self.patch_instance(id)
    
    def delete(self, id):
        return self.delete_instance(id)