from config import db

from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin

from functions.check_instance_exists import check_instance_exists
from functions.check_event_dates import check_event_dates

from models.HotelModels.WildEnterpriseHotels.WEHotelModel import WEHotelModel
from models.HotelModels.WildEnterpriseHotels.RoomModel import RoomModel

from relational_functions.one_to_many import one_to_many_back_populates, one_to_many_fk

from serialize_rules import HOTEL_RULES, ROOM_RULES

# Need to set up priority list, if we add a discount to a room in a hotel, that already has a discount on the whole property, we need to ensure this is accounted for 

class DiscountModel(db.Model, SerializerMixin):
    __tablename__ = "discounts"

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable = False)
    code = db.Column(db.String, nullable = True)
    percentage_off = db.Column(db.Float, nullable = False)
    priority = db.Column(db.Integer, nullable = False)

    discount_based_on_booking = db.Column(db.Boolean, nullable = False)

    booking_start_date = db.Column(db.Date, nullable = True)
    booking_end_date = db.Column(db.Date, nullable = True)

    stay_start_date = db.Column(db.Date, nullable = True)
    stay_end_date = db.Column(db.Date, nullable = True)

    is_hotel_wide_discount = db.Column(db.Boolean, nullable = True)

    #========================================================================
    # RELATIONS 
    #========================================================================
    hotel_id = one_to_many_fk("wildenterprise_hotels", True)
    hotel = one_to_many_back_populates("WEHotelModel", "discounts", delete_orphan=False)

    room_id = one_to_many_fk("rooms", True)
    room = one_to_many_back_populates("RoomModel", "discounts", delete_orphan=False)

    #========================================================================
    # SERIALIZE RULES 
    #========================================================================
    serialize_rules = (
        # HOTEL_RULES + ROOM_RULES
        "-hotel.discounts",
        "-hotel.park",
        "-hotel.rooms",
        "-hotel.room_rates",
        "-hotel.lead_times",
        "-hotel.hotel_bookings",

        "-room.hotel",
        "-room.room_rates",
        "-room.discounts",
        "-room.lead_times",
        "-room.room_bookings",
        "-room.holds",
    )

    #========================================================================
    # VALIDATIONS 
    #========================================================================
    @validates("percentage_off")
    def validate_percentage_discount(self, key, value):
        if value < 0.01 or value > 1.00:
            raise ValueError("Percentage value can not be below 0.01, or higher than 1.00")
        return value

    @validates("priority")
    def validate_priority(self, key, value):
        if value < 1 or value > 3:
            raise ValueError("Priority level can not be less than one, or greater than 3")
        return value
    
    @validates("hotel_id", "room_id")
    def validate_discount_type(self, key, value):
        if key == "hotel_id":
            if self.is_hotel_wide_discount == True and value is None:
                raise ValueError("If this is a hotel wide discount, please state which hotel")
            elif self.is_hotel_wide_discount == False and value:
                raise ValueError("This is a room-specific discount, not for an entire hotel")
            return check_instance_exists(WEHotelModel, value)
        else:
            if self.is_hotel_wide_discount == True and value:
                raise ValueError("This is a hotel-wide discount, not room-specific")
            elif self.is_hotel_wide_discount == False and value is None:
                raise ValueError("This is a room-specific discount, please select a room")
            return check_instance_exists(RoomModel, value)
            