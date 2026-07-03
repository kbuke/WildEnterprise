from config import db
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates

from helpers.many_to_many import many_to_many

class AnimalModel(db.Model, SerializerMixin):
    __tablename__ = "animals"

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, unique = True, nullable = False)
    img = db.Column(db.String, nullable = False)
    info = db.Column(db.String, nullable = False)

    # Add Endangered Level
    # Add Animal Type, ie cat, bird etc 
    # Add Diet, herbivore, carnivore

    sites = many_to_many("SiteModel", "animals", "site_animals")

    serialize_rules = (
        "-sites.animals",
    )