import type { PostPark, SpecificPark } from "./types";

export const parkToFormValues = (e: SpecificPark): Partial<PostPark> => ({
    name: e.name,
    img: e.img,
    info: e.info,
    accomodation: e.accomodation,
    location: e.location,
    cardInfo: e.card_info,
    pI1: e.primary_img_1,
    pI2: e.primary_img_2,
    pI3: e.primary_img_3 ?? undefined,
    pI4: e.primary_img_4 ?? undefined,
    pI5: e.primary_img_5 ?? undefined
})

export const cleanParkPayload = (data: PostPark): PostPark => ({
    ...data,
    pI3: data.pI3 || undefined,
    pI4: data.pI4 || undefined,
    pI5: data.pI5 || undefined
})

export function pickDirty<T extends object>(
    data: T,
    dirty: Partial<Record<keyof T, unknown>>
): Partial<T>{
    return Object.fromEntries(
        Object.entries(data).filter(([key]) => dirty[key as keyof T])
    ) as Partial<T>
}