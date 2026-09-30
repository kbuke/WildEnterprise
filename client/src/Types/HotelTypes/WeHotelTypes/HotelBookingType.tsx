import type { FetchAllActivityBookingsType } from "../../ActivityTypes/ActivityBookingType"
import type { BaseHotelBookingType } from "../BaseHotelBookingType"
import type { FetchAllRoomBookingType } from "./RoomBookingType"
import type { FetchAllWeHotelType } from "./WeHotelTypes"

export type FetchAllHotelBookingType = {
    id: number,
    booking_ref: string,
    date_of_deposit_charge: Date,
    date_of_remainder_change: Date,
    hotel_id: number
} & BaseHotelBookingType

export type FetchSpecificHotelBooking = {
    hotel: FetchAllWeHotelType
    room_bookings: FetchAllRoomBookingType[]
    activities: FetchAllActivityBookingsType[]
} & FetchAllHotelBookingType