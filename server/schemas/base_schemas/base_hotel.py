from marshmallow import fields

from schemas.base_schemas.base_name_img_info import BaseNameImgInfoSchema

class BaseHotelSchema(BaseNameImgInfoSchema):
    slug = fields.Str()
    email = fields.Str()
    park_id = fields.Int()