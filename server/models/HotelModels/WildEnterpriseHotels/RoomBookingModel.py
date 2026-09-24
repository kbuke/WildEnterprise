from config import db 

from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates

from relational_functions.one_to_many import one_to_many_back_populates, one_to_many_fk

from serialize_rules import ROOM_RULES, HOTEL_BOOKING_RULES

class RoomBookingModel(db.Model, SerializerMixin):
    __tablename__ = "room_bookings"

    id = db.Column(db.Integer, primary_key = True)
    quantity = db.Column(db.Integer, nullable = False, default = 1)
    unit_price = db.Column(db.Float) # Price for one room over the entire stay
    price_locked = db.Column(db.Float) # unit_price * quantity (the actual line-item total)

    #========================================================================
    # RELATIONS
    #========================================================================
    room_id = one_to_many_fk("rooms")
    room = one_to_many_back_populates("RoomModel", "room_bookings", False)

    booking_id = one_to_many_fk("bookings")
    hotel_booking = one_to_many_back_populates("BookingModel", "room_bookings", False)

    #========================================================================
    # SERIALIZE_RULES
    #======================================================================== 
    serialize_rules = (
        ROOM_RULES + HOTEL_BOOKING_RULES
    )
    
    #========================================================================
    # VALIDATORS
    #========================================================================