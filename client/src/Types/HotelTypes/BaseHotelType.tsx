import type { BaseNameImgInfoType } from "../BaseTypes/BaseNameImgInfoType"

export type BaseHotelType = {
    park_id: number,
    slug: string,
    email: string
} & BaseNameImgInfoType

export type PostBaseHotelType = {
    email: string,
    password: string,
    parkId: number
} & BaseNameImgInfoType