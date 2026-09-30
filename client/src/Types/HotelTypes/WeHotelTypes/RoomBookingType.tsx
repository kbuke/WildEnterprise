import type { FetchAllHotelBookingType } from "./HotelBookingType"
import type { FetchAllRoomType } from "./RoomType"

export type FetchAllRoomBookingType = {
    id: number
    quantity: number
    unit_price: number 
    price_locked: number 
    hotel_id: number 
    room_id: number
}

export type FetchSpecificRoomBookingType = {
    hotel_booking: FetchAllHotelBookingType
    room: FetchAllRoomType
}& FetchAllRoomBookingType