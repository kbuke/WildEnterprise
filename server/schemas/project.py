from marshmallow import Schema, fields


class ProjectSchema(Schema):
    id = fields.Int(dump_only=True)
    slug = fields.Str(dump_only=True)
    name = fields.Str(allow_none=True)
    img = fields.Str(allow_none=True)
    info = fields.Str(allow_none=True)
    card_info = fields.Str(allow_none=True)
    primary_img_1 = fields.Str(allow_none=True)
    primary_img_2 = fields.Str(allow_none=True)
    primary_img_3 = fields.Str(allow_none=True)
    primary_img_4 = fields.Str(allow_none=True)
    primary_img_5 = fields.Str(allow_none=True)
    status = fields.Str(dump_only=True)
    published_at = fields.DateTime(dump_only=True, allow_none=True)
    article_ids = fields.Function(lambda p: [a.id for a in p.articles], dump_only=True)


class ProjectDetailSchema(ProjectSchema):
    pass