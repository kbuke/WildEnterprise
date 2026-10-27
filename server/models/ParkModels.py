from models.BaseNameImgInfoModel import BaseNameImgInfomodel
from models.BaseCardModel import BaseCardModel

from config import db, bcrypt

from sqlalchemy.orm import validates

from functions.check_string import check_string
from functions.check_unique import check_unique
from functions.check_valid_value import check_valid_value

from relational_functions.one_to_many import one_to_many_back_populates

from functions.check_validate_slug import validate_slug, make_slug_default

class ParkModel(BaseCardModel):
    __tablename__ = "parks"

    id = db.Column(db.Integer, primary_key = True)
    slug =db.Column(db.String, nullable = False, unique = True, default = make_slug_default("name"))

    location = db.Column(db.String, nullable = False)

    # Hotel/Accommdation Set Up
    accomodation = db.Column(db.Boolean, nullable = False)
    email = db.Column(db.String, nullable = True)
    _password_hash = db.Column("password_hash", db.String, nullable = True)


    # Should put coordinates up here for helping people find 
    # Need to link the Park up to events and activity models 

    #=============================================================================================
    # RELATIONS
    #=============================================================================================
    images = one_to_many_back_populates(
        "ParkImgModel",
        "park"
    )

    events = one_to_many_back_populates(
        "EventModel",
        "park"
    )

    activities = one_to_many_back_populates(
        "BaseActivityModel",
        "park"
    )

    # hotels = one_to_many_back_populates(
    #     "WEHotelModel",
    #     "park"
    # )

    partner_hotels = one_to_many_back_populates( 
        "PartnerHotelModel", 
        "park"
    )

    # Accomodation Relations
    rooms = one_to_many_back_populates(
        "RoomModel",
        "park",
        delete_orphan=True
    )

    park_bookings = one_to_many_back_populates(
        "WEHotelBookingModel",
        "park",
        delete_orphan=True
    )

    room_rates = one_to_many_back_populates(
        "RoomRateModel",
        "park",
        delete_orphan=True
    )

    discounts = one_to_many_back_populates(
        "DiscountModel",
        "park",
        delete_orphan=True
    )

    lead_times = one_to_many_back_populates(
        "LeadTimeRuleModel", 
        "park", 
        delete_orphan=True
    )

    #=============================================================================================
    # VALIDATORS
    #=============================================================================================
    @validates("name")
    def validate_park_name(self, key, value):
        check_string(value)
        return check_unique(ParkModel, key, value)

    @validates("slug")
    def validate_park_slug(self, key, value):
        return validate_slug(value)

    @validates("location")
    def validate_park_location(self, key, value):
        check_string(value)
        return check_valid_value(
            [
                "Eastern Cape",
                "Free State",
                "Gauteng",
                "KwaZulu-Natal",
                "Limpopo",
                "Mpumalanga",
                "North West",
                "Western Cape"
            ],
            value
        )

    @validates("email", "password_hash")
    def validate_accomodation_sign_in(self, key, value):
        if self.accomodation == True and not value:
            raise ValueError("If there is accomodation at the site, a password and email must be provided")
        if self.accomodation == False and value:
            raise ValueError("If there is no hotel, there is no sign-in details")
        return value

    #=============================================================================================
    # PASSWORD HASH
    #=============================================================================================
    @property
    def password_hash(self):
        raise AttributeError("password_hash is not directly readable")

    @password_hash.setter 
    def password_hash(self, password):
        self._password_hash = bcrypt.generate_password_hash(password).decode("utf-8")

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password)
