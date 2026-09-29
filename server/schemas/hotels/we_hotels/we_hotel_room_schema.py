from marshmallow import Schema, fields

class WeHotelRoomSchema(Schema):
    id = fields.Int(dump_only = True)
    name = fields.Str()
    img = fields.Str()
    no_of_rooms = fields.Int()
    max_people = fields.Int()
    base_price = fields.Float()
    hotel_id = fields.Int()

class WeHotelRoomDetailedSchema(Schema):
    hotel = fields.Nested("WeHotelSchema")
    room_rates = fields.Nested("WeHotelRoomRateSchema", many=True)
    discounts = fields.Nested("WeHotelDiscountSchema", many=True)
    lead_times = fields.Nested("WeHotelLeadtimesSchema", many=True)
    room_bookings = fields.Nested("WeHotelRoomBookingSchema", many=True)
    holds = fields.Nested("WeHotelRoomHoldSchema", many=True)