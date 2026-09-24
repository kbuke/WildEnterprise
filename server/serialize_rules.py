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
BOOKING_RULES = serialize_header(
    "booking",
    "hotel", "room_bookings", "hotel_activities"
)

DISCOUNT_RULES = serialize_header(
    "discount",
    "hotel", "room"
)

HOTEL_RULES = serialize_header(
    "hotel",
    "park", "rooms", "room_rates", "discounts", "lead_times", "bookings"
)

LEAD_TIME_RULES = serialize_header(
    "lead_times",
    "hotel", "room"
)

ROOM_BOOKING_RULES = serialize_header(
    "room_bookings",
    "room", "booking"
)

ROOM_RULES = serialize_header(
    "room",
    "hotel", "room_rates", "discounts", "lead_times"
)

ROOM_HOLD_RULES = serialize_header(
    "holds",
    "room"
)
# ======================================================================

PARK_RULES = serialize_header(
    "park",
    "images", "events", "activities", "hotels"
)

PARK_IMG_RULES = serialize_header(
    "images",
    "park"
)


EVENT_RULES = serialize_header(
    "event",
    "park"
)