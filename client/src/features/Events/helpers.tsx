import type { PostEvent, SpecificEvent } from "./types"

// API (snake_case) -> form (camelCase)
export const eventToFormValues = (e: SpecificEvent): Partial<PostEvent> => ({
  name: e.name,
  img: e.img,
  info: e.info,
  startDate: e.start_date,
  multiDayEvent: e.multi_day_event,
  endDate: e.end_date ?? undefined,
  startTime: e.start_time.slice(0, 5), // "18:00:00" -> "18:00"
  endTime: e.end_time.slice(0, 5),
  noOfTickets: e.no_of_tickets,
  ticketPrice: e.ticket_price,
  parkId: e.park_id,
  cardInfo: e.card_info,
  pI1: e.primary_img_1,
  pI2: e.primary_img_2,
  pI3: e.primary_img_3 ?? undefined,
  pI4: e.primary_img_4 ?? undefined,
  pI5: e.primary_img_5 ?? undefined,
})

// the cleanup you currently do inline in onSubmit
export const cleanEventPayload = (data: PostEvent): PostEvent => ({
  ...data,
  endDate: data.multiDayEvent && data.endDate ? data.endDate : undefined,
  pI3: data.pI3 || undefined,
  pI4: data.pI4 || undefined,
  pI5: data.pI5 || undefined,
})

// generic: keep only the fields the user actually changed
export function pickDirty<T extends object>(
  data: T,
  dirty: Partial<Record<keyof T, unknown>>
): Partial<T> {
  return Object.fromEntries(
    Object.entries(data).filter(([key]) => dirty[key as keyof T])
  ) as Partial<T>
}