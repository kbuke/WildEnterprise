import type { FetchBaseHotel } from "../Hotels/types"
import type { FetchRelationalParkType } from "../Parks/types"

export type FetchAllPartnerHotels = {
    id: number,
    partner_hotel_bookings: [],
    park: FetchRelationalParkType[]
}& FetchBaseHotel

export type FetchRelationalPartnerHotel = Omit<FetchAllPartnerHotels, "park" | "partner_hotel_bookings">