import type { FetchAllPartnerHotelType } from "../HotelTypes/PartnerHotelTypes/PartnerHotelType"
import type { FetchAllWeHotelType } from "../HotelTypes/WeHotelTypes/WeHotelTypes"
import type { FetchAllParkImgType } from "./ParkImgType"

export type FetchAllParkType = {
    id: number
    name: string
    img: string
    info: string
    location: string
}

export type FetchSpecificParkType = {
    images: FetchAllParkImgType
    hotels?: FetchAllWeHotelType
    partner_hotels?: FetchAllPartnerHotelType
}& FetchAllParkType