export type EventBookingRow = {
    id: number
    booking_ref: string
    name: string
    email: string
    no_of_people: number
    active_tickets: number
    booking_date: string
    total_cost: number
    paid: number
    refunded: number
    booking_status: "Confirmed" | "Partially Cancelled" | "Cancelled"
    payment_status: string
    can_cancel: boolean
}
 
export type EventTimelinePoint = {
    date: string
    revenue: number
    tickets: number
    cumulative_revenue: number | null
    cumulative_tickets: number | null
}
 
export type EventFinanceData = {
    event: {
        id: number
        name: string
        start_date: string
        ticket_price: number
        no_of_tickets: number
        timeline_start: string
    }
    summary: {
        revenue: number
        refunded: number
        tickets_sold: number
        no_of_tickets: number
        sell_through: number // 0-1
        potential_revenue: number
        bookings: number
        cancelled_bookings: number
        average_booking_value: number
        days_until_event: number // negative once the event has passed
        cancellation_deadline: string
    }
    granularity: "day" | "week"
    timeline: EventTimelinePoint[]
    bookings: EventBookingRow[]
}