import type { DateRange } from "react-day-picker"
import { DateRangePicker } from "../../components/ui/DateRangePicker"

type RoomBookingProps = {
  range: DateRange | undefined
  setRange: (r: DateRange | undefined) => void
  partySize: number
  setIncreaseSize: () => void
  setDecreaseSize: () => void
  onSearch: () => void
  error?: string
  isSearching?: boolean
}

export function RoomBooking({
  range, setRange, partySize, setIncreaseSize, setDecreaseSize, onSearch, error, isSearching
}: RoomBookingProps) {
  return (
    <div className="mb-10">
      <div className="flex gap-4">
        <div className="flex flex-col gap-2 w-[66%]">
          <label className="font-bold uppercase text-lg">Arrival → Departure</label>
          <DateRangePicker value={range} onChange={setRange} />
        </div>

        <div className="flex flex-col gap-2 w-[33%]">
          <label className="font-bold uppercase text-lg">Party Size</label>
          <div className="bg-white text-black grid grid-cols-[1fr_4fr_1fr] text-center rounded">
            <button type="button" className="cursor-pointer" onClick={setDecreaseSize}>-</button>
            <span>{partySize}</span>
            <button type="button" className="cursor-pointer" onClick={setIncreaseSize}>+</button>
          </div>
        </div>
      </div>

      {error && <p className="text-red-400 mt-2">{error}</p>}

      <button
        type="button"
        onClick={onSearch}
        disabled={isSearching}
        className="mt-2 cursor-pointer bg-green-800 px-10 py-2 rounded disabled:opacity-60"
      >
        {isSearching ? "Searching..." : "Check Availability"}
      </button>
    </div>
  )
}