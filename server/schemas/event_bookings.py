from marshmallow import Schema, fields


class EventTicketSchema(Schema):
    id = fields.Int(dump_only=True)
    attendee_name = fields.Str()
    attendee_email = fields.Str()
    status = fields.Str()
    price_paid = fields.Int()
    email_status = fields.Str()
    checked_in = fields.Bool()


class EventTicketAdminSchema(EventTicketSchema):
    ticket_ref = fields.Str()
    email_error = fields.Str(allow_none=True)
    checked_in_at = fields.DateTime(allow_none=True)


class EventBookingSchema(Schema):
    id = fields.Int(dump_only=True)
    booking_ref = fields.Str()
    name = fields.Str()
    email = fields.Str()
    no_of_people = fields.Int()
    total_cost = fields.Int()
    send_tickets_to_all = fields.Bool()
    payment_status = fields.Str()
    booking_status = fields.Str()
    booking_date = fields.Date()
    event_id = fields.Int()
    event_name = fields.Function(lambda b: b.event.name)
    tickets = fields.Nested(EventTicketSchema, many=True)


class EventBookingAdminSchema(EventBookingSchema):
    tickets = fields.Nested(EventTicketAdminSchema, many=True)