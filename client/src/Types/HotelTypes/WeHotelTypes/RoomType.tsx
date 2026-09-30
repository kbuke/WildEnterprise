import type { FetchAllDiscountType } from "./DiscountType"
import type { FetchAllLeadTimeTypes } from "./LeadTimeTypes"
import type { FetchAllRoomBookingType } from "./RoomBookingType"
import type { FetchAllRoomHoldType } from "./RoomHoldType"
import type { FetchAllRoomRateType } from "./RoomRateType"
import type { FetchAllWeHotelType } from "./WeHotelTypes"

export type FetchAllRoomType = {
    id: number
    name: string
    img: string
    no_of_rooms: number
    max_people: number
    base_price: number
    hotel_id: number
}

export type FetchSpecificRoomType = {
    hotel: FetchAllWeHotelType
    room_rates: FetchAllRoomRateType[]
    discounts: FetchAllDiscountType[]
    lead_times: FetchAllLeadTimeTypes[]
    room_bookings: FetchAllRoomBookingType[]
    holds: FetchAllRoomHoldType[]
}& FetchAllRoomType