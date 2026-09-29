from marshmallow import Schema, fields

class WeHotelRoomBookingSchema(Schema):
    id = fields.Int(dump_only = True)
    quantity = fields.Int()
    unit_price = fields.Float()
    price_locked = fields.Float()
    hotel_id = fields.Int(allow_none = True)
    room_id = fields.Int(allow_none = True)

class WeHotelRoomBookingDetailedSchema(WeHotelRoomBookingSchema):
    hotel_booking = fields.Nested("WeHotelBookingSchema")
    room = fields.Nested("WeHotelRoomSchema")