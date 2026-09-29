from marshmallow import Schema, fields


class ParkImgSchema(Schema):
    id = fields.Int(dump_only = True)
    img = fields.Str()
    park_id = fields.Int()

class ParkImgDetailedSchema(ParkImgSchema):
    park = fields.Nested("ParkSchema")