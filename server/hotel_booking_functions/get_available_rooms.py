from models.HotelModels.WildEnterpriseHotels.RoomModel import RoomModel

from hotel_booking_functions.get_booked_quantity import get_booked_quantity
from hotel_booking_functions.get_held_quantity import get_held_quantity

def get_available_rooms(
    room_id,
    arrival_date,
    departure_date,
    exclude_booking_id = None,
    exclude_session_token = None,
    party_size = None
):
    room = RoomModel.query.get(room_id)

    if party_size and room.max_people < party_size:
        return 0

    booked = get_booked_quantity(
        room_id=room_id,
        arrival_date=arrival_date,
        departure_date=departure_date,
        exclude_booking_id=exclude_booking_id
    )

    held = get_held_quantity(
        room_id=room_id,
        arrival_date=arrival_date,
        departure_date=departure_date,
        exclude_session_token=exclude_session_token
    )

    return room.no_of_rooms - booked - held