from marshmallow import fields, Schema

class EventSchema(Schema):
    id = fields.Int(dump_only = True)
    name = fields.Str()
    img = fields.Str()
    info = fields.Str()
    start_date = fields.Date()
    multi_day_event = fields.Bool()
    end_date = fields.Date(allow_none = True)
    start_time = fields.Time()
    end_time = fields.Time()
    no_of_tickets = fields.Int()
    tickets_sold = fields.Int(dump_only = True)
    tickets_remainig = fields.Int(dump_only = True)
    ticket_price = fields.Int()
    park_id = fields.Int()

class EventDescriptionSchema(EventSchema):
    park = fields.Nested("ParkSchema")