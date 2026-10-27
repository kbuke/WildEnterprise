from datetime import date, time

from models.BaseCardModel import BaseCardModel

from sqlalchemy import event
from sqlalchemy.orm import validates

from config import db

from relational_functions.one_to_many import one_to_many_back_populates, one_to_many_fk

from functions.check_event_dates import check_event_dates
from functions.check_validate_slug import validate_slug, make_slug_default


class EventModel(BaseCardModel):
    __tablename__ = "events"

    id = db.Column(db.Integer, primary_key = True)
    slug = db.Column(db.String, nullable = False, unique = True, default = make_slug_default("name"))

    # DATE ATTRIBUTES
    start_date = db.Column(db.Date, nullable = False)
    multi_day_event = db.Column(db.Boolean, nullable = False)
    end_date = db.Column(db.Date, nullable = True)

    # TIME ATTRIBUTES
    start_time = db.Column(db.Time, nullable = False)
    end_time = db.Column(db.Time, nullable = False)

    # TICKET ATTRIBUTES
    no_of_tickets = db.Column(db.Integer, nullable = False)
    tickets_sold = db.Column(db.Integer, nullable = False, default = 0)
    tickets_remaining = db.Column(db.Integer, nullable = False)
    ticket_price = db.Column(db.Integer, nullable = False)

    # RELATIONS
    park_id = one_to_many_fk("parks", True)

    park = one_to_many_back_populates(
        "ParkModel",
        "events",
        delete_orphan=False
    )

    # VALIDATORS (these go INSIDE the class)
    @validates("slug")
    def validate_park_slug(self, key, value):
        return validate_slug(value)

    @validates("start_date", "end_date")
    def validate_event_date(self, key, value):
        if value in (None, ""):
            return None
        if isinstance(value, str):
            return date.fromisoformat(value)
        return value

    @validates("start_time", "end_time")
    def validate_event_time(self, key, value):
        if isinstance(value, str):
            return time.fromisoformat(value)
        return value


# LISTENER (this goes OUTSIDE the class, below it, same file)
@event.listens_for(EventModel, "before_insert")
def validate_event_before_insert(mapper, connection, target):
    # Fill in tickets_remaining if it wasn't provided
    if target.tickets_remaining is None:
        target.tickets_remaining = target.no_of_tickets

    # Your existing checks
    if target.multi_day_event is True and target.end_date is None:
        raise ValueError("If this event is multi-day you must give an end date.")

    if target.multi_day_event is False and target.end_date is not None:
        raise ValueError("If this is not a multi-day event do not give an end date.")

    check_event_dates(target.start_date, target.end_date)
