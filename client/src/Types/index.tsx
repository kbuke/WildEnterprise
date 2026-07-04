export type AnimalType = {
    id?: number,
    img: string,
    name: string,
    info: string,
    endangered_level: "Least Concern" | "Never Threatened" | "Vulnerable" | "Endangered" | "Critically Endangered",
    animal_type: "Big Cats" | "Large Mammals" | "Antelope" | "Primates" | "Birds" | "Reptiles" | "Carnivores",
    big_five: Boolean
}

export type AnimalProfileType = {
    onClose: () => void
} & AnimalType

export type BlogType = {
    id: number
    title: string,
    slug: string,
    cover_photo: string,
    views: number,
    content: string,
    status?: "Draft" | "Published",
    published_at: string,
    updated_at: string,
    edited_at: string
}

export type ParamsType = {
    slug: string,
    id: string
}

export type SectionHeadingType = {
    heading: string,
    textWhite: boolean
}

export type SiteInfoType = {
    name: string
    info: string,
    img1: string,
    img2: string,
    img3: string
}

export type SiteType = {
    id: number
    name: string,
    slug: string,
    location: string,
    intro: string,
    head_img: string,
    info: string,
    primary_img_1: string,
    primary_img_2: string,
    primary_img_3: string,
    animals: AnimalType[],
    blogs: BlogType[]
}