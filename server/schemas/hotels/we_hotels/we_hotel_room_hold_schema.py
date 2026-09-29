from marshmallow import Schema, fields

class WeHotelRoomHoldSchema(Schema):
    id = fields.Int(dump_only = True)
    quentity = fields.Int()
    arrival_date = fields.Date()
    departure_date = fields.Date()
    session_token = fields.String(dump_only = True)
    expires_at = fields.DateTime(dump_only = True)
    room_id = fields.Int()

class WeHotelRoomHoldDetailedSchema(WeHotelRoomHoldSchema):
    room = fields.Nested("WeHotelRoomSchema")