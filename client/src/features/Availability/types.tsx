import type { AllRooms } from "../Rooms/types"

export type AvailabilityQuery = {
  parkId: number
  arrival: string      // YYYY-MM-DD
  departure: string
  partySize: number
}

export type RoomAvailability = {
  room: AllRooms
  available: number
  price_per_night: number
  stay_price: number          // one room, whole stay
}

export type AvailabilityResponse = {
  nights: number
  max_capacity: number
  can_accommodate: boolean
  rooms: RoomAvailability[]
}

// What the user ended up choosing
export type RoomChoice = {
  room: AllRooms
  quantity: number
  stay_price: number
}