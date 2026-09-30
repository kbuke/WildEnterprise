from schemas.base_schemas.base_hotel import BaseHotelSchema

from marshmallow import fields

class WeHotelSchema(BaseHotelSchema):
    id = fields.Int(dump_only = True)

class WeHotelDetailedSchema(WeHotelSchema):
    park = fields.Nested("ParkSchema")
    rooms = fields.Nested("WeHotelRoomSchema", many=True)
    room_rates = fields.Nested("WeHotelRoomRateSchema", many=True)
    discounts = fields.Nested("WeHotelDiscountSchema", many = True)
    lead_times = fields.Nested("WeHotelLeadtimesSchema", many=True)
    hotel_bookings = fields.Nested("WeHotelBookingSchema", many = True)