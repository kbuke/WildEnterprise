import type { FetchAllParkType } from "../../ParkTypes/ParkTypes";
import type { BaseHotelType } from "../BaseHotelType";
import type { FetchAllDiscountType } from "./DiscountType";
import type { FetchAllLeadTimeTypes } from "./LeadTimeTypes";
import type { FetchAllRoomRateType } from "./RoomRateType";
import type { FetchAllRoomType } from "./RoomType";

export type FetchAllWeHotelType = {
   id: number
} & BaseHotelType

export type FetchSpecificWeHotelType = {
    rooms: FetchAllRoomType[]
    room_rates: FetchAllRoomRateType[]
    discounts: FetchAllDiscountType[]
    lead_times: FetchAllLeadTimeTypes[]
    park: FetchAllParkType
} & FetchAllWeHotelType

export type CheckWeHotelAdminSessionType = {
    is_hotel_admin: boolean
} & FetchSpecificWeHotelType