import type { AllActivities } from "../Activities/types"
import type { AllWeHotels } from "../Hotels/types"
import type { AllParks } from "../Parks/types"

export type BasicWeHotelBookings = {
    id: number,
    booking_ref: string,
    name: string,
    guests: string,
    email: string,
    arrival: string,
    departure: string,
    reviewer_name: string,
    reviewer_img: string,
    rating: number,
    review: string
}

export type AllWeHotelBookings = {
    date_of_deposit_charge: string,
    date_of_remainder_charge: string
} & BasicWeHotelBookings

export type SpecificWeHotelBooking = {
    activities: AllActivities[],
    park: AllParks,
    room_bookings: []
}& AllWeHotelBookings

export type StayType = "we" | "partner"

export type StayLookup = {
    parkId: number
    bookingRef: string
    email: string
    stayType?: StayType
}

export type StayDetails = {
    bookingName: string
    arrival: string
    departure: string
    guests: number
}

export type VerifiedStay = StayLookup & StayDetails

// export type HotelStay = {
//     id: number
//     arrival: string
//     departure: string
//     guests: number
//     parkId: number
// }

export type PostHotelBooking = {
  parkId: number
  arrival: string
  departure: string
  guests: number
  name: string
  email: string
  rooms: { roomId: number; quantity: number }[]
}

export type HotelBookingResponse = { 
    id: number; 
    booking_ref: string; 
    [k: string]: unknown 
}