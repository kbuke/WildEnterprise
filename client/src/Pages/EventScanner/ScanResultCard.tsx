import { formatTime } from "../../components/dates/dates"
import type { CheckInResult, ScanErrorCode } from "../../features/EventScanner/types"

const HEADING: Record<ScanErrorCode, string> = {
    invalid: "Invalid ticket",
    wrong_event: "Wrong event",
    already_checked_in: "Already scanned",
    cancelled: "Cancelled ticket",
    not_today: "Event not on today",
    invalid_status: "Can't check in",
    bad_request: "Scan failed",
    unauthorised: "Signed out",
    network: "No connection",
    error: "Something went wrong",
}

// Full class strings so Tailwind can see them.
function toneClass(result: CheckInResult) {
    if (result.ok) return "bg-emerald-700"
    if (result.code === "already_checked_in" || result.code === "not_today") return "bg-amber-600"
    return "bg-red-700"
}

type ScanResultCardProps = {
    result: CheckInResult
    onDismiss: () => void
}

export function ScanResultCard({ result, onDismiss }: ScanResultCardProps) {
    const { booking, ticket } = result

    return (
        <div
            role="alert"
            aria-live="assertive"
            className={`absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center ${toneClass(result)}`}
        >
            <h2 className="text-3xl font-bold uppercase">
                {result.ok ? "Checked in" : HEADING[result.code]}
            </h2>

            {!result.ok && <p className="text-lg">{result.message}</p>}

            {booking && (
                <div className="flex flex-col gap-1">
                    <p className="text-2xl font-bold">{booking.name}</p>
                    <p className="text-lg">Ref: {booking.booking_ref}</p>

                    {ticket && ticket.attendee_name !== booking.name && (
                        <p className="text-lg">Ticket holder: {ticket.attendee_name}</p>
                    )}

                    <p className="text-lg mt-2">
                        {booking.tickets_checked_in} of {booking.tickets_total} tickets in this
                        booking checked in
                    </p>
                </div>
            )}

            {!result.ok && result.code === "already_checked_in" && ticket?.checked_in_at && (
                <p className="text-lg font-bold">
                    First scanned at {formatTime(ticket.checked_in_at)}
                </p>
            )}

            <button
                type="button"
                onClick={onDismiss}
                className="mt-4 bg-white text-coal font-bold rounded px-6 py-3 text-lg cursor-pointer"
            >
                Scan next
            </button>
        </div>
    )
}