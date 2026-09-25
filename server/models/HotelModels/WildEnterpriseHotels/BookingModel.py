import uuid

from hotel_booking_functions.calculate_deposit_date import calculate_deposit_date
from hotel_booking_functions.calculate_remainder_date import calculate_remainder_date

from functions.check_valid_date import check_valid_date
from functions.check_valid_email import check_validate_email
from functions.check_instance_exists import check_instance_exists

from relational_functions.one_to_many import one_to_many_back_populates, one_to_many_fk

from config import db 

from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin

from serialize_rules import HOTEL_RULES, ROOM_BOOKING_RULES, ACTIVITY_BOOKING_RULES, WE_HOTEL_RULES, HOTEL_ACTIVITY_RULES

from models.HotelModels.WildEnterpriseHotels.WEHotelModel import WEHotelModel

from models.HotelModels.BaseHotelBookingModel import BaseHotelBookingModel

class WEHotelBookingModel(BaseHotelBookingModel):
    __tablename__ = "we_hotel_booking"

    id = db.Column(db.Integer, primary_key = True)
    booking_ref = db.Column(db.String, unique = True, nullable = False,
                            default = lambda: f"WE-{uuid.uuid4().hex[:8].upper()}")
    date_of_deposit_charge = db.Column(db.Date, nullable = False, default = calculate_deposit_date)
    date_of_remainder_charge = db.Column(db.Date, nullable = False, default = calculate_remainder_date)

    #========================================================================
    # RELATIONS 
    #========================================================================
    hotel_id = one_to_many_fk("wildenterprise_hotels")
    hotel = one_to_many_back_populates("WEHotelModel", "hotel_bookings", False)

    room_bookings = one_to_many_back_populates("RoomBookingModel", "hotel_booking", delete_orphan=True)

    activities = one_to_many_back_populates("ActivityBookingModel", "hotel_booking", delete_orphan=True)

    #========================================================================
    # SERIALIZE RULES 
    #========================================================================
    serialize_rules = (
        # HOTEL_RULES + ROOM_BOOKING_RULES + HOTEL_ACTIVITY_RULES + WE_HOTEL_RULES
        "-hotel.hotel_bookings",
        "-hotel.park",
        "-hotel.rooms",
        "-hotel.room_rates",
        "-hotel.discounts",
        "-hotel.lead_times",

        "-room_bookings.room",
        "-room_bookings.hotel_booking",

        "-activities.park",
        "-activities.activity_bookings",
    )
    #========================================================================
    # VALIDATIONS 
    #========================================================================
    @validates("hotel_id")
    def validate_hotel(self, key, value):
        return check_instance_exists(WEHotelModel, value)

    @validates("guests")
    def validate_guests(self, key, value):
        if value < 1:
            raise ValueError("guests must be at least 1")

        # Only enforce against existing room_bookings for an already-persisted
        # booking. self.id is None while the object is still being constructed
        # in AllBookings.post, so creation-time capacity checking (already done
        # explicitly in the endpoint) isn't short-circuited by this.
        if self.id is not None and self.room_bookings:
            capacity = sum(rb.room.max_people * rb.quantity for rb in self.room_bookings)
            if value > capacity:
                raise ValueError(
                    f"Selected rooms only accommodate {capacity} guests, but {value} guests specified"
                )
        return value

# class BookingModel(db.Model, SerializerMixin):
#     __tablename__ = "bookings"

#     id = db.Column(db.Integer, primary_key = True)
#     booking_ref = db.Column(db.String, unique = True, nullable = False,
#                             default = lambda: f"WE-{uuid.uuid4().hex[:8].upper()}")
#     name = db.Column(db.String, nullable = False)
#     guests = db.Column(db.Integer, nullable = False)
#     email = db.Column(db.String, nullable = False)
#     arrival_date = db.Column(db.Date, nullable = False)
#     departure_date = db.Column(db.Date, nullable = False)
#     date_of_deposit_charge = db.Column(db.Date, nullable = False, default = calculate_deposit_date)
#     date_of_remainder_charge = db.Column(db.Date, nullable = False, default = calculate_remainder_date)

#     #========================================================================
#     # RELATIONS 
#     #========================================================================
#     hotel_id = one_to_many_fk("wildenterprise_hotels")
#     hotel = one_to_many_back_populates("WEHotelModel", "hotel_bookings", False)

#     room_bookings = one_to_many_back_populates("RoomBookingModel", "hotel_booking", delete_orphan=True)

#     hotel_activities = one_to_many_back_populates("ActivityBookingModel", "hotel_booking", delete_orphan=True)

#     #========================================================================
#     # SERIALIZE RULES 
#     #========================================================================
#     serialize_rules = (
#         HOTEL_RULES + ROOM_BOOKING_RULES + HOTEL_ACTIVITY_RULES + WE_HOTEL_RULES
#     )
#     #========================================================================
#     # VALIDATIONS 
#     #========================================================================
#     @validates("email")
#     def validate_booking_email(self, key, value):
#         return check_validate_email(value)

#     @validates("hotel_id")
#     def validate_hotel(self, key, value):
#         return check_instance_exists(WEHotelModel, value)

#     @validates("guests")
#     def validate_guests(self, key, value):
#         if value < 1:
#             raise ValueError("guests must be at least 1")

#         # Only enforce against existing room_bookings for an already-persisted
#         # booking. self.id is None while the object is still being constructed
#         # in AllBookings.post, so creation-time capacity checking (already done
#         # explicitly in the endpoint) isn't short-circuited by this.
#         if self.id is not None and self.room_bookings:
#             capacity = sum(rb.room.max_people * rb.quantity for rb in self.room_bookings)
#             if value > capacity:
#                 raise ValueError(
#                     f"Selected rooms only accommodate {capacity} guests, but {value} guests specified"
#                 )
#         return value

    