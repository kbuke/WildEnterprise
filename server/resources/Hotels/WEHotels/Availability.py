from flask import request
from flask_restful import Resource
from datetime import date

from models.HotelModels.WildEnterpriseHotels.RoomModel import RoomModel

from hotel_booking_functions.get_available_rooms import get_available_rooms
from hotel_booking_functions.price_room_stay import price_room_stay
# from hotel_booking_functions.validate_stay_dates import validate_stay_dates  # if you added it earlier

from schemas.hotels.we_hotels.we_hotel_room_schema import WeHotelRoomSchema


class SearchAvailability(Resource):
    def get(self):
        try:
            park_id = int(request.args["parkId"])
            arrival = date.fromisoformat(request.args["arrivalDate"])
            departure = date.fromisoformat(request.args["departureDate"])
            party_size = int(request.args.get("partySize", 1))
            session_token = request.args.get("sessionToken")
        except (KeyError, ValueError):
            return {"error": "parkId, arrivalDate, departureDate required"}, 400

        # error = validate_stay_dates(arrival, departure)
        # if error:
        #     return {"error": error}, 400
        if departure <= arrival:
            return {"error": "departureDate must be after arrivalDate"}, 400
        if party_size < 1:
            return {"error": "partySize must be at least 1"}, 400

        nights = (departure - arrival).days
        rooms = RoomModel.query.filter_by(park_id=park_id).all()

        room_results = []
        max_capacity = 0

        for room in rooms:
            available = get_available_rooms(
                room_id=room.id, arrival_date=arrival, departure_date=departure,
                exclude_session_token=session_token
            )
            if available <= 0:
                continue

            stay_price = price_room_stay(room, arrival, departure)   # one room, whole stay
            max_capacity += room.max_people * available

            room_results.append({
                "room": WeHotelRoomSchema().dump(room),
                "available": available,
                "price_per_night": round(stay_price / nights, 2),    # average, rates can vary by night
                "stay_price": stay_price,
            })

        can_accommodate = max_capacity >= party_size

        return {
            "nights": nights,
            "max_capacity": max_capacity,
            "can_accommodate": can_accommodate,
            # only show rooms if the party actually fits
            "rooms": room_results if can_accommodate else [],
        }, 200