from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin

from config import db, bcrypt

from relational_functions.one_to_many import one_to_many_back_populates, one_to_many_fk

from functions.check_validate_slug import validate_slug
from functions.check_valid_email import check_validate_email

from models.BaseNameImgInfoModel import BaseNameImgInfomodel

from serialize_rules import PARK_RULES

from functions.check_validate_slug import validate_slug, make_slug_default

class BaseHotelModel(BaseNameImgInfomodel):
    __abstract__ = True

    slug = db.Column(db.String, nullable = False, unique = True, default = make_slug_default("name"))
    email = db.Column(db.String, nullable = False)
    _password_hash = db.Column("password_hash", db.String, nullable = False)


    #========================================================================
    # RELATIONS
    #========================================================================
    park_id = one_to_many_fk(
        "parks"
    )

    # park = one_to_many_back_populates(
    #     "ParkModel",
    #     "hotels",
    #     delete_orphan=False
    # )

    #========================================================================
    # SERIALIZE RULES
    #========================================================================
    # serialize_rules = (
    #     PARK_RULES 
    # )
    #========================================================================
    # PASSWORD HASH
    #========================================================================
    @property
    def password_hash(self):
        raise AttributeError("password_hash is not directly readable")

    @password_hash.setter 
    def password_hash(self, password):
        self._password_hash = bcrypt.generate_password_hash(password).decode("utf-8")

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password)

    #========================================================================
    # VALIDATIONS
    #========================================================================
    @validates("slug")
    def validate_hotel_slug(self, key, value):
        return validate_slug(value)

    @validates("email")
    def validate_hotel_email(self, key, value):
        return check_validate_email(value)