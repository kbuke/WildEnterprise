export type FinanceCategory = "hotel" | "events" | "activities"
 
export type MonthlyFinance = {
    month: number // 1-12
    total: number
} & Record<FinanceCategory, number>
 
export type EventFinance = {
    id: number
    name: string
    start_date: string
    ticket_price: number
    no_of_tickets: number
    tickets_sold: number
    sell_through: number // 0-1
    bookings: number
    revenue: number
    potential_revenue: number
}
 
export type ActivityFinance = {
    id: number
    name: string
    revenue: number
    bookings: number
    people: number
}
 
export type ParkFinanceData = {
    year: number
    totals: { total: number } & Record<FinanceCategory, number>
    counts: {
        hotel_stays: number
        activity_bookings: number
        event_bookings: number
    }
    monthly: MonthlyFinance[]
    events: EventFinance[]
    activities: ActivityFinance[]
}
 
