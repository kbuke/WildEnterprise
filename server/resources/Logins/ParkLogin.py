from flask import session, request
from flask_restful import Resource

from models.ParkModels import ParkModel

from schemas.hotels.we_hotels.we_hotel_schema import WeHotelSchema
from schemas.park import ParkSchema

class ParkLogin(Resource):
    def post(self):
        data = request.get_json()
        park = ParkModel.query.filter_by(email=data.get("email")).first()

        if not park or not park.authenticate(data.get("password", "")):
            return {"error": "Invalid email or password"}, 401

        session["park_id"] = park.id
        return {**ParkSchema().dump(park), "is_park_admin": True}, 200

class ParkLogout(Resource):
    def delete(self):
        session.pop("park_id", None)
        return {}, 204 

class ParkCheckSession(Resource):
    def get(self):
        park = ParkModel.query.get(session.get("park_id"))
        if not park:
            return {"error": "Not logged in"}, 401 
        return {**ParkSchema().dump(park), "is_park_admin": True}, 200