import type { NameImgInfo } from "../../GlobalTypes"

export type AllActivities = {
    id: number
    all_year_round: boolean,
    available_months: number[],
    free_with_stay: boolean,
    discount_with_stay: boolean,
    stay_discount?: number,
    price: number,
    park_id: number,
}& NameImgInfo

export type SpecificActivity = {
    park: [],
    activity_bookings: []
}& AllActivities

export type PostActivity = {
    allYearRound: boolean,
    availableMonths: number[] | null,
    freeWithStay: boolean,
    discountWithStay: boolean,
    stayDiscount: number | null,
    price: string,
    parkId: number
}& NameImgInfo