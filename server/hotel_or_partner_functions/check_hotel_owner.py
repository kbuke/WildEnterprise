from flask import request
from hotel_or_partner_functions.check_hotel_id_session import check_hotel_id_session
from functions.check_instance_exists import check_instance_exists

from models.HotelModels.WildEnterpriseHotels.RoomModel import RoomModel

def post_hotel_info(hotel_type):
    if hotel_type not in ["Partner", "WildEnterprise"]:
        raise ValueError("hotel_type must either be 'Partner' or 'WildEnterprise'")

    data = request.get_json()

    if hotel_type == "Partner":
        return check_hotel_id_session(hotel_type, data["partnerHotelId"]) 

    if data.get("roomId"):
        room_id = data["roomId"]
        selected_room = check_instance_exists(RoomModel, room_id, True)
        hotel_id = selected_room.hotel_id
        return check_hotel_id_session(hotel_type, hotel_id)

    return check_hotel_id_session(hotel_type, data["hotelId"])

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