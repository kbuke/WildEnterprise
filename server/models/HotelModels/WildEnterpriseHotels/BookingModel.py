import uuid

from hotel_booking_functions.calculate_deposit_date import calculate_deposit_date
from hotel_booking_functions.calculate_remainder_date import calculate_remainder_date

from functions.check_instance_exists import check_instance_exists
from functions.check_not_bool_or_none import check_not_bool_or_none
from functions.check_int import check_int

from relational_functions.one_to_many import one_to_many_back_populates, one_to_many_fk

from config import db 

from sqlalchemy.orm import validates

# from models.HotelModels.WildEnterpriseHotels.WEHotelModel import WEHotelModel
from models.ParkModels import ParkModel

from models.HotelModels.BaseHotelBookingModel import BaseHotelBookingModel

from functions.check_string import check_string

class WEHotelBookingModel(BaseHotelBookingModel):
    __tablename__ = "we_hotel_booking"

    id = db.Column(db.Integer, primary_key = True)
    booking_ref = db.Column(db.String, unique = True, nullable = False,
                            default = lambda: f"WE-{uuid.uuid4().hex[:8].upper()}")
    date_of_deposit_charge = db.Column(db.Date, nullable = False, default = calculate_deposit_date)
    date_of_remainder_charge = db.Column(db.Date, nullable = False, default = calculate_remainder_date)
    
    #========================================================================
    # Set up review section. Each booking has only one review, and the review must be given after the exit date. This will be done via a patch request
    #========================================================================
    reviewer_name = db.Column(db.String, nullable = True)
    review_img = db.Column(db.String, nullable = True, default = "https://cdn-icons-png.flaticon.com/512/266/266033.png")
    rating = db.Column(db.Integer, nullable = True)
    review = db.Column(db.String, nullable = True)
    review_date = db.Column(db.Date, nullable = True)

    #========================================================================
    # RELATIONS 
    #========================================================================
    park_id = one_to_many_fk("parks")
    park = one_to_many_back_populates("ParkModel", "park_bookings", False)

    room_bookings = one_to_many_back_populates("RoomBookingModel", "hotel_booking", delete_orphan=True)

    activities = one_to_many_back_populates("ActivityBookingModel", "hotel_booking", delete_orphan=True)

    #========================================================================
    # VALIDATIONS 
    #========================================================================
    @validates("park_id")
    def validate_park(self, key, value):
        return check_instance_exists(ParkModel, value)

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

    @validates("rating")
    def validate_rating(self, key, value):
        check_not_bool_or_none(value)
        check_int(value)
        if not 1 <= value <= 5:
            raise ValueError("Rating must be between 1 and 5")
        return value

    @validates("review")
    def validate_review(self, key, value):
        check_not_bool_or_none(value)
        check_string(value)
        value = value.strip()
        if not 10 <= len(value) <= 1_000:
            raise ValueError("Review must be between 10 and 1,000 characters")
        return value

    @validates("reviewer_name")
    def validate_reviewer_name(self, key, value):
        check_not_bool_or_none(value)
        check_string(value)
        return value