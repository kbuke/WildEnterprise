// types.ts
export type TicketStatus = "Valid" | "Cancelled" | "Checked In"

export type EventTicket = {
    id: number
    attendee_name: string
    attendee_email: string
    status: TicketStatus
    price_paid: number
    email_status: "Pending" | "Sent" | "Failed"
    checked_in: boolean
}

export type EventBooking = {
    id: number
    booking_ref: string
    name: string
    email: string
    no_of_people: number
    total_cost: number
    send_tickets_to_all: boolean
    payment_status: string
    booking_status: "Confirmed" | "Partially Cancelled" | "Cancelled"
    event_id: number
    event_name: string
    tickets: EventTicket[]
}

export type PostEventBooking = {
    eventId: number
    name: string
    email: string
    attendees: { name: string; email?: string }[]   // guest 1 is the booker
    sendTicketsToAll: boolean
}

export type BookingLookup = { bookingRef: string; email: string }
export type CancelTickets = BookingLookup & { ticketIds?: number[] }
export type CancelResult = { refund: number; booking: EventBooking }