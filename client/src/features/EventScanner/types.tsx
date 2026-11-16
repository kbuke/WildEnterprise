export type ScanCounts = { checked_in: number; total: number }

export type ScannedTicket = {
    id: number
    ticket_ref: string
    attendee_name: string
    checked_in_at: string | null
}

export type ScannedBooking = {
    booking_ref: string
    name: string
    tickets_total: number
    tickets_checked_in: number
}

// Codes the backend sends, plus three the frontend produces itself
export type ScanErrorCode =
    | "invalid"
    | "wrong_event"
    | "already_checked_in"
    | "cancelled"
    | "not_today"
    | "invalid_status"
    | "bad_request"
    | "unauthorised"
    | "network"
    | "error"

export type CheckInResult =
    | { ok: true; ticket: ScannedTicket; booking: ScannedBooking; event: ScanCounts }
    | {
          ok: false
          code: ScanErrorCode
          message: string
          ticket?: ScannedTicket
          booking?: ScannedBooking
      }

export type RecentCheckIn = ScannedTicket & {
    booking_ref: string
    booking_name: string
}

export type ScanStats = {
    event: { id: number; name: string; start_date: string; end_date: string | null }
    checked_in: number
    total: number
    remaining: number
    recent: RecentCheckIn[]
}