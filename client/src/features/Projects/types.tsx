export type ProjectStatus = "Draft" | "Published"

export type AllProjects = {
    id: number
    name: string
    slug: string
    img: string | null
    info: string | null
    card_info: string | null
    primary_img_1: string | null
    primary_img_2: string | null
    primary_img_3: string | null
    primary_img_4: string | null
    primary_img_5: string | null
    status: ProjectStatus
    published_at: string | null
    article_ids: number[]
}

export type PostProject = {
    name: string
    img?: string
    info?: string
    cardInfo?: string
    pI1?: string
    pI2?: string
    pI3?: string
    pI4?: string
    pI5?: string
    status: ProjectStatus
    articleIds: number[]
}