import type { AvailabilityResponse, RoomChoice } from "../../features/Availability/types"
import { formatZAR } from "../../components/dates/dates"

type Props = {
  data: AvailabilityResponse
  partySize: number
  quantities: Record<number, number>
  setQuantity: (roomId: number, quantity: number) => void
  onContinue: (choices: RoomChoice[], total: number) => void
}

export function RoomPicker({ data, partySize, quantities, setQuantity, onContinue }: Props) {
  const qty = (roomId: number) => quantities[roomId] ?? 0

  const totalRooms = data.rooms.reduce((sum, r) => sum + qty(r.room.id), 0)
  const capacity = data.rooms.reduce((sum, r) => sum + qty(r.room.id) * r.room.max_people, 0)
  const total = data.rooms.reduce((sum, r) => sum + qty(r.room.id) * r.stay_price, 0)

  const enoughSpace = capacity >= partySize

  const handleContinue = () => {
    const choices: RoomChoice[] = data.rooms
      .filter(r => qty(r.room.id) > 0)
      .map(r => ({ room: r.room, quantity: qty(r.room.id), stay_price: r.stay_price }))
    onContinue(choices, total)
  }

  return (
    <div>
      <div className="flex flex-col gap-4">
        {data.rooms.map(({ room, available, price_per_night, stay_price }) => {
          const q = qty(room.id)
          // can't pick more than are available, or more rooms than guests
          const canAdd = q < available && totalRooms < partySize

          return (
            <div key={room.id} className="bg-white/10 rounded p-4 grid grid-cols-[auto_1fr_auto] gap-6 items-center">
              <div className="card-img-bg">
                <img className="card-img" alt={`${room.name}-img`} src={room.img} />
              </div>

              <div>
                <h2 className="uppercase font-bold text-2xl">{room.name}</h2>
                <p>Sleeps {room.max_people}</p>
                <p className="text-sm opacity-80">
                  {available} room{available > 1 && "s"} left for your dates
                </p>
                <p className="mt-2">{formatZAR(price_per_night)} per night</p>
                <p className="font-bold">
                  {formatZAR(stay_price)} for {data.nights} night{data.nights > 1 && "s"}
                </p>
              </div>

              <div className="text-center">
                <p className="uppercase text-sm font-bold mb-2">Rooms</p>
                <div className="bg-white text-black grid grid-cols-[2rem_3rem_2rem] text-center rounded items-center">
                  <button
                    type="button"
                    aria-label={`Remove one ${room.name}`}
                    disabled={q === 0}
                    onClick={() => setQuantity(room.id, q - 1)}
                    className="cursor-pointer disabled:opacity-30"
                  >
                    -
                  </button>
                  <span>{q}</span>
                  <button
                    type="button"
                    aria-label={`Add one ${room.name}`}
                    disabled={!canAdd}
                    onClick={() => setQuantity(room.id, q + 1)}
                    className="cursor-pointer disabled:opacity-30"
                  >
                    +
                  </button>
                </div>
                {q > 0 && <p className="mt-2 font-bold">{formatZAR(q * stay_price)}</p>}
              </div>
            </div>
          )
        })}
      </div>

      {/* Summary */}
      <div className="mt-6 bg-white/10 rounded p-4 flex items-center justify-between">
        <div>
          <p className="font-bold">
            {totalRooms} room{totalRooms !== 1 && "s"} · sleeps {capacity} · {partySize} guest{partySize > 1 && "s"}
          </p>
          {totalRooms > 0 && !enoughSpace && (
            <p className="text-red-400 text-sm">
              Your rooms sleep {capacity}, but you have {partySize} guests. Add another room.
            </p>
          )}
          {totalRooms === 0 && <p className="text-sm opacity-80">Choose your rooms above.</p>}
          {totalRooms >= partySize && (
            <p className="text-sm opacity-80">Every guest has a room. That's the maximum for your party size.</p>
          )}
        </div>

        <div className="text-right">
          <p className="text-3xl font-bold">{formatZAR(total)}</p>
          <button
            type="button"
            disabled={!enoughSpace}
            onClick={handleContinue}
            className="mt-2 bg-green-800 px-8 py-2 rounded uppercase cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}