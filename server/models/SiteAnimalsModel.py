from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from config import db 

from validators.validate_instance_exists import validate_instance_exists
from validators.validate_unique_pair import validate_unique_pair

from models.AnimalModel import AnimalModel
from models.SiteModel import SiteModel

class SiteAnimalsModel(db.Model, SerializerMixin):
    __tablename__ = "site_animals"

    id = db.Column(db.Integer, primary_key = True)
    animal_id = db.Column(db.ForeignKey("animals.id"))
    site_id = db.Column(db.ForeignKey("sites.id"))

    @validates("animal_id")
    def validate_animal(self, key, value):
        return validate_instance_exists(AnimalModel, value, key)
    
    @validates("site_id")
    def validate_site(self, key, value):
        return validate_instance_exists(SiteModel, value, key)
    
    def validate_uniquene(self):
        validate_unique_pair(
            self,
            SiteAnimalsModel,
            animal_id = self.animal_id,
            site_id = self.site_id
        )