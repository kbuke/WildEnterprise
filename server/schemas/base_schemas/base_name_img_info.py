from marshmallow import Schema, fields

class BaseNameImgInfoSchema(Schema):
    name = fields.Str()
    img = fields.Str()
    info = fields.Str()