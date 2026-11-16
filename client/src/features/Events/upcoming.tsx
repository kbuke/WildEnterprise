// import { addMonths, parseISODate, today } from "../../components/dates/Dates" // adjust path

import { addMonths, parseISODate, today } from "../../components/dates/dates";

export const UPCOMING_MONTHS = 6

export function upcomingEvents<T extends { start_date: string; end_date?: string | null }>(
  events: T[]
): T[] {
  const from = today()
  const until = addMonths(from, UPCOMING_MONTHS)

  return events
    .filter((e) =>
      // hasn't finished yet...
      parseISODate(e.end_date ?? e.start_date) >= from &&
      // ...and starts within the window
      parseISODate(e.start_date) <= until
    )
    .sort((a, b) => parseISODate(a.start_date).getTime() - parseISODate(b.start_date).getTime())
}