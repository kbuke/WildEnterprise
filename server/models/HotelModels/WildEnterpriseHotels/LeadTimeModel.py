from config import db 

from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates

from relational_functions.one_to_many import one_to_many_back_populates, one_to_many_fk

from hotel_booking_functions.check_hotel_or_room_given import check_hotel_or_room_given

from serialize_rules import HOTEL_RULES, ROOM_RULES

class LeadTimeRuleModel(db.Model, SerializerMixin):
    __tablename__ = "lead_time_rules"

    id = db.Column(db.Integer, primary_key = True)
    min_days = db.Column(db.Integer, nullable = False)
    max_days = db.Column(db.Integer, nullable = True)
    multiplier = db.Column(db.Float, nullable = False)
    label = db.Column(db.String, nullable = False)

    #========================================================================
    # RELATIONS 
    #========================================================================
    hotel_id = one_to_many_fk("wildenterprise_hotels", True)
    hotel = one_to_many_back_populates("WEHotelModel", "lead_times", False)

    room_id = one_to_many_fk("rooms", True)
    room = one_to_many_back_populates("RoomModel", "lead_times", False)
    #========================================================================
    # SERIALIZE RULES 
    #========================================================================
    serialize_rules = (
        HOTEL_RULES + ROOM_RULES
    )

    #========================================================================
    # VALIDATIONS 
    #========================================================================
    @validates("hotel_id", "room_id")
    def validate_hotel_or_room(self, key, value):
        if key == "hotel_id":
            return check_hotel_or_room_given(hotel_id=value)
        return check_hotel_or_room_given(room_id=value)