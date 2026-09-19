from models.BaseNameImgInfoModel import BaseNameImgInfomodel

from sqlalchemy.orm import validates
from sqlalchemy import event

from config import db

from relational_functions.one_to_many import one_to_many_back_populates, one_to_many_fk

from datetime import date, time

from functions.check_int import check_int
from functions.check_event_dates import check_event_dates

class EventModel(BaseNameImgInfomodel):
    __tablename__ = "events"

    #========================================================================
    # DATE ATTRIBUTES 
    #========================================================================
    start_date = db.Column(db.Date, nullable = False)
    multi_day_event = db.Column(db.Boolean, nullable = False)
    end_date = db.Column(db.Date, nullable = True)

    #========================================================================
    # TIME ATTRIBUTES 
    #========================================================================
    start_time = db.Column(db.Time, nullable = False)
    end_time = db.Column(db.Time, nullable = False)

    #========================================================================
    # TICKET ATTRIBUTES
    #========================================================================
    no_of_tickets = db.Column(db.Integer, nullable = False)
    tickets_sold = db.Column(db.Integer, nullable = False, default = 0)
    tickets_remaining = db.Column(db.Integer, nullable = False)
    ticket_price = db.Column(db.Integer, nullable = False)

    #========================================================================
    # RELATIONS
    #========================================================================
    park_id = one_to_many_fk(
        "parks",
        True
    )

    park = one_to_many_back_populates(
        "ParkModel",
        "events",
        delete_orphan=False
    )

    #========================================================================
    # VALIDATORS
    #========================================================================

    #========================================================================
    # SERIALIZE RULES
    #========================================================================
    serialize_rules = (
        "-park.events",
        "-park.images",
    )


@event.listens_for(EventModel, "before_insert")
def validate_event_before_insert(mapper, connection, target):

    if target.multi_day_event is True and target.end_date is None:
        raise ValueError(
            "If this event is multi-day you must give an end date."
        )

    if target.multi_day_event is False and target.end_date is not None:
        raise ValueError(
            "If this is not a multi-day event do not give an end date."
        )

    check_event_dates(
        target.start_date,
        target.end_date
    )
