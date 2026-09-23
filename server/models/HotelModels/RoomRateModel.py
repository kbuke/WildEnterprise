from config import db 

from relational_functions.one_to_many import one_to_many_back_populates, one_to_many_fk

from relational_functions.one_to_many import one_to_many_fk, one_to_many_back_populates

from functions.check_instance_exists import check_instance_exists

from models.HotelModels.RoomModel import RoomModel
from models.HotelModels.HotelModel import HotelModel

from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates

class RoomRateModel(db.Model, SerializerMixin):
    """
    This is for setting increases or decreases on a hotel or certain room over a period of dates 
    In summer it could see an increase of 20% on the cost of the room (1.2)
    In winter it could see a decrease of 20% on the cost of the room (0.8)
    """
    __tablename__ = "room_rates"

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable = False)
    start_date = db.Column(db.Date, nullable = False)
    end_date = db.Column(db.Date, nullable = False)
    modifier_type = db.Column(db.String, nullable = False)
    value = db.Column(db.Float, nullable = False)
    priority = db.Column(db.Integer, nullable = False, default = 0)

    #========================================================================
    # RELATIONS 
    #========================================================================
    hotel_id = one_to_many_fk("hotels", True)
    hotel = one_to_many_back_populates("HotelModel", "room_rates", delete_orphan=False)

    room_id = one_to_many_fk("rooms", True)
    room = one_to_many_back_populates("RoomModel", "room_rates", delete_orphan=False)

    #========================================================================
    # SERIALIZE RULES 
    #========================================================================
    serialize_rules = (
        "-hotel.room_rates",
        "-hotel.rooms",
        "-hotel.park",

        "-room.room_rates",
        "-room.hotel",
    )

    #========================================================================
    # VALIDATIONS 
    #========================================================================
    # @validates("end_date")
    # def validate_end_date(self, key, value):
    #     _, end_date = check_hotel_dates(self.start_date, value)
    #     return end_date 

    @validates("hotel_id", "room_id")
    def validate_hotel(self, key, value):
        if key == "hotel_id":
            if self.room_id and value:
                raise ValueError("This can not be a hotel wide discount and a room discount. Choose one.")
            if self.room_id is None and value is None:
                raise ValueError("This rate must apply to either the hotel or specific room")
            return check_instance_exists(model=HotelModel, id=value)

        if key == "room_id":
            if self.hotel_id is None and value is None:
                raise ValueError("This rate must apply to either the hotel or specific room")
            return check_instance_exists(model=RoomModel, id=value)
