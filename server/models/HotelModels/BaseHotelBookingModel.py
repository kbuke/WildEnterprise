from sqlalchemy.orm import validates

from config import db 

from functions.check_valid_email import check_validate_email

class BaseHotelBookingModel(db.Model):
    __abstract__ = True

    name = db.Column(db.String, nullable = False)
    guests = db.Column(db.Integer, nullable = False)
    email = db.Column(db.String, nullable = False)
    arrival = db.Column(db.Date, nullable = False)
    departure = db.Column(db.Date, nullable = False)

    @validates("email")
    def validate_email(self, key, value):
        return check_validate_email(value)
