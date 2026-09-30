from marshmallow import fields, Schema

class ActivitySchema(Schema):
    id = fields.Int(dump_only = True)
    name = fields.Str()
    img = fields.Str()
    info = fields.Str()
    all_year_round = fields.Bool()
    available_months = fields.List(fields.Int(), allow_none = True)
    free_with_stay = fields.Bool()
    discount_with_stay = fields.Bool()
    stay_discount = fields.Float(allow_none = True)
    park_id = fields.Int()


class ActivityDetailSchema(ActivitySchema):
    park = fields.Nested("ParkSchema")
    activity_bookings = fields.Nested("ActivityBookingSchema")

class WalkingTrailSchema(ActivitySchema):
    id = fields.Int()
    map = fields.Str()
    code_of_conduct = fields.Str()

class WalkingTrailDetailedSchema(WalkingTrailSchema):
    park = fields.Nested("ParkSchema")
    activity_bookings = fields.Nested("ActivityBookingSchema")