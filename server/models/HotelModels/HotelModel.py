from models.BaseNameImgInfoModel import BaseNameImgInfomodel

from relational_functions.one_to_many import one_to_many_back_populates, one_to_many_fk

from sqlalchemy.orm import validates

from config import db, bcrypt

from functions.check_validate_slug import validate_slug, make_slug_default
from functions.check_valid_email import check_validate_email

from serialize_rules import PARK_RULES, ROOM_RULES, DISCOUNT_RULES

class HotelModel(BaseNameImgInfomodel):
    __tablename__ = "hotels"

    id = db.Column(db.Integer, primary_key = True)
    slug = db.Column(db.String, nullable = False, unique = True, default = make_slug_default("name"))
    email = db.Column(db.String, nullable = False, unique = True)
    _password_hash = db.Column("password_hash", db.String, nullable = False)

    #========================================================================
    # RELATIONS
    #========================================================================
    park_id = one_to_many_fk(
        "parks"
    )

    park = one_to_many_back_populates(
        "ParkModel",
        "hotels",
        delete_orphan=False
    )

    rooms = one_to_many_back_populates(
        "RoomModel",
        "hotel",
        True
    )

    room_rates = one_to_many_back_populates(
        "RoomRateModel",
        "hotel",
        delete_orphan=True
    )

    discounts = one_to_many_back_populates(
        "DiscountModel",
        "hotel",
        delete_orphan=True
    )

    lead_times = one_to_many_back_populates(
        "LeadTimeRuleModel", 
        "hotel", 
        delete_orphan=True
    )

    bookings = one_to_many_back_populates(
        "BookingModel",
        "hotel",
        delete_orphan=True
    )

    #========================================================================
    # SERIALIZE RULES
    #========================================================================
    serialize_rules = (
        PARK_RULES + ROOM_RULES + DISCOUNT_RULES

        # "-room_rates.hotel",
        # "-room_rates.room",

        # "-lead_times.hotel",
        # "-lead_times.room",
    )
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
    