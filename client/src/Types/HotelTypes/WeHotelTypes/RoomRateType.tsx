import type { FetchAllRoomType } from "./RoomType"
import type { FetchAllWeHotelType } from "./WeHotelTypes"

export type FetchAllRoomRateType = {
    id: number
    name: string
    start_date: Date
    end_date: Date
    modifier_type: string
    value: number
    priority: number
    hotel_id?: number
    room_id?: number
}

export type FetchSpecificRoomRateType = {
    hotel: FetchAllWeHotelType
    room: FetchAllRoomType
}