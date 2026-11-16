import { useQuery } from "@tanstack/react-query"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import type { SpecificEvent } from "../../features/Events/types"
import type { EventBookingRow, EventFinanceData } from "../../features/Events/finance"
import { fetchEventFinance } from "../../features/Events/api"

import { Panel } from "../../components/Finances/Panel"
import { StatTile } from "../../components/Finances/StartTitle"
import { StatusBadge } from "../../components/Finances/StatusBadge"
import { RunningTotalChart } from "../../components/Finances/RunningTotalChart"
import { compactZar, longDate, shortDate, zar } from "../../components/Finances/Format"
import { SUNSET, cursorStyle, tooltipStyle } from "../../components/Finances/ChartTheme"

type EventFinancesProps = {
    event: SpecificEvent
}

export function EventFinances({ event }: EventFinancesProps) {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["events", event.id, "finance"],
        queryFn: () => fetchEventFinance(event.id),
    })

    return (
        <div className="bg-coal text-white w-full py-4 px-24">
            <h1 className="text-sunset uppercase text-4xl font-bold">Finances</h1>

            {isLoading && <p className="mt-10">Loading finances...</p>}
            {isError && <p className="mt-10">Could not load finances. Try refreshing the page.</p>}
            {data && <Dashboard data={data} />}
        </div>
    )
}

function eventTiming(days: number) {
    if (days > 1) return `${days} days to go`
    if (days === 1) return "Tomorrow"
    if (days === 0) return "Today"
    return `${Math.abs(days)} days ago`
}

function Dashboard({ data }: { data: EventFinanceData }) {
    const { event, summary, timeline, granularity, bookings } = data

    const chartData = timeline.map((p) => ({ ...p, label: shortDate(p.date) }))

    const cancelOpen = summary.days_until_event >= 0 &&
        new Date(`${summary.cancellation_deadline}T00:00:00`) >= new Date(new Date().toDateString())

    return (
        <div className="mt-8 mb-10 flex flex-col gap-10">
            {/* ---------------------------------------------- headline numbers */}
            <div className="grid grid-cols-4 gap-6">
                <StatTile
                    label="Revenue"
                    value={zar.format(summary.revenue)}
                    sub={
                        summary.refunded > 0
                            ? `${zar.format(summary.refunded)} refunded`
                            : `of ${zar.format(summary.potential_revenue)} if sold out`
                    }
                />
                <StatTile
                    label="Tickets sold"
                    value={`${summary.tickets_sold}/${summary.no_of_tickets}`}
                    sub={`${Math.round(summary.sell_through * 100)}% sold`}
                />
                <StatTile
                    label="Bookings"
                    value={String(summary.bookings)}
                    sub={`${zar.format(summary.average_booking_value)} average · ${summary.cancelled_bookings} cancelled`}
                />
                <StatTile
                    label="Event date"
                    value={eventTiming(summary.days_until_event)}
                    sub={
                        cancelOpen
                            ? `Cancellations close ${longDate(summary.cancellation_deadline)}`
                            : "Cancellations closed"
                    }
                />
            </div>

            {/* ---------------------------------------------------- charts */}
            <div className="grid grid-cols-2 gap-6">
                <Panel title={`Running revenue since ${longDate(event.timeline_start)}`}>
                    <RunningTotalChart
                        data={chartData}
                        xKey="label"
                        yKey="cumulative_revenue"
                        name="Cumulative revenue"
                        target={{ value: summary.potential_revenue, label: "Sold out" }}
                    />
                </Panel>

                <Panel title={granularity === "week" ? "New revenue per week" : "New revenue per day"}>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData}>
                            <CartesianGrid stroke="#333" vertical={false} />
                            <XAxis dataKey="label" stroke="#aaa" minTickGap={24} />
                            <YAxis stroke="#aaa" tickFormatter={compactZar} width={60} />
                            <Tooltip
                                contentStyle={tooltipStyle}
                                cursor={cursorStyle}
                                formatter={(v) => zar.format(Number(v))}
                                labelFormatter={(l) => (granularity === "week" ? `Week of ${l}` : l)}
                            />
                            <Bar dataKey="revenue" name="Revenue" fill={SUNSET} />
                        </BarChart>
                    </ResponsiveContainer>
                </Panel>
            </div>

            {/* ---------------------------------------------------- bookings */}
            <Panel title={`Bookings (${bookings.length})`}>
                <BookingsTable bookings={bookings} deadline={summary.cancellation_deadline} />
            </Panel>
        </div>
    )
}

function BookingsTable({ bookings, deadline }: { bookings: EventBookingRow[]; deadline: string }) {
    if (bookings.length === 0) {
        return <p className="text-gray-400">No bookings yet.</p>
    }

    return (
        <div className="max-h-[32rem] overflow-y-auto">
            <table className="w-full text-left">
                <thead className="sticky top-0 bg-coal">
                    <tr className="text-gray-400 border-b border-white/30">
                        <th className="py-2 font-normal">Booked by</th>
                        <th className="py-2 font-normal">People</th>
                        <th className="py-2 font-normal">Booked on</th>
                        <th className="py-2 font-normal text-right">Paid</th>
                        <th className="py-2 font-normal pl-8">Status</th>
                        <th className="py-2 font-normal">Cancellation</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((b) => (
                        <tr key={b.id} className="border-b border-white/10 align-top">
                            <td className="py-3">
                                <p className="font-bold">{b.name}</p>
                                <p className="text-sm text-gray-400">{b.email}</p>
                                <p className="text-sm text-gray-400">{b.booking_ref}</p>
                            </td>
                            <td className="py-3">
                                {b.active_tickets}
                                {b.active_tickets !== b.no_of_people && (
                                    <span className="text-sm text-gray-400"> of {b.no_of_people}</span>
                                )}
                            </td>
                            <td className="py-3">{longDate(b.booking_date)}</td>
                            <td className="py-3 text-right">
                                {zar.format(b.paid)}
                                {b.refunded > 0 && (
                                    <p className="text-sm text-gray-400">{zar.format(b.refunded)} refunded</p>
                                )}
                            </td>
                            <td className="py-3 pl-8">
                                <div className="flex flex-col items-start gap-1">
                                    <StatusBadge status={b.booking_status} />
                                    <StatusBadge status={b.payment_status} />
                                </div>
                            </td>
                            <td className="py-3 text-sm">
                                {b.booking_status === "Cancelled"
                                    ? "-"
                                    : b.can_cancel
                                        ? `Open until ${longDate(deadline)}`
                                        : "Closed"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}