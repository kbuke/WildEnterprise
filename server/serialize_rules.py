def serialize_header(header, *fields):
    return tuple(f"-{header}.{field}" for field in fields)

ACTIVITY_RULES = serialize_header(
    "activity",
    "park", "activity_bookings"
)

ACTIVITY_BOOKING_RULES = serialize_header(
    "activity_bookings",
    "activity", "hotel_bookings"
)

# ======================================================================
# HOTEL SERIALIZATION RULES
# ======================================================================
HOTEL_BOOKING_RULES = serialize_header(
    "hotel_booking",
    "hotel", "room_bookings", "hotel_activities"
)

HOTEL_ACTIVITY_RULES = serialize_header(
    "hotel_activities",
    "activity", "hotel_booking"
)

HOTEL_BOOKINGS_ON_HOTEL_RULES = serialize_header(
    "hotel_bookings",
    "hotel", "room_bookings", "hotel_activities"
)

DISCOUNT_RULES = serialize_header(
    "discount",
    "hotel", "room"
)

HOTEL_RULES = serialize_header(
    "hotel",
    "park"
)

WE_HOTEL_RULES = serialize_header(
    "hotel",
    "park", "rooms", "room_rates", "discounts", "lead_times", "hotel_bookings"
)

LEAD_TIME_RULES = serialize_header(
    "lead_times",
    "hotel", "room"
)

ROOM_BOOKING_RULES = serialize_header(
    "room_bookings",
    "room", "hotel_booking"
)

ROOM_RULES = serialize_header(
    "room",
    "hotel", "room_rates", "discounts", "lead_times", "room_bookings", "holds"
)

ROOM_RATE_RULES = serialize_header(
    "room_rates",
    "hotel", "room"
)

ROOM_HOLD_RULES = serialize_header(
    "holds",
    "room"
)

PARTNER_HOTEL_RULES = serialize_header(
    "partner_hotel",
    "partner_hotel_bookings"
)

PARTNER_HOTEL_BOOKINGS_RULES = serialize_header(
    "partner_hotel_bookings",
    "partner_hotel"
)
# ======================================================================

PARK_RULES = serialize_header(
    "park",
    "images", "events", "activities", "hotels", "partner_hotels"
)

PARK_IMG_RULES = serialize_header(
    "images",
    "park"
)

EVENT_RULES = serialize_header(
    "event",
    "park"
)