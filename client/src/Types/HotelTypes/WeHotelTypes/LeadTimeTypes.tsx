import type { FetchAllRoomType } from "./RoomType"
import type { FetchAllWeHotelType } from "./WeHotelTypes"

export type FetchAllLeadTimeTypes = {
    id: number
    min_days: number
    max_days?: number
    multiplier: number
    label: string
    hotel_id?: number
    room_id?: number
}

export type FetchSpecificLeadTimeType = {
    hotel: FetchAllWeHotelType
    room: FetchAllRoomType
}