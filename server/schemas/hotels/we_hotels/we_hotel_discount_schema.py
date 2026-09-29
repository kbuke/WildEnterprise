from marshmallow import Schema, fields

class WeHotelDiscountSchema(Schema):
    id = fields.Int(dump_only = True)
    name = fields.Str()
    code = fields.Str(allow_none=True)
    percentage_off = fields.Float()
    priority = fields.Int()
    discount_based_on_booking = fields.Bool()
    booking_start_date = fields.Date(allow_none = True)
    booking_end_date = fields.Date(allow_none = True)
    stay_start_date = fields.Date(allow_none=True)
    stay_end_date = fields.Date(allow_none = True)
    is_hotel_wide_discount = fields.Bool(allow_none = True)
    hotel_id = fields.Int(allow_none = True)
    room_id = fields.Int(allow_none = True)

class WeHotelDiscountDetailSchema(WeHotelDiscountSchema):
    hotel = fields.Nested("WeHotelSchema")
    room = fields.Nested("WeHotelRoomSchema")