from marshmallow import fields, Schema

from schemas.base_schemas.base_hotel_booking import BaseHotelBookingSchema

class WeHotelBookingSchema(BaseHotelBookingSchema):
    id = fields.Int(dump_only = True)
    booking_ref = fields.String(dump_only = True)
    date_of_deposit_charge = fields.Date(dump_only = True)
    date_of_remainder_charge = fields.Date(dump_only = True)
    park_id = fields.Int()
    reviewer_name = fields.Str()
    review_img = fields.Str()
    rating = fields.Int()
    review = fields.Str()

class WeHotelBookingDetailedSchema(WeHotelBookingSchema):
    hotel = fields.Nested("WeHotelSchema")
    room_bookings = fields.Nested(
        "WeHotelRoomBookingDetailedSchema",
        many=True,
        exclude=("hotel_booking",)
    )
    activities = fields.Nested("ActivityBookingSchema", many=True)


class WeHotelReviewSchema(Schema):
    id = fields.Int(dump_only=True)
    reviewer_name = fields.Str(dump_only=True)
    review_img = fields.Str(dump_only=True)
    rating = fields.Int(dump_only=True)
    review = fields.Str(dump_only=True)
    review_date = fields.Date(dump_only=True)