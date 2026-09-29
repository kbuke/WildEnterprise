from marshmallow import fields, Schema

from schemas.base_schemas.base_hotel_booking import BaseHotelBookingSchema

class WeHotelBookingSchema(BaseHotelBookingSchema):
    id = fields.Int(dump_only = True)
    booking_ref = fields.String(dump_only = True)
    date_of_deposit_charge = fields.Date(dump_only = True)
    date_of_remainder_change = fields.Date(dump_only = True)
    hotel_id = fields.Int()

class WeHotelBookingDetailedSchema(WeHotelBookingSchema):
    hotel = fields.Nested("WeHotelSchema")
    room_bookings = fields.Nested("WeHotelRoomBookingSchema", many=True, exclude=("hotel_booking",))
    activities = fields.Nested("ActivityBookingSchema", many=True)