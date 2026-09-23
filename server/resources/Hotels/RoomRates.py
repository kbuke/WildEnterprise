from resources.BaseResource import BaseResource

from models.HotelModels.RoomRateModel import RoomRateModel

from decorators.require_hotel_login import require_hotel_login

from hotel_booking_functions.check_hotel_owner import post_hotel_info, patch_delete_hotel_info

from flask import request

from hotel_booking_functions.check_hotel_dates import check_hotel_dates

class BaseRoomRate(BaseResource):
    model = RoomRateModel

    field_map = {
        "name": "name",
        "startDate": "start_date",
        "endDate": "end_date",
        "modifierType": "modifier_type",
        "value": "value",
        "priority": "priority",
        "hotelId": "hotel_id",
        "roomId": "room_id"
    }

class AllRoomRates(BaseRoomRate):
    @require_hotel_login
    def get(self):
        return self.get_all()

    @require_hotel_login
    def post(self):
        result = post_hotel_info()

        if result:
            return result

        data = request.get_json()
        start_date, end_date = check_hotel_dates(
            data["startDate"],
            data["endDate"]
        )

        data["startDate"] = start_date
        data["endDate"] = end_date

        return self.post_instance()

class SpecificRoomRate(BaseRoomRate):
    @require_hotel_login
    def get(self, id):
        return self.get_specific(id)

    @require_hotel_login
    def patch(self, id):
        result = patch_delete_hotel_info(RoomRateModel, id)

        if result: 
            return result
        
        return self.patch_instance(id)

    @require_hotel_login
    def delete(self, id):
        result = patch_delete_hotel_info(RoomRateModel, id)

        if result:
            return result
        
        return self.delete_instance(id)