from models.HotelModels.BaseHotelModel import BaseHotelModel

from sqlalchemy.orm import validates

from relational_functions.one_to_many import one_to_many_back_populates

from serialize_rules import PARK_RULES, ROOM_RULES, DISCOUNT_RULES, LEAD_TIME_RULES, HOTEL_BOOKINGS_ON_HOTEL_RULES

from config import db

class WEHotelModel(BaseHotelModel):
    __tablename__ = "wildenterprise_hotels"

    id = db.Column(db.Integer, primary_key = True)

    #========================================================================
    # RELATIONS
    #========================================================================
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

    hotel_bookings = one_to_many_back_populates(
        "WEHotelBookingModel",
        "hotel",
        delete_orphan=True
    )

    #========================================================================
    # SERIALIZE RULES 
    #========================================================================
    serialize_rules = (
        # ROOM_RULES + DISCOUNT_RULES + LEAD_TIME_RULES + HOTEL_BOOKINGS_ON_HOTEL_RULES + PARK_RULES
        "-park.hotels",
        "-park.images",
        "-park.events",
        "-park.activities",
        "-park.partner_hotels",

        "-rooms.hotel",
        "-rooms.room_rates",
        "-rooms.discounts",
        "-rooms.lead_times",
        "-rooms.room_bookings",
        "-rooms.holds",

        "-room_rates.hotel",
        "-room_rates.room",

        "-discounts.hotel",
        "-discounts.room",

        "-lead_times.hotel",
        "-lead_times.room",

        "-hotel_bookings.hotel",
        "-hotel_bookings.room_bookings"
    )