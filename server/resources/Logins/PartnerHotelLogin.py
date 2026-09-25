from flask import session, request
from flask_restful import Resource

from models.HotelModels.PartnerHotels.PartnerHotelModel import PartnerHotelModel

class PartnerHotelLogin(Resource):
    def post(self):
        data = request.get_json()
        hotel = PartnerHotelModel.query.filter_by(email=data.get("email")).first()

        if not hotel or not hotel.authenticate(data.get("password", "")):
            return {"error": "Invalid email or password"}, 401

        session["partner_hotel_id"] = hotel.id
        return {**hotel.to_dict(), "is_partner_hotel_admin": True}, 200

class PartnerHotelLogout(Resource):
    def delete(self):
        session.pop("partner_hotel_id", None)
        return {}, 204 

class PartnerHotelCheckSession(Resource):
    def get(self):
        hotel = PartnerHotelModel.query.get(session.get("partner_hotel_id"))
        if not hotel:
            return {"error": "Not logged in"}, 401 
        return {**hotel.to_dict(), "is_partner_hotel_admin": True}, 200