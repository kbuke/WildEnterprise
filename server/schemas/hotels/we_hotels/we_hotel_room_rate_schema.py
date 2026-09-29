from marshmallow import Schema, fields

class WeHotelRoomRateSchema(Schema):
    id = fields.Int(dump_only = True)
    name = fields.Str()
    start_date = fields.Date()
    end_date = fields.Date()
    modifier_type = fields.Str()
    value = fields.Float()
    priority = fields.Int()
    hotel_id = fields.Int(allow_none = True)
    room_id = fields.Int(allow_none = True)

class WeHotelRoomRateDescriptiveSchema(WeHotelRoomRateSchema):
    hotel = fields.Nested("WeHotelSchema", allow_none = True)
    room = fields.Nested("WeHotelRoomSchema", allow_none = True)