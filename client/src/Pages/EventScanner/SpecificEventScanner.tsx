import { useCallback, useEffect, useRef, useState, type FormEvent } from "react"
import { useParams } from "react-router-dom"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Scanner, type IDetectedBarcode, type IScannerError } from "@yudiel/react-qr-scanner"

import { checkInTicket, extractTicketRef, fetchScanStats } from "../../features/EventScanner/api"
import type { CheckInResult } from "../../features/EventScanner/types"
import { ProgressBar } from "../../components/Finances/ProgressBar"
// import { ProgressBar } from "../../features/Finances/ProgressBar"
import { formatTime } from "../../components/dates/dates"
import { ScanResultCard } from "./ScanResultCard"

const SUCCESS_AUTO_DISMISS_MS = 3000

function cameraMessage(error: IScannerError): string {
    switch (error.kind) {
        case "permission-denied":
            return "Camera access was blocked. Allow the camera for this site in your browser settings, then reload. You can still check tickets in by reference below."
        case "insecure-context":
            return "The camera only works on a secure (https) connection. Open the site over https, or use localhost on this computer."
        case "no-camera":
            return "No camera was found on this device."
        case "in-use":
            return "The camera is being used by another app. Close it and reload."
        default:
            return `Could not start the camera: ${error.message}`
    }
}

export function SpecificEventScanner() {
    const { id } = useParams()
    const eventId = Number(id)

    const queryClient = useQueryClient()

    const [result, setResult] = useState<CheckInResult | null>(null)
    const [cameraError, setCameraError] = useState<string | null>(null)
    const [manualRef, setManualRef] = useState<string>("")

    // The camera reports the same QR code many times a second. This lock makes sure
    // one scan produces exactly one request until staff have seen the result.
    const lock = useRef<boolean>(false)

    const { data: stats } = useQuery({
        queryKey: ["scan-stats", eventId],
        queryFn: () => fetchScanStats(eventId),
        refetchInterval: 15_000, // other gates may be scanning too
        enabled: !Number.isNaN(eventId),
    })

    const checkIn = useMutation({
        mutationFn: (ticketRef: string) => checkInTicket(ticketRef, eventId),
        onSuccess: (res) => {
            setResult(res)
            navigator.vibrate?.(res.ok ? 120 : [200, 100, 200])
            queryClient.invalidateQueries({ queryKey: ["scan-stats", eventId] })
        },
    })

    const dismiss = useCallback(() => {
        setResult(null)
        lock.current = false
    }, [])

    // Successful scans clear themselves so the queue keeps moving.
    // Problems stay up until staff tap "Scan next".
    useEffect(() => {
        if (!result?.ok) return
        const timer = setTimeout(dismiss, SUCCESS_AUTO_DISMISS_MS)
        return () => clearTimeout(timer)
    }, [result, dismiss])

    const handleCode = useCallback(
        (raw: string) => {
            if (lock.current) return
            lock.current = true

            const ticketRef = extractTicketRef(raw)

            if (!ticketRef) {
                setResult({
                    ok: false,
                    code: "invalid",
                    message: "That isn't a Wild Enterprise ticket code.",
                })
                return
            }

            checkIn.mutate(ticketRef)
        },
        [checkIn]
    )

    const handleScan = (codes: IDetectedBarcode[]) => {
        const raw = codes[0]?.rawValue
        if (raw) handleCode(raw)
    }

    const handleManualSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (!manualRef.trim()) return
        handleCode(manualRef)
        setManualRef("")
    }

    if (Number.isNaN(eventId)) return <p>Could not find event</p>

    const scannerPaused = result !== null || checkIn.isPending

    return (
        <section className="bg-coal text-white min-h-screen px-4 py-6 flex flex-col items-center gap-6">
            {/* ------------------------------------------------------- header */}
            <header className="w-full max-w-md flex flex-col gap-2">
                <h1 className="text-sunset uppercase font-bold text-2xl">
                    {stats?.event.name ?? "Event scanner"}
                </h1>

                {stats && (
                    <>
                        <p className="text-xl font-bold">
                            {stats.checked_in} of {stats.total} tickets checked in
                        </p>
                        <ProgressBar
                            value={stats.total ? stats.checked_in / stats.total : 0}
                            widthClass="w-full"
                        />
                        <p className="text-gray-400">{stats.remaining} still to arrive</p>
                    </>
                )}
            </header>

            {/* ------------------------------------------------------ camera */}
            <div className="relative w-full max-w-md aspect-square overflow-hidden rounded border border-white/30 bg-black">
                {cameraError ? (
                    <p className="p-6 text-center">{cameraError}</p>
                ) : (
                    <Scanner
                        onScan={handleScan}
                        onError={(error) => setCameraError(cameraMessage(error))}
                        paused={scannerPaused}
                        formats={["qr_code"]}
                        // Rear camera on phones; falls back to the webcam on a laptop
                        constraints={{ facingMode: "environment" }}
                        components={{ finder: true, torch: true }}
                    />
                )}

                {result && <ScanResultCard result={result} onDismiss={dismiss} />}
            </div>

            {/* ---------------------------------------------- manual fallback */}
            <form onSubmit={handleManualSubmit} className="w-full max-w-md flex flex-col gap-2">
                <label htmlFor="manual-ref" className="text-gray-300">
                    Camera not working or code damaged? Enter the ticket reference:
                </label>

                <div className="flex gap-2">
                    <input
                        id="manual-ref"
                        value={manualRef}
                        onChange={(e) => setManualRef(e.target.value)}
                        placeholder="Tic-..."
                        autoComplete="off"
                        className="flex-1 rounded bg-white text-coal px-3 py-2"
                    />
                    <button
                        type="submit"
                        disabled={scannerPaused}
                        className="bg-sunset rounded px-4 py-2 font-bold cursor-pointer disabled:opacity-60"
                    >
                        Check in
                    </button>
                </div>
            </form>

            {/* ------------------------------------------------ recent scans */}
            {stats && stats.recent.length > 0 && (
                <div className="w-full max-w-md">
                    <h2 className="font-bold uppercase mb-2">Recent check-ins</h2>

                    <ul className="flex flex-col divide-y divide-white/10">
                        {stats.recent.map((r) => (
                            <li key={r.id} className="py-2 flex justify-between gap-4">
                                <span>
                                    {r.booking_name}
                                    <span className="block text-sm text-gray-400">
                                        {r.booking_ref}
                                    </span>
                                </span>
                                <span className="text-gray-400">
                                    {r.checked_in_at ? formatTime(r.checked_in_at) : ""}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </section>
    )
}