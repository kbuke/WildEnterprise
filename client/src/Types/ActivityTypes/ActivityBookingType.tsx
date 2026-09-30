import type { FetchAllPartnerHotelType } from "../HotelTypes/PartnerHotelTypes/PartnerHotelType"
import type { FetchAllWeHotelType } from "../HotelTypes/WeHotelTypes/WeHotelTypes"
import type { FetchAllActivityTypes } from "./ActivityTypes"

export type FetchAllActivityBookingsType = {
    id: number
    booking_reference: string
    data: Date
    no_of_people: number
    total_price: number
    activity_id: number
    hotel_booking_id?: number
    partner_hotel_booking_id?: number
}

export type FetchSpecificActivityBookingType = {
    activity: FetchAllActivityTypes
    hotel_bookings: FetchAllWeHotelType[]
    partner_hotel_bookings: FetchAllPartnerHotelType[]
}& FetchAllActivityBookingsType