import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts"

import {
    type EventFinance,
    type FinanceCategory,
    type ParkFinanceData,
} from "../../features/Parks/finance"

import { fetchParkFinance } from "../../features/Parks/api"
import { StatTile } from "../../components/Finances/StartTitle"
import { Panel } from "../../components/Finances/Panel"

type ParkFinancialsProps = {
    parkId: number
}

const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

const CATEGORY_LABEL: Record<FinanceCategory, string> = {
    hotel: "Hotel stays",
    events: "Events",
    activities: "Activities",
}

// recharts needs real colour strings. --color-sunset exists if "sunset" is in your
// Tailwind @theme; the fallbacks are used otherwise.
const CATEGORY_COLOR: Record<FinanceCategory, string> = {
    hotel: "var(--color-sunset, #f26b3a)",
    events: "#3fb8a8",
    activities: "#7aa7e8",
}

const CATEGORIES: FinanceCategory[] = ["hotel", "events", "activities"]

const zar = new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    maximumFractionDigits: 0,
})

const compactZar = (n: number) =>
    n >= 1000 ? `R${Math.round(n / 1000)}k` : `R${n}`

const tooltipStyle = {
    backgroundColor: "#1b1b1b",
    border: "1px solid #444",
    borderRadius: 4,
    color: "#fff",
}

export function ParkFinancials({ parkId }: ParkFinancialsProps) {
    const currentYear = new Date().getFullYear()
    const [year, setYear] = useState<number>(currentYear)

    const { data, isLoading, isError } = useQuery({
        queryKey: ["parks", parkId, "finance", year],
        queryFn: () => fetchParkFinance(parkId, year),
    })

    return (
        <div className="bg-coal text-white py-10 px-20">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold">Revenue in {year}</h2>

                <select
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                    className="bg-coal border border-white rounded px-4 py-2 text-lg"
                    aria-label="Select year"
                >
                    {[currentYear, currentYear - 1, currentYear - 2].map((y) => (
                        <option key={y} value={y}>
                            {y}
                        </option>
                    ))}
                </select>
            </div>

            {isLoading && <p className="mt-10">Loading finances...</p>}
            {isError && <p className="mt-10">Could not load finances. Try refreshing the page.</p>}
            {data && <Dashboard data={data} />}
        </div>
    )
}

