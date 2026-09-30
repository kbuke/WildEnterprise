import type { FetchAllParkType } from "../../ParkTypes/ParkTypes"
import type { BaseHotelType } from "../BaseHotelType"
import type { FetchAllPartnerBookingType } from "./PartnerBookingType"

export type FetchAllPartnerHotelType = {
    id: number
}& BaseHotelType

export type FetchSpecificPartnerHotel = {
    partner_hotel_bookings: FetchAllPartnerBookingType[]
    park: FetchAllParkType
}& FetchAllPartnerHotelType