// features/ActivityBookings/types.ts
// export type AllActivityBookings = {
//     date: string
//     no_of_people: number
//     activity_id: number
//     hotel_booking_id?: number
//     partner_hotel_booking_id?: number
// }

// export type PostActivityBooking = {
//     date: string
//     noOfPeople: number
//     activityId: number
//     hotelBookingId?: number
//     partnerHotelBookingId?: number
// }

import type { StayType } from "../HotelBookings/types"

export type AllActivityBookings = {
    id: number
    booking_reference: string
    date: string
    no_of_people: number
    total_price: number
    activity_id: number
    hotel_booking_id: number | null
    partner_hotel_booking_id: number | null
}

export type PostActivityBooking = {
    date: string
    noOfPeople: number
    activityId: number
    bookingRef?: string   // only when booking against a stay
    email?: string
    stayType?: StayType
}