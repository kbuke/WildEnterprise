import type { AllEvents } from "../Events/types"
import type { AllParks } from "../Parks/types"

export type ArticleStatus = "Draft" | "Published"

export type AllArtciles = {
    id: number
    title: string
    slug: string
    img: string | null          // drafts may not have these yet
    text: string | null
    status: ArticleStatus
    published_at: string | null
    park_ids: number[]
    event_ids: number[]
    project_ids: number[]
}

export type SpecificArticle = {
    parks: AllParks[]
    events: AllEvents[]
} & AllArtciles

export type PostArticle = {
    title: string
    img?: string
    text?: string
    status: ArticleStatus
    parkIds: number[]
    eventIds: number[]
    projectIds: number[]
}