from resources.BaseResource import BaseResource

from models.HotelModels.WildEnterpriseHotels.RoomBookingModel import RoomBookingModel

from schemas.hotels.we_hotels.we_hotel_room_booking_schema import WeHotelRoomBookingDetailedSchema, WeHotelRoomBookingSchema

class BaseRoomBooking(BaseResource):
    model = RoomBookingModel

    schema = WeHotelRoomBookingSchema

    detail_schema = WeHotelRoomBookingDetailedSchema

    field_map = {
        "quantity": "quantity",
        "priceLocked": "price_locked",
        "bookingId": "booking_id",
        "roomId": "room_id"
    }

class AllRoomBookings(BaseRoomBooking):
    def get(self):
        return self.get_all()

class SpecificRoomBooking(BaseRoomBooking):
    def get(self, id):
        return self.get_specific(id)

    def delete(self, id):
        return self.delete_instance(id)