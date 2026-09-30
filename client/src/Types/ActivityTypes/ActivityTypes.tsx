import type { FetchAllParkType } from "../ParkTypes/ParkTypes"
import type { FetchAllActivityBookingsType } from "./ActivityBookingType"

export type FetchAllActivityTypes = {
    id: number
    name: string
    img: string
    info: string
    all_year_round: boolean
    available_months: number[]
    free_with_stay: boolean
    discount_with_stay: boolean
    stay_discount?: number
    park_id: number
}

export type FetchSpecificActivityType = {
    park: FetchAllParkType
    activity_bookings: FetchAllActivityBookingsType[]
}& FetchAllActivityTypes

export type FetchAllWalkingActivityType = {
    map: string,
    code_of_conduct: string
}& FetchAllActivityTypes

export type FetchSpecificWalkingActivityType = {
    park: FetchAllParkType
    activity_bookings: FetchAllActivityBookingsType[]
}& FetchAllWalkingActivityType