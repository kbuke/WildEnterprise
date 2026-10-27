import type { AllRooms } from "../Rooms/types"

export type AvailabilityQuery = {
  parkId: number
  arrival: string      // YYYY-MM-DD
  departure: string
  partySize: number
}
export type RoomSelection = { room: AllRooms; quantity: number }
export type RoomOption = {
  selections: RoomSelection[]
  total_rooms: number
  total_capacity: number
  total_price: number
}
export type AvailabilityResponse = { options: RoomOption[] }