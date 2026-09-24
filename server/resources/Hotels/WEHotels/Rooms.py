from resources.BaseResource import BaseResource

from models.HotelModels.WildEnterpriseHotels.RoomModel import RoomModel

from decorators.require_hotel_login import require_hotel_login

from functions.check_hotel_id_session import check_hotel_id_session
from functions.check_instance_exists import check_instance_exists

from flask import request

class BaseRooms(BaseResource):
    model = RoomModel

    field_map = {
        "name": "name",
        "img": "img",
        "noOfRooms": "no_of_rooms",
        "maxPeople": "max_people",
        "basePrice": "base_price",
        "hotelId": "hotel_id"
    }

class AllRooms(BaseRooms):
    def get(self):
        return self.get_all()

    @require_hotel_login
    def post(self):
        data = request.get_json()
        hotel_id = data["hotelId"]
        result = check_hotel_id_session(hotel_id)
        if result:
            return result
        return self.post_instance()

class SpecificRoom(BaseRooms):
    def get(self, id):
        return self.get_specific(id)

    @require_hotel_login
    def patch(self, id):
        specific_room = check_instance_exists(RoomModel, id)
        hotel_id = specific_room.hotel_id
        logged_hotel = check_hotel_id_session(hotel_id)
        if logged_hotel:
            return logged_hotel
        return self.patch_instance(id)

    @require_hotel_login
    def delete(self, id):
        specific_room = check_instance_exists(RoomModel, id, return_instance=True)
        hotel_id = specific_room.hotel_id
        logged_hotel = check_hotel_id_session(hotel_id)
        if logged_hotel:
            return logged_hotel
        return self.delete_instance(id)