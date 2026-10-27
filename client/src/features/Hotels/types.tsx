import type { NameImgInfo } from "../../GlobalTypes"
import type { AllParks } from "../Parks/types"

type BaseHotelType = {
    slug: string,
    email: string,
    _password_hash: string,
    park_id: number
}& NameImgInfo

export type AllWeHotels = {
   id: number,
}& Omit<BaseHotelType, "_password_hash">

export type SpecificWeHotel = {
    park: AllParks,
    rooms: [],
    room_rates: [],
    discounts: [],
    lead_times: [],
    hotel_bookings: [] 
}& AllWeHotels

export type AllPartnerHotels = {
    id: number
}& Omit<BaseHotelType, "_password_hash">

export type SpecificPartnerHotel = {
    park: AllParks[],
    partner_hotel_bookings: []
}& AllPartnerHotels