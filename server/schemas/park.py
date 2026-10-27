from marshmallow import Schema, fields

class ParkSchema(Schema):
    id = fields.Int(dump_only = True)
    name = fields.Str()
    slug=fields.Str()
    img = fields.Str()
    info = fields.Str()
    location = fields.Str()
    card_info = fields.Str()
    primary_img_1 = fields.Str()
    primary_img_2 = fields.Str()
    primary_img_3 = fields.Str()
    primary_img_4 = fields.Str()
    primary_img_5 = fields.Str()
    accomodation = fields.Bool()


class ParkDetailSchema(ParkSchema):
    images = fields.Nested("ParkImgSchema", many=True)
    activities = fields.Nested("ActivitySchema", many=True)
    hotels = fields.Nested("WeHotelSchema", many=True)
    partner_hotels = fields.Nested("PartnerHotelSchema", many=True)
    rooms = fields.Nested("WeHotelRoomSchema", many=True)