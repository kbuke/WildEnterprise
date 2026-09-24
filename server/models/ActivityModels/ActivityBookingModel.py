from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin

from config import db 

import uuid

from relational_functions.one_to_many import one_to_many_back_populates, one_to_many_fk

from models.ActivityModels.BaseActivityModel import BaseActivityModel
from models.HotelModels.BookingModel import BookingModel

from functions.check_instance_exists import check_instance_exists

from serialize_rules import ACTIVITY_RULES, BOOKING_RULES

class ActivityBookingModel(db.Model, SerializerMixin):
    __tablename__ = "activity_booking"

    id = db.Column(db.Integer, primary_key = True)
    booking_reference = db.Column(db.String, unique=True, nullable = False,
                                  default=lambda: f"ACT-{uuid.uuid4().hex[:8].upper()}")
    date = db.Column(db.Date, nullable=False)
    no_of_people = db.Column(db.Integer, nullable = False)
    total_price = db.Column(db.Float, nullable = True)

    #========================================================================
    # RELATIONS 
    #========================================================================
    activity_id = one_to_many_fk("activities") 
    activity = one_to_many_back_populates("BaseActivityModel", "activity_bookings", delete_orphan=False)

    hotel_booking_id = one_to_many_fk("bookings", is_null=True)
    booking = one_to_many_back_populates("BookingModel", "hotel_activities", delete_orphan=False)

    #========================================================================
    # SERIALIZE RULES 
    #========================================================================
    serialize_rules = (
        ACTIVITY_RULES + BOOKING_RULES
    )

    #========================================================================
    # VALIDATIONS 
    #========================================================================
    @validates("activity_id")
    def validate_activity(self, key, value):
        return check_instance_exists(model=BaseActivityModel, id=value)