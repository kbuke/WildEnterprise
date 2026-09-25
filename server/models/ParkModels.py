from models.BaseNameImgInfoModel import BaseNameImgInfomodel

from config import db 

from sqlalchemy.orm import validates

from functions.check_string import check_string
from functions.check_unique import check_unique
from functions.check_valid_value import check_valid_value

from relational_functions.one_to_many import one_to_many_back_populates

from serialize_rules import HOTEL_RULES, EVENT_RULES, ACTIVITY_RULES, PARK_IMG_RULES

class ParkModel(BaseNameImgInfomodel):
    __tablename__ = "parks"

    id = db.Column(db.Integer, primary_key = True)

    location = db.Column(db.String, nullable = False)

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

    hotels = one_to_many_back_populates(
        "WEHotelModel",
        "park"
    )

    partner_hotels = one_to_many_back_populates( 
        "PartnerHotelModel", 
        "park"
    )

    #=============================================================================================
    # VALIDATORS
    #=============================================================================================
    @validates("name")
    def validate_park_name(self, key, value):
        check_string(value)
        return check_unique(ParkModel, key, value)

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

    #=============================================================================================
    # SERIALIZE RULES
    #=============================================================================================
    serialize_rules = (
        # EVENT_RULES + ACTIVITY_RULES + HOTEL_RULES + PARK_IMG_RULES
        "-images.park",

        "-events.park",

        "-activities.park",
        "-activities.activity_bookings",

        "-hotel.park",
        "-hotel.rooms",
        "-hotel.room_rates",
        "-hotel.discounts",
        "-hotel.lead_times",
        "-hotel.hotel_bookings",

        "-partner_hotels.park",
        "-partner_hotels.partner_hotel_bookings",
    )