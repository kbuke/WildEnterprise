import type { CardImgInfo, NameImgInfo, PostCardImginfo } from "../../GlobalTypes"
import type { AllActivities } from "../Activities/types"
import type { AllEvents } from "../Events/types"
import type { AllPartnerHotels, AllWeHotels } from "../Hotels/types"
import type { AllParkImgs } from "../ParkImages/types"
import type { AllRooms } from "../Rooms/types"

export type AllParks = {
    id: number,
    slug: string,
    location: string,
}&NameImgInfo &CardImgInfo

export type SpecificPark = {
    images: AllParkImgs[],
    events: AllEvents[],
    activities: AllActivities[],
    hotels: AllWeHotels[],
    partner_hotels: AllPartnerHotels[]
    accomodation: boolean,
    rooms: AllRooms[]
}& AllParks

export type PostPark = {
    accomodation: boolean,
    email?: string,
    password?: string
}&PostCardImginfo & Omit<AllParks, "slug" | "id" | keyof CardImgInfo>
