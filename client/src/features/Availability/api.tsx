// api.ts
import { fetchAllInstances } from "../../api/client"
import type { AvailabilityQuery, AvailabilityResponse } from "./types"

export const fetchAvailability = (q: AvailabilityQuery) => {
  const params = new URLSearchParams({
    parkId: String(q.parkId),
    arrivalDate: q.arrival,
    departureDate: q.departure,
    partySize: String(q.partySize),
  })
  return fetchAllInstances<AvailabilityResponse>(`/api/hotels/availability?${params}`)
}