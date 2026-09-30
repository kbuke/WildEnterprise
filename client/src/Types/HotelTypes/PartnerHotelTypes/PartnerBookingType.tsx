import type { FetchAllActivityBookingsType } from "../../ActivityTypes/ActivityBookingType"
import type { BaseHotelBookingType } from "../BaseHotelBookingType"
import type { FetchAllPartnerHotelType } from "./PartnerHotelType"

export type FetchAllPartnerBookingType = {
    id: number
    ref_code: string,
    partner_hotel_id: number
}& BaseHotelBookingType

export type FetchSpecificPartnerBookingType = {
    partner_hotel: FetchAllPartnerHotelType
    activities: FetchAllActivityBookingsType[]
}& FetchAllPartnerBookingType