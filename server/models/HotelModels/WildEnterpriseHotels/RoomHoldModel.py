from config import db
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from datetime import datetime, timedelta

from relational_functions.one_to_many import one_to_many_fk, one_to_many_back_populates

from serialize_rules import ROOM_RULES

from functions.check_instance_exists import check_instance_exists

from models.HotelModels.WildEnterpriseHotels.RoomModel import RoomModel

class RoomHoldModel(db.Model, SerializerMixin):
    __tablename__ = "room_holds"

    id = db.Column(db.Integer, primary_key = True)
    quantity = db.Column(db.Integer, nullable = False, default = 1)
    arrival_date = db.Column(db.Date, nullable = False)
    departure_date = db.Column(db.Date, nullable = False)
    session_token = db.Column(db.String, nullable = False)
    expires_at = db.Column(db.DateTime, nullable = False,
                           default = lambda: datetime.utcnow() + timedelta(minutes=10))

    #========================================================================
    # RELATIONS
    #========================================================================
    room_id = one_to_many_fk("rooms")
    room = one_to_many_back_populates("RoomModel", "holds", delete_orphan=False)

    #========================================================================
    # SERIALIZE RULESS
    #========================================================================
    serialize_rules = (
        # ROOM_RULES
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
    @validates("room_id")
    def validate_room(self, key, value):
        return check_instance_exists(model=RoomModel, id=value)