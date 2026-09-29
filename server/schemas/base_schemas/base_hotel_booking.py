from marshmallow import fields, Schema

class BaseHotelBookingSchema(Schema):
    name = fields.Str()
    guests = fields.Int()
    email = fields.Str()
    arrival = fields.Date()
    departure = fields.Date()