import type { AllActivities } from "../Activities/types"
import type { AllWeHotels } from "../Hotels/types"

export type BasicWeHotelBookings = {
    id: number,
    booking_ref: string,
    name: string,
    guests: string,
    email: string,
    arrival: string,
    departure: string
}

export type AllWeHotelBookings = {
    date_of_deposit_charge: string,
    date_of_remainder_charge: string
} & BasicWeHotelBookings

export type SpecificWeHotelBooking = {
    activities: AllActivities[],
    hotel: AllWeHotels,
    room_bookings: []
}& AllWeHotelBookings

export type HotelStay = {
    id: number
    arrival: string
    departure: string
    guests: number
    parkId: number
}

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