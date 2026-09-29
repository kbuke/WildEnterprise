from resources.BaseResource import BaseResource

from models.HotelModels.BaseHotelBookingModel import BaseHotelBookingModel

from schemas.base_schemas.base_hotel_booking import BaseHotelBookingSchema

class BaseHotelBooking(BaseResource):
    model = BaseHotelBookingModel

    schema = BaseHotelBookingSchema

    field_map = {
        "name": "name",
        "guests": "guests",
        "email": "email",
        "arrival": "arrival",
        "departure": "departure"
    }