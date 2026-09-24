from models.HotelModels.WildEnterpriseHotels.WEHotelModel import WEHotelModel
from models.HotelModels.WildEnterpriseHotels.RoomModel import RoomModel

from functions.check_instance_exists import check_instance_exists


def check_hotel_or_room_given(
    hotel_id=None,
    room_id=None
):
    if hotel_id and room_id:
        raise ValueError("You can only choose a hotel-wide, or specific room discount")
    if not hotel_id and not room_id:
        raise ValueError("This must apply to either a room, or a hotel entirely.")

    if hotel_id:
        return check_instance_exists(WEHotelModel, hotel_id)

    if room_id:
        return check_instance_exists(RoomModel, room_id)
    
