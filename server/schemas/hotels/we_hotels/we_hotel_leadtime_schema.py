from marshmallow import fields, Schema

class WeHotelLeadtimesSchema(Schema):
    id = fields.Int(dump_only = True)
    min_days = fields.Int(dump_only = True)
    max_days = fields.Int(allow_none = True)
    multiplier = fields.Float()
    label = fields.Str()
    hotel_id = fields.Int(allow_none = True)
    room_id = fields.Int(allow_none = True)

class WeHotelLeadtimesDetailSchema(WeHotelLeadtimesSchema):
    hotel = fields.Nested("WeHotelSchema", allow_none = True)
    room = fields.Nested("WeHotelRoomSchema", allow_none = True)