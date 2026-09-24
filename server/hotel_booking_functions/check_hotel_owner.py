from flask import request

from functions.check_hotel_id_session import check_hotel_id_session
from functions.check_instance_exists import check_instance_exists

from models.HotelModels.RoomModel import RoomModel

def post_hotel_info():
    data = request.get_json()
    if data.get("roomId"):
        room_id = data["roomId"]
        selected_room = check_instance_exists(RoomModel, room_id, True)
        hotel_id = selected_room.hotel_id
        return check_hotel_id_session(hotel_id)

    return check_hotel_id_session(data["hotelId"])

def patch_delete_hotel_info(model, id):
    specific_instance = check_instance_exists(model, id, True)

    hotel_id = specific_instance.hotel_id

    if not hotel_id:
        room_id = specific_instance.room_id
        selected_room = check_instance_exists(RoomModel, room_id, True)

        result = check_hotel_id_session(selected_room.hotel_id)

        if result:
            return result

        return None

    result = check_hotel_id_session(hotel_id)

    if result:
        return result

    return None