import type { AllParks } from "../Parks/types"

export type AllParkImgs = {
    id: number,
    img: string,
    park_id: number,
}

export type SpecificParkImg = {
    park: AllParks[]
}& AllParkImgs
