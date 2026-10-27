import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import type { DateRange } from "react-day-picker"
import type { AllRooms } from "../../features/Rooms/types"
import type { AvailabilityQuery, RoomOption } from "../../features/Availability/types"
import { fetchAvailability } from "../../features/Availability/api"
import { RoomBooking } from "./RoomBooking"
import { BookingForm } from "./BookingForm"
import { PopUp } from "../../components/ui/Popup"
import { formatShort, formatZAR, MAX_NIGHTS, nightsBetween, toISODate } from "../../components/dates/dates"
// import { formatShort, formatZAR, MAX_NIGHTS, nightsBetween, toISODate } from "../../utils/dates"

type RoomProps = { rooms: AllRooms[]; parkId: number }

export function Rooms({ rooms, parkId }: RoomProps) {
  const [partySize, setPartySize] = useState(1)
  const [range, setRange] = useState<DateRange | undefined>()
  const [formError, setFormError] = useState<string>()
  const [search, setSearch] = useState<AvailabilityQuery | null>(null)
  const [chosen, setChosen] = useState<RoomOption | null>(null)

  const maxNoPeopleAtSite = rooms.reduce((acc, r) => acc + r.max_people * r.no_of_rooms, 0)

  const { data, isFetching, error } = useQuery({
    queryKey: ["availability", search],
    queryFn: () => fetchAvailability(search!),
    enabled: search !== null,
    staleTime: 0,
  })

  const handleSearch = () => {
    if (!range?.from || !range.to) return setFormError("Please select arrival and departure dates")
    const nights = nightsBetween(range.from, range.to)
    if (nights < 1) return setFormError("Stay must be at least one night")
    if (nights > MAX_NIGHTS) return setFormError(`Maximum stay is ${MAX_NIGHTS} nights`)

    setFormError(undefined)
    setSearch({
      parkId,
      arrival: toISODate(range.from),
      departure: toISODate(range.to),
      partySize,
    })
  }

  return (
    <div className="bg-coal w-full py-10 px-20 mb-10 text-white">
      <RoomBooking
        range={range}
        setRange={setRange}
        partySize={partySize}
        setIncreaseSize={() => partySize < maxNoPeopleAtSite && setPartySize(partySize + 1)}
        setDecreaseSize={() => partySize > 1 && setPartySize(partySize - 1)}
        onSearch={handleSearch}
        error={formError}
        isSearching={isFetching}
      />

      {/* Before searching: show every room type */}
      {!search && (
        <div className="flex gap-10 items-center">
          {rooms.map(room => (
            <div key={room.id} className="flex flex-col text-center">
              <div className="rounded bg-sunset h-70 w-60 flex items-center justify-center">
                <img className="rounded h-69 w-59" alt={`${room.name}-img`} src={room.img} />
              </div>
              <h2 className="uppercase font-bold">{room.name}</h2>
            </div>
          ))}
        </div>
      )}

      {/* After searching */}
      {search && (
        <div>
          <p className="mb-4 text-lg">
            {formatShort(new Date(search.arrival))} → {formatShort(new Date(search.departure))}
            {" · "}{search.partySize} guest{search.partySize > 1 && "s"}
          </p>

          {isFetching && <p>Checking availability...</p>}
          {error && <p className="text-red-400">{error.message}</p>}

          {data && data.options.length === 0 && (
            <p>
              Sorry, we have nothing available for {search.partySize} guest
              {search.partySize > 1 && "s"} on those dates. Try different dates or a smaller group.
            </p>
          )}

          <div className="flex flex-col gap-4">
            {data?.options.map((option, i) => (
              <div key={i} className="bg-white/10 rounded p-4 flex items-center justify-between">
                <div>
                  {option.selections.map(({ room, quantity }) => (
                    <p key={room.id} className="font-bold">
                      {quantity} × {room.name}
                      <span className="font-normal"> (sleeps {room.max_people})</span>
                    </p>
                  ))}
                  <p className="text-sm opacity-80">
                    Sleeps up to {option.total_capacity} · {option.total_rooms} room
                    {option.total_rooms > 1 && "s"}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-2xl font-bold">{formatZAR(option.total_price)}</p>
                  <button
                    className="bg-green-800 px-8 py-2 rounded uppercase cursor-pointer"
                    onClick={() => setChosen(option)}
                  >
                    Select
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {chosen && search && (
        <PopUp
          child={<BookingForm option={chosen} query={search} onClose={() => setChosen(null)} />}
        />
      )}
    </div>
  )
}