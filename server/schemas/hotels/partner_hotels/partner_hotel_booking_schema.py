from marshmallow import fields

from schemas.base_schemas.base_hotel_booking import BaseHotelBookingSchema

class PartnerHotelBookingSchema(BaseHotelBookingSchema):
    id = fields.Int()
    ref_code = fields.String()
    partner_hotel_id = fields.Int()

class PartnerHotelBookingDetailedSchema(PartnerHotelBookingSchema):
    partner_hotel = fields.Nested("PartnerHotelSchema")
    activities = fields.Nested("ActivityBookingSchema", many = True)