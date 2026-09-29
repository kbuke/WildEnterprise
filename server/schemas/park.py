from marshmallow import Schema, fields

class ParkSchema(Schema):
    id = fields.Int(dump_only = True)
    name = fields.Str()
    img = fields.Str()
    info = fields.Str()
    location = fields.Str()

class ParkDetailSchema(ParkSchema):
    images = fields.Nested("ParkImgSchema", many=True)
    activities = fields.Nested("ActivitySchema", many=True)
    hotels = fields.Nested("WeHotelSchema", many=True)
    partner_hotels = fields.Nested("PartnerHotelSchema", many=True)