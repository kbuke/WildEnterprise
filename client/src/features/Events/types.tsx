import type { NameImgInfo } from "../../GlobalTypes"
import type { AllParks } from "../Parks/types"

export type AllEvents = {
    id: number,
    start_date: string,
    multi_day_event: boolean,
    end_date?: string,
    start_time: string,
    end_time: string,
    no_of_tickets: number,
    tickets_sold: number,
    tickets_remaining: number,
    ticket_price: number,
    park_id: number,
    slug: string
}& NameImgInfo

export type SpecificEvent = {
    park: AllParks
}& AllEvents

export type PostEvent = {
    name: string,
    img: string,
    info: string,
    startDate: string,
    multiDayEvent: boolean,
    endDate?: string,
    startTime: string,
    endTime: string,
    noOfTickets: string,
    ticketPrice: string,
    parkId: number,
    cardInfo: string,
    pI1: string,
    pI2: string,
    pI3?: string,
    pI4?: string,
    pI5?: string
}