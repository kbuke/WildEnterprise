from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin

from config import db 

from relational_functions.one_to_many import one_to_many_back_populates, one_to_many_fk

from functions.check_int import check_int
from functions.check_instance_exists import check_instance_exists

from models.HotelModels.WildEnterpriseHotels.WEHotelModel import WEHotelModel

from serialize_rules import HOTEL_RULES, DISCOUNT_RULES, LEAD_TIME_RULES, ROOM_BOOKING_RULES, ROOM_HOLD_RULES, WE_HOTEL_RULES

class RoomModel(db.Model, SerializerMixin):
    __tablename__ = "rooms"

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable = False)
    img = db.Column(db.String, nullable = False, unique = True)
    no_of_rooms = db.Column(db.Integer, nullable = False)
    max_people = db.Column(db.Integer, nullable = False)
    base_price = db.Column(db.Float, nullable = False)

    #========================================================================
    # RELATIONS 
    #========================================================================
    hotel_id = one_to_many_fk("wildenterprise_hotels")
    hotel = one_to_many_back_populates("WEHotelModel", "rooms", delete_orphan=False)

    room_rates = one_to_many_back_populates("RoomRateModel", "room", delete_orphan=True)

    discounts = one_to_many_back_populates("DiscountModel", "room", delete_orphan=True)

    lead_times = one_to_many_back_populates("LeadTimeRuleModel", "room", delete_orphan=True)

    room_bookings = one_to_many_back_populates("RoomBookingModel", "room", delete_orphan=True)

    holds = one_to_many_back_populates("RoomHoldModel", "room", delete_orphan=True)

    #========================================================================
    # SERIALIZE RULES 
    #========================================================================
    serialize_rules = (
        # HOTEL_RULES + DISCOUNT_RULES + LEAD_TIME_RULES + ROOM_BOOKING_RULES + ROOM_HOLD_RULES + WE_HOTEL_RULES
        "-hotel.discounts",
        "-hotel.park",
        "-hotel.rooms",
        "-hotel.room_rates",
        "-hotel.lead_times",
        "-hotel.hotel_bookings",

        "-room_rates.room",
        "-room_rates.hotel",

        "-discounts.room",
        "-discounts.hotel",

        "-lead_times.room",
        "-lead_times.hotel",

        "-room_bookings.room",
        "-room_bookings.hotel_booking",

        "-holds.room",
    )

    #======================================================================== 
    # VALIDATIONS 
    #========================================================================
    @validates("no_of_rooms", "max_people")
    def validate_number_of_rooms(self, key, value):
        return check_int(value)

    @validates("hotel_id")
    def validate_hotel_exists(self, key, value):
        check_int(value)
        return check_instance_exists(WEHotelModel, value)