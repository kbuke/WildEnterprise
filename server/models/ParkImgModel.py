from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates 

from config import db

from relational_functions.one_to_many import one_to_many_back_populates, one_to_many_fk

from functions.check_string import check_string

class ParkImgModel(db.Model, SerializerMixin):
    __tablename__ = "park_image"

    id = db.Column(db.Integer, primary_key = True)
    img = db.Column(db.String, nullable = False)

    #=============================================================================================
    # RELATIONS
    #=============================================================================================
    park_id = one_to_many_fk(
        "parks",
        True
    )

    park = one_to_many_back_populates(
        "ParkModel",
        "images",
        delete_orphan=False
    )

    #=============================================================================================
    # VALIDATORS
    #=============================================================================================
    @validates("img")
    def validate_park_img(self, key, value):
        return check_string(value)

    #=============================================================================================
    # SERIALIZE RULES
    #=============================================================================================
    serialize_rules = (
        "-park.images",
        "-park.events",
        "-park.activities",
        "-park.hotels",
        "-park.partner_hotels",
    )