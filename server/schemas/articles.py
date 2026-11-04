from marshmallow import Schema, fields

class ArticleSchema(Schema):
    id = fields.Int(dump_only=True)
    title = fields.Str()
    slug = fields.Str(dump_only=True)
    img = fields.Str(allow_none=True)
    text = fields.Str(allow_none=True)
    status = fields.Str(dump_only=True)
    published_at = fields.DateTime(dump_only=True, allow_none=True)
    park_ids = fields.Function(lambda a: [p.id for p in a.parks], dump_only=True)
    event_ids = fields.Function(lambda a: [e.id for e in a.events], dump_only=True)

class DetailedArticleSchema(ArticleSchema):
    pass
