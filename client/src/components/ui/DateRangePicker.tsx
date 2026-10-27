import { useState } from "react"
import { DayPicker, type DateRange } from "react-day-picker"
import "react-day-picker/style.css"
import { addDays, formatShort, MAX_ADVANCE_DAYS, today } from "../dates/dates"

type Props = {
  value: DateRange | undefined
  onChange: (range: DateRange | undefined) => void
}

export function DateRangePicker({ value, onChange }: Props) {
  const [open, setOpen] = useState(false)
  const start = today()

  const label = value?.from
    ? `${formatShort(value.from)} → ${value.to ? formatShort(value.to) : "…"}`
    : "Select dates"

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="border-b w-full text-left py-1 cursor-pointer"
      >
        {label}
      </button>

      {open && (
        <div className="absolute z-20 mt-2 bg-white text-black rounded shadow-lg p-3">
          <DayPicker
            mode="range"
            numberOfMonths={2}
            selected={value}
            onSelect={(range) => {
              onChange(range)
              if (range?.from && range.to && range.from.getTime() !== range.to.getTime()) {
                setOpen(false)
              }
            }}
            disabled={[{ before: start }, { after: addDays(start, MAX_ADVANCE_DAYS) }]}
          />
        </div>
      )}
    </div>
  )
}