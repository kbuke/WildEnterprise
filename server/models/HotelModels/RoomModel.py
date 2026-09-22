from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin

from config import db 

from relational_functions.one_to_many import one_to_many_back_populates, one_to_many_fk

from functions.check_int import check_int
from functions.check_instance_exists import check_instance_exists

from models.HotelModels.HotelModel import HotelModel

class RoomModel(db.Model, SerializerMixin):
    __tablename__ = "rooms"

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable = False)
    img = db.Column(db.String, nullable = False, unique = True)
    no_of_rooms = db.Column(db.Integer, nullable = False)
    max_people = db.Column(db.Integer, nullable = False)
    base_price = db.Column(db.Float, nullable = False)

    #========================================================================
    # RELATIONS 
    #========================================================================
    hotel_id = one_to_many_fk("hotels")
    hotel = one_to_many_back_populates("HotelModel", "rooms", delete_orphan=False)

    #========================================================================
    # SERIALIZE RULES 
    #========================================================================
    serialize_rules = (
        "-hotel.rooms",
        "-hotel.park",
    )

    #======================================================================== 
    # VALIDATIONS 
    #========================================================================
    @validates("no_of_rooms", "max_people")
    def validate_number_of_rooms(self, key, value):
        return check_int(value)

    @validates("hotel_id")
    def validate_hotel_exists(self, key, value):
        check_int(value)
        return check_instance_exists(HotelModel, value)