function Dashboard({ data }: { data: ParkFinanceData }) {
    const { totals, counts, monthly, events, activities } = data

    if (totals.total === 0 && events.length === 0) {
        return <p className="mt-10 text-xl">No bookings recorded for {data.year} yet.</p>
    }

    // Running total: stop the line after the last month that has any revenue,
    // so it doesn't flatline across the rest of the year.
    let lastActive = -1
    monthly.forEach((m, i) => {
        if (m.total > 0) lastActive = i
    })
    let running = 0
    const chartData = monthly.map((m, i) => {
        running += m.total
        return {
            ...m,
            label: MONTH_LABELS[i],
            running: i <= lastActive ? running : null,
        }
    })

    const pieData = CATEGORIES
        .map((c) => ({ key: c, name: CATEGORY_LABEL[c], value: totals[c] }))
        .filter((d) => d.value > 0)

    const bestMonth = monthly.reduce((best, m) => (m.total > best.total ? m : best), monthly[0])

    const share = (value: number) =>
        totals.total ? `${Math.round((value / totals.total) * 100)}% of revenue` : "-"

    return (
        <div className="mt-10 flex flex-col gap-12">
            {/* ------------------------------------------------ headline numbers */}
            <div className="grid grid-cols-4 gap-6">
                <StatTile label="Total revenue" value={zar.format(totals.total)} sub={`Best month: ${MONTH_LABELS[bestMonth.month - 1]}`} />
                <StatTile label="Hotel stays" value={zar.format(totals.hotel)} sub={`${counts.hotel_stays} stays · ${share(totals.hotel)}`} />
                <StatTile label="Events" value={zar.format(totals.events)} sub={`${counts.event_bookings} bookings · ${share(totals.events)}`} />
                <StatTile label="Activities" value={zar.format(totals.activities)} sub={`${counts.activity_bookings} bookings · ${share(totals.activities)}`} />
            </div>

            {/* ------------------------------------- monthly + split side by side */}
            <div className="grid grid-cols-3 gap-6">
                <Panel title="Revenue by month" className="col-span-2">
                    <ResponsiveContainer width="100%" height={320}>
                        <BarChart data={chartData}>
                            <CartesianGrid stroke="#333" vertical={false} />
                            <XAxis dataKey="label" stroke="#aaa" />
                            <YAxis stroke="#aaa" tickFormatter={compactZar} width={60} />
                            <Tooltip
                                contentStyle={tooltipStyle}
                                cursor={{ fill: "rgba(255,255,255,0.06)" }}
                                formatter={(v) => zar.format(Number(v))}
                            />
                            <Legend />
                            {CATEGORIES.map((c) => (
                                <Bar
                                    key={c}
                                    dataKey={c}
                                    name={CATEGORY_LABEL[c]}
                                    stackId="revenue"
                                    fill={CATEGORY_COLOR[c]}
                                />
                            ))}
                        </BarChart>
                    </ResponsiveContainer>
                </Panel>

                <Panel title="Where the money comes from">
                    <ResponsiveContainer width="100%" height={320}>
                        <PieChart>
                            <Pie
                                data={pieData}
                                dataKey="value"
                                nameKey="name"
                                innerRadius={65}
                                outerRadius={110}
                                stroke="#1b1b1b"
                            >
                                {pieData.map((d) => (
                                    <Cell key={d.key} fill={CATEGORY_COLOR[d.key]} />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={tooltipStyle} formatter={(v) => zar.format(Number(v))} />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </Panel>
            </div>

            {/* ------------------------------------------------- running total */}
            <Panel title="Running total">
                <ResponsiveContainer width="100%" height={280}>
                    <LineChart data={chartData}>
                        <CartesianGrid stroke="#333" vertical={false} />
                        <XAxis dataKey="label" stroke="#aaa" />
                        <YAxis stroke="#aaa" tickFormatter={compactZar} width={60} />
                        <Tooltip contentStyle={tooltipStyle} formatter={(v) => zar.format(Number(v))} />
                        <Line
                            type="monotone"
                            dataKey="running"
                            name="Cumulative revenue"
                            stroke="var(--color-sunset, #f26b3a)"
                            strokeWidth={3}
                            dot={{ r: 4 }}
                            connectNulls={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </Panel>

            {/* ---------------------------------------------------- events */}
            <Panel title={`Event performance (${events.length})`}>
                <EventTable events={events} />
            </Panel>

            {/* ------------------------------------------------- activities */}
            <Panel title="Activity performance">
                {activities.length === 0 ? (
                    <p className="text-gray-400">No activity bookings in {data.year}.</p>
                ) : (
                    <ResponsiveContainer width="100%" height={Math.max(160, activities.length * 48)}>
                        <BarChart data={activities} layout="vertical" margin={{ left: 40 }}>
                            <CartesianGrid stroke="#333" horizontal={false} />
                            <XAxis type="number" stroke="#aaa" tickFormatter={compactZar} />
                            <YAxis type="category" dataKey="name" stroke="#aaa" width={160} />
                            <Tooltip
                                contentStyle={tooltipStyle}
                                cursor={{ fill: "rgba(255,255,255,0.06)" }}
                                formatter={(v) => zar.format(Number(v))}
                            />
                            <Bar dataKey="revenue" name="Revenue" fill={CATEGORY_COLOR.activities} />
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </Panel>
        </div>
    )
}


function EventTable({ events }: { events: EventFinance[] }) {
    if (events.length === 0) return <p className="text-gray-400">No events this year.</p>

    const sorted = [...events].sort((a, b) => b.revenue - a.revenue)

    return (
        <table className="w-full text-left">
            <thead>
                <tr className="text-gray-400 border-b border-white/30">
                    <th className="py-2 font-normal">Event</th>
                    <th className="py-2 font-normal">Date</th>
                    <th className="py-2 font-normal w-72">Tickets sold</th>
                    <th className="py-2 font-normal text-right">Revenue</th>
                    <th className="py-2 font-normal text-right">Of potential</th>
                </tr>
            </thead>
            <tbody>
                {sorted.map((ev) => {
                    const pct = Math.round(ev.sell_through * 100)
                    const ofPotential = ev.potential_revenue
                        ? Math.round((ev.revenue / ev.potential_revenue) * 100)
                        : 0
                    return (
                        <tr key={ev.id} className="border-b border-white/10">
                            <td className="py-3 font-bold">{ev.name}</td>
                            <td className="py-3">{ev.start_date}</td>
                            <td className="py-3">
                                <div className="flex items-center gap-3">
                                    <div className="h-2 w-40 rounded bg-white/15">
                                        <div
                                            className="h-2 rounded"
                                            style={{
                                                width: `${Math.min(pct, 100)}%`,
                                                backgroundColor: CATEGORY_COLOR.events,
                                            }}
                                        />
                                    </div>
                                    <span className="text-sm">
                                        {ev.tickets_sold}/{ev.no_of_tickets} ({pct}%)
                                    </span>
                                </div>
                            </td>
                            <td className="py-3 text-right">{zar.format(ev.revenue)}</td>
                            <td className="py-3 text-right">{ofPotential}%</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}