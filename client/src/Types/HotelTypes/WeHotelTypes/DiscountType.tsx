import type { FetchAllRoomType } from "./RoomType"
import type { FetchAllWeHotelType } from "./WeHotelTypes"

export type FetchAllDiscountType = {
    id: number
    name: string
    code?: string
    percentage_off: number
    priority: number
    discount_based_on_booking: boolean
    booking_start_date?: Date
    booking_end_date?: Date
    stay_start_date?: Date
    stay_end_date?: Date
    is_hotel_wide_discount?: boolean
    hotel_id?: number
    room_id?: number
}

export type FetchSpecificDiscount = {
    hotel: FetchAllWeHotelType,
    room: FetchAllRoomType
} & FetchAllDiscountType