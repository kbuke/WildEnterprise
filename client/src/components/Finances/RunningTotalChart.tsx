import {
    CartesianGrid,
    Line,
    LineChart,
    ReferenceLine,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts"
import { compactZar, zar } from "./Format"
import { SUNSET, tooltipStyle } from "./ChartTheme"

type RunningTotalChartProps = {
    data: Record<string, unknown>[]
    xKey: string
    yKey: string
    name: string
    height?: number
    // Optional goal line, e.g. revenue if the event sold out
    target?: { value: number; label: string }
}

// Rows where yKey is null are not drawn, so the line stops at "today".
export function RunningTotalChart({
    data,
    xKey,
    yKey,
    name,
    height = 300,
    target,
}: RunningTotalChartProps) {
    return (
        <ResponsiveContainer width="100%" height={height}>
            <LineChart data={data}>
                <CartesianGrid stroke="#333" vertical={false} />
                <XAxis dataKey={xKey} stroke="#aaa" minTickGap={24} />
                <YAxis stroke="#aaa" tickFormatter={compactZar} width={60} />
                <Tooltip contentStyle={tooltipStyle} formatter={(v) => zar.format(Number(v))} />
                {target && target.value > 0 && (
                    <ReferenceLine
                        y={target.value}
                        stroke="#888"
                        strokeDasharray="6 4"
                        ifOverflow="extendDomain"
                        label={{ value: target.label, fill: "#aaa", position: "insideTopLeft" }}
                    />
                )}
                <Line
                    type="monotone"
                    dataKey={yKey}
                    name={name}
                    stroke={SUNSET}
                    strokeWidth={3}
                    dot={false}
                    connectNulls={false}
                />
            </LineChart>
        </ResponsiveContainer>
    )
}