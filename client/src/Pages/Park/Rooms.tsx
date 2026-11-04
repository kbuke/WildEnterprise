import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import type { DateRange } from "react-day-picker"
import type { AllRooms } from "../../features/Rooms/types"
import type { AvailabilityQuery, RoomChoice } from "../../features/Availability/types"
import { fetchAvailability } from "../../features/Availability/api"
import { RoomBooking } from "./RoomBooking"
import { RoomPicker } from "./RoomPicker"
import { BookingForm } from "./BookingForm"
import { PopUp } from "../../components/ui/Popup"
import { formatShort, MAX_NIGHTS, nightsBetween, toISODate } from "../../components/dates/dates"
import { AccomodationReviews } from "./AccomodationReviews"

type RoomProps = { rooms: AllRooms[]; parkId: number }
type Chosen = { choices: RoomChoice[]; total: number }

export function Rooms({ rooms, parkId }: RoomProps) {
  const [partySize, setPartySize] = useState(1)
  const [range, setRange] = useState<DateRange | undefined>()
  const [formError, setFormError] = useState<string>()
  const [search, setSearch] = useState<AvailabilityQuery | null>(null)
  const [quantities, setQuantities] = useState<Record<number, number>>({})
  const [chosen, setChosen] = useState<Chosen | null>(null)

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
    setQuantities({})          // a new search starts with a clean selection
    setSearch({
      parkId,
      arrival: toISODate(range.from),
      departure: toISODate(range.to),
      partySize,
    })
  }

  // Changing party size also clears the selection, so the "rooms <= guests" rule can't be broken
  const changePartySize = (size: number) => {
    setPartySize(size)
    setQuantities({})
  }

  return (
    <div className="bg-coal w-full py-10 px-20 mb-10 text-white">
      <RoomBooking
        range={range}
        setRange={setRange}
        partySize={partySize}
        setIncreaseSize={() => partySize < maxNoPeopleAtSite && changePartySize(partySize + 1)}
        setDecreaseSize={() => partySize > 1 && changePartySize(partySize - 1)}
        onSearch={handleSearch}
        error={formError}
        isSearching={isFetching}
      />

      {/* Before searching: show every room type */}
      {!search && (
        <div className="flex gap-10 items-center">
          {rooms.map(room => (
            <div key={room.id} className="flex flex-col text-center">
              <div className="card-img-bg">
                <img className="card-img" alt={`${room.name}-img`} src={room.img} />
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
            {formatShort(search.arrival)} → {formatShort(search.departure)}
            {" · "}{search.partySize} guest{search.partySize > 1 && "s"}
          </p>

          {isFetching && <p>Checking availability...</p>}
          {error && <p className="text-red-400">{error.message}</p>}

          {data && !data.can_accommodate && (
            <p>
              Sorry, we only have space for {data.max_capacity} guest{data.max_capacity !== 1 && "s"} on
              those dates, and you have {search.partySize}. Try different dates or a smaller group.
            </p>
          )}

          {data?.can_accommodate && !isFetching && (
            <RoomPicker
              data={data}
              partySize={search.partySize}
              quantities={quantities}
              setQuantity={(roomId, qty) => setQuantities(q => ({ ...q, [roomId]: qty }))}
              onContinue={(choices, total) => setChosen({ choices, total })}
            />
          )}
        </div>
      )}

      {chosen && search && (
        <PopUp
          child={
            <BookingForm
              choices={chosen.choices}
              total={chosen.total}
              query={search}
              onClose={() => setChosen(null)}
            />
          }
        />
      )}

      <AccomodationReviews parkId={parkId} />
    </div>
  )
}
