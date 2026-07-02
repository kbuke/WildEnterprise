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
    primary_img_3: string
}