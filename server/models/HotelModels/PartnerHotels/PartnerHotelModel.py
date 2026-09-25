from models.HotelModels.BaseHotelModel import BaseHotelModel

from config import db

from relational_functions.one_to_many import one_to_many_back_populates

from serialize_rules import PARTNER_HOTEL_BOOKINGS_RULES

class PartnerHotelModel(BaseHotelModel): 
    __tablename__ = "partner_hotels" 

    id = db.Column(db.Integer, primary_key = True)

    #========================================================================
    # RELATIONS 
    #========================================================================
    partner_hotel_bookings = one_to_many_back_populates("PartnerHotelBookingModel", "partner_hotel")
    park = one_to_many_back_populates("ParkModel", "partner_hotels", delete_orphan=False) 

    #========================================================================
    # SERIALIZATION
    #========================================================================
    serialize_rules = (
        # PARTNER_HOTEL_BOOKINGS_RULES
        "-partner_hotel_bookings.partner_hotel",

        "-park.partner_hotels",
        "-park.images",
        "-park.events",
        "-park.activities",
        "-park.hotels",
        "-park.partner_hotels",
    )