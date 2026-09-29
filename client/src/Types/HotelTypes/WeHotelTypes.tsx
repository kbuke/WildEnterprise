import type { BaseHotelType } from "./BaseHotelType";

export type WeHotelType = {
    park: {},
    rooms: [],
    room_rates: [],
    discounts: [],
    lead_times: [],
    hotel_bookings: []
} & BaseHotelType