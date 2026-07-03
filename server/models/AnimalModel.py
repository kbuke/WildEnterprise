from config import db
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates

class AnimalModel(db.Model, SerializerMixin):
    __tablename__ = "animals"

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, unique = True, nullable = False)
    img = db.Column(db.String, nullable = False)
    info = db.Column(db.String, nullable = False)