from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from config import db 

import uuid

from relational_functions.one_to_many import one_to_many_fk, one_to_many_back_populates

from models.EventModels.EventModel import EventModel

from datetime import date

class EventBookingModel(db.Model):
    __tablename__ = "event_bookings"

    id = db.Column(
        db.Integer, 
        primary_key = True
    )

    booking_ref = db.Column(db.String, unique=True, nullable=False,
                            default=lambda: f"EVT-{uuid.uuid4().hex[:8].upper()}")
    
    name = db.Column(
        db.String, 
        nullable = False
    )

    email = db.Column(
        db.String, 
        nullable = False
    )

    no_of_people = db.Column(
        db.Integer, 
        nullable = False
    )

    total_cost = db.Column(
        db.Integer, 
        nullable = False
    )

    send_tickets_to_all = db.Column(
        db.Boolean, 
        default = False,
        nullable = False
    )

    payment_status = db.Column(
        db.String, 
        nullable = False,
        default="Pending"
    )

    booking_status = db.Column(
        db.String, 
        nullable = False,
        default = "Confirmed"
    )

    booking_date = db.Column(
        db.Date, 
        nullable = False,
        default = date.today
    )

    event_id = one_to_many_fk(
        "events"
    )

    event = one_to_many_back_populates(
        "EventModel", 
        "bookings", 
        delete_orphan=False
    )

    tickets = one_to_many_back_populates(
        "EventTicketModel",
        "booking",
        delete_orphan=True
    )

    @property
    def active_tickets(self):
        return [t for t in self.tickets if t.status != "Cancelled"]