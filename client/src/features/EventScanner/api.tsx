import { fetchAllInstances } from "../../api/client"
import type { CheckInResult, ScanStats } from "./types"

export const fetchScanStats = (eventId: number) =>
    fetchAllInstances<ScanStats>(`/api/eventtickets/stats/${eventId}`)

// Ticket refs look like "Tic-" + 32 hex characters (see EventTicketModel.ticket_ref).
// Pulling the ref out with a regex means it still works if the QR code holds a URL
// that contains the ref, and tolerates lowercase when staff type it in by hand.
const TICKET_REF = /Tic-([0-9a-f]{32})/i

export function extractTicketRef(raw: string): string | null {
    const match = raw.match(TICKET_REF)
    return match ? `Tic-${match[1].toUpperCase()}` : null
}

// Never throws: every outcome (including 4xx and network failure) comes back as a
// CheckInResult so the scanner can always show something to the person at the gate.
// This doesn't use postInstance because a refused scan needs its full response body
// (who the ticket belongs to, when it was scanned), not just an error message.
export async function checkInTicket(ticketRef: string, eventId: number): Promise<CheckInResult> {
    try {
        const res = await fetch("/api/eventtickets/checkin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ ticketRef, eventId }),
        })

        const body = await res.json().catch(() => ({}))

        if (res.ok) {
            return { ok: true, ticket: body.ticket, booking: body.booking, event: body.event }
        }

        if (res.status === 401) {
            return {
                ok: false,
                code: "unauthorised",
                message: "Your scanner session has expired. Sign in again to keep scanning.",
            }
        }

        return {
            ok: false,
            code: body.code ?? "error",
            message: body.error ?? "Something went wrong",
            ticket: body.ticket,
            booking: body.booking,
        }
    } catch {
        return {
            ok: false,
            code: "network",
            message: "Could not reach the server. Check the connection, then scan again.",
        }
    }
}