from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin

from config import db 

from relational_functions.one_to_many import one_to_many_back_populates, one_to_many_fk

from serialize_rules import PARTNER_HOTEL_RULES

from functions.check_valid_email import check_validate_email

from models.HotelModels.BaseHotelBookingModel import BaseHotelBookingModel

# class PartnerHotelBookingModel(db.Model, SerializerMixin):
class PartnerHotelBookingModel(BaseHotelBookingModel):
    __tablename__ = "partner_hotel_booking"

    id = db.Column(db.Integer, primary_key = True)
    ref_code = db.Column(db.String, nullable = False, unique = True)
    # arrival_date = db.Column(db.Date, nullable = False)
    # departure_date = db.Column(db.Date, nullable = False)
    # guests = db.Column(db.Integer, nullable = False)
    # email = db.Column(db.String, nullable = False)

    #========================================================================
    # RELATIONS
    #========================================================================
    partner_hotel_id = one_to_many_fk("partner_hotels") 
    partner_hotel = one_to_many_back_populates("PartnerHotelModel", "partner_hotel_bookings", delete_orphan=False)

    activities = one_to_many_back_populates("ActivityBookingModel", "partner_hotel_booking", delete_orphan=True)

    #========================================================================
    # SERIALIZATION
    #========================================================================
    serialize_rules = (
        # PARTNER_HOTEL_RULES
        "-partner_hotel.partner_hotel_bookings",

        "-activities.park",
        "-activities.activity_bookings",
    )

    #========================================================================
    # VALIDATIONS
    #========================================================================
    @validates("guests")
    def validate_booking_guests(self, key, value):
        if value < 1:
            raise ValueError("There must be at least one guest")
        return value