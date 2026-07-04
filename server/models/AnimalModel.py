from config import db
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates

from helpers.many_to_many import many_to_many

from validators.validate_options import validate_options

class AnimalModel(db.Model, SerializerMixin):
    __tablename__ = "animals"

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, unique = True, nullable = False)
    img = db.Column(db.String, nullable = False)
    info = db.Column(db.String, nullable = False)
    # Add Endangered Level
    endangered_level = db.Column(db.String, nullable = False)
    # Add Animal Type, ie cat, bird etc 
    animal_type = db.Column(db.String, nullable = False)
    big_five = db.Column(db.Boolean, nullable = False)

    sites = many_to_many("SiteModel", "animals", "site_animals")

    # Define endangered level
    extinction_levels = ["Least Concern", "Never Threatened", "Vulnerable", "Endangered", "Critically Endangered"]

    # Define animal types
    animal_classification = ["Big Cats", "Large Mammals", "Antelope", "Primates", "Birds", "Reptiles", "Carnivores"]

    serialize_rules = (
        "-sites.animals",
    )

    @validates("endangered_level")
    def validate_endanger_level(self, key, value):
        return validate_options(value, self.extinction_levels)
    
    @validates("animal_type")
    def validate_animal_type(self, key, value):
        return validate_options(value, self.animal_classification)
