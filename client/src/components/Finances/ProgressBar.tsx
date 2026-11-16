import { TEAL } from "./ChartTheme"

type ProgressBarProps = {
    value: number // 0-1
    label?: string
    color?: string
    widthClass?: string
}

export function ProgressBar({ value, label, color = TEAL, widthClass = "w-40" }: ProgressBarProps) {
    const pct = Math.min(Math.max(value, 0), 1) * 100

    return (
        <div className="flex items-center gap-3">
            <div
                className={`h-2 ${widthClass} rounded bg-white/15`}
                role="progressbar"
                aria-valuenow={Math.round(pct)}
                aria-valuemin={0}
                aria-valuemax={100}
            >
                <div className="h-2 rounded" style={{ width: `${pct}%`, backgroundColor: color }} />
            </div>
            {label && <span className="text-sm">{label}</span>}
        </div>
    )
}