from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates, declared_attr

from config import db 

from relational_functions.one_to_many import one_to_many_back_populates

from functions.check_valid_email import check_validate_email

class BaseHotelBookingModel(db.Model, SerializerMixin):
    __abstract__ = True

    name = db.Column(db.String, nullable = False)
    guests = db.Column(db.Integer, nullable = False)
    email = db.Column(db.String, nullable = False)
    arrival = db.Column(db.Date, nullable = False)
    departure = db.Column(db.Date, nullable = False)

    # activities = one_to_many_back_populates("ActivityBookingModel", "hotel_booking", delete_orphan=True)

    # serialize_rules = (
    #     "-activities.hotel_booking",
    # )

    @validates("email")
    def validate_email(self, key, value):
        return check_validate_email(value)
