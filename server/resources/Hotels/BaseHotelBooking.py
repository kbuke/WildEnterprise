from resources.BaseResource import BaseResource

from models.HotelModels.BaseHotelBookingModel import BaseHotelBookingModel

class BaseHotelBooking(BaseResource):
    model = BaseHotelBookingModel

    field_map = {
        "name": "name",
        "guests": "guests",
        "email": "email",
        "arrival": "arrival",
        "departure": "departure"
    }