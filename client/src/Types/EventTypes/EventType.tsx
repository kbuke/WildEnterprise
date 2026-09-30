import type { FetchAllParkType } from "../ParkTypes/ParkTypes"

export type FetchAllEventType = {
    id: number
    name: string
    img: string
    info: string
    start_date: Date
    multi_day_event: boolean
    end_date?: Date
    start_time: Date
    end_time: Date
    no_of_tickets: number
    tickets_sold: number
    tickets_remainig: number
    ticket_price: number
    park_id: number
}

export type FetchSpecificEventType = {
    park: FetchAllParkType
}& FetchAllEventType