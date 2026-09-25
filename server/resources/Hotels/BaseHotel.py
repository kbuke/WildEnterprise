from resources.BaseResource import BaseResource

from models.HotelModels.BaseHotelModel import BaseHotelModel

class BaseHotel(BaseResource):
    model = BaseHotelModel

    field_map = {
        "name": "name",
        "img": "img",
        "info": "info",
        "email": "email",
        "password": "password_hash",
        "parkId": "park_id"
    }