from marshmallow import fields

from schemas.base_schemas.base_hotel import BaseHotelSchema

class PartnerHotelSchema(BaseHotelSchema):
    id = fields.Int(dump_only = True)

class PartnerHotelDetailedSchema(PartnerHotelSchema):
    partner_hotel_bookings = fields.Nested("PartnerHotelBookingSchema", many=True)
    park = fields.Nested("ParkSchema")