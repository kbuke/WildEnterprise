import type { FetchAllParkType } from "./ParkTypes"

export type FetchAllParkImgType = {
    id: number 
    img: string 
    park_id: number
}

export type FetchSpecificParkImgType = {
    park: FetchAllParkType
}& FetchAllParkImgType

export type PostParkImgType = {
    img: string,
    parkId: number
}