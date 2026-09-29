from marshmallow import Schema, fields

class ActivityBookingSchema(Schema):
    id = fields.Int(dump_only = True)
    booking_reference = fields.Str(dump_only=True)
    data = fields.Date()
    no_of_people = fields.Int()
    total_price = fields.Float(dump_only = True)
    activity_id = fields.Int()
    hotel_booking_id = fields.Int(allow_none = True)
    partner_hotel_booking_id = fields.Int(allow_none = True)

class ActivityBookingDetailedSchema(ActivityBookingSchema):
    activity = fields.Nested("ActivitySchema")
    hotel_booking = fields.Nested("WeHotelBookingSchema")
    partner_hotel_booking = fields.Nested("PartnerHotelBookingSchema")