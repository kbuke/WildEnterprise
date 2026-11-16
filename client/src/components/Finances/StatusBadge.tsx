type Tone = "good" | "warn" | "bad" | "neutral"

// Full class strings so Tailwind can see them.
const TONE_CLASS: Record<Tone, string> = {
    good: "bg-emerald-500/20 text-emerald-300",
    warn: "bg-amber-500/20 text-amber-300",
    bad: "bg-red-500/20 text-red-300",
    neutral: "bg-white/10 text-gray-300",
}

// Add statuses here as you meet them (hotel bookings, tickets, payments...).
const STATUS_TONE: Record<string, Tone> = {
    Confirmed: "good",
    Paid: "good",
    Valid: "good",
    "Checked In": "good",
    Pending: "warn",
    "Partially Cancelled": "warn",
    Cancelled: "bad",
    Failed: "bad",
}

export function StatusBadge({ status }: { status: string }) {
    const tone = STATUS_TONE[status] ?? "neutral"
    return (
        <span className={`inline-block rounded px-2 py-0.5 text-sm font-bold ${TONE_CLASS[tone]}`}>
            {status}
        </span>
    )
}