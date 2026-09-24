from flask import request
from flask_restful import Resource
from datetime import date

from models.HotelModels.RoomModel import RoomModel

from hotel_booking_functions.get_available_rooms import get_available_rooms
from hotel_booking_functions.get_held_quantity import get_held_quantity
from hotel_booking_functions.price_room_stay import price_room_stay
from hotel_booking_functions.find_room_combinations import find_room_combinations

MAX_ROOMS_PER_COMBO = 4


class SearchAvailability(Resource):
    def get(self):
        try:
            hotel_id = int(request.args["hotelId"])
            arrival = date.fromisoformat(request.args["arrivalDate"])
            departure = date.fromisoformat(request.args["departureDate"])
            party_size = int(request.args.get("partySize", 1))
            session_token = request.args.get("sessionToken")
        except (KeyError, ValueError):
            return {"error": "hotelId, arrivalDate, departureDate required"}, 400

        if departure <= arrival:
            return {"error": "departureDate must be after arrivalDate"}, 400

        rooms = RoomModel.query.filter_by(hotel_id=hotel_id).all()

        room_options = []
        for room in rooms:
            available = get_available_rooms(
                room_id=room.id, arrival_date=arrival, departure_date=departure,
                exclude_session_token=session_token
            )
            if available <= 0:
                continue

            held = get_held_quantity(room.id, arrival, departure, exclude_session_token=session_token)

            room_options.append({
                "room": room,
                "available": available,
                "contested": held > 0,
                "unit_price": price_room_stay(room, arrival, departure),
            })

        combos = find_room_combinations(room_options, party_size, max_rooms=MAX_ROOMS_PER_COMBO)

        results = [
            {
                "selections": [
                    {"room": sel["room"].to_dict(), "quantity": sel["quantity"]}
                    for sel in combo["selections"]
                ],
                "total_rooms": combo["total_rooms"],
                "total_capacity": combo["total_capacity"],
                "total_price": combo["total_price"],
            }
            for combo in combos
        ]

        return {"options": results}, 200