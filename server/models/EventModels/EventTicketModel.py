from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin

from config import db 

from relational_functions.one_to_many import one_to_many_back_populates, one_to_many_fk

from datetime import datetime

from models.EventModels.EventModel import EventModel
from models.EventModels.EventBookingModel import EventBookingModel

from datetime import date

from functions.check_valid_email import check_validate_email

import uuid

class EventTicketModel(db.Model):
    __tablename__ = "event_tickets"

    id = db.Column(db.Integer, primary_key = True)

    ticket_ref = db.Column(
        db.String, 
        nullable = False, 
        unique = True,
        default=lambda: 
            f"Tic-{uuid.uuid4().hex.upper()}"
    )

    attendee_name = db.Column(
        db.String, 
        nullable = False
    )

    attendee_email = db.Column(
        db.String, 
        nullable = False
    )

    email_status = db.Column(
        db.String,
        nullable = False,
        default = "Pending"
    )

    email_sent_at = db.Column(
        db.DateTime,
        nullable = True
    )

    email_error = db.Column(
        db.String,
        nullable = True
    )

    status = db.Column(
        db.String, 
        nullable = False, 
        default = "Valid"
    )

    checked_in = db.Column(
        db.Boolean, 
        nullable = False, 
        default = False
    )

    checked_in_at = db.Column(
        db.DateTime, 
        nullable = True
    )

    price_paid = db.Column(db.Integer, nullable = False, default = 0)


    booking_id = one_to_many_fk(
        "event_bookings",
        True
    )
    
    booking = one_to_many_back_populates(
        "EventBookingModel",
        "tickets",
        delete_orphan=False
    )

    @validates("attendee_name")
    def validate_attendee_name(self, key, value):
        value = (value or "").strip()
        if not 2 <= len(value) <= 80:
            raise ValueError("Each guest needs a name (2 to 80 characters)")
        return value

    @validates("attendee_email")
    def validate_attendee_email(self, key, value):
        return check_validate_email((value or "").strip())