export const MAX_ADVANCE_DAYS = 365
export const MAX_NIGHTS = 14

export const today = () => {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  return d
}

export const addDays = (d: Date, n: number) => {
  const x = new Date(d)
  x.setDate(x.getDate() + n)
  return x
}

export const toISODate = (d: Date) => {
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${d.getFullYear()}-${m}-${day}`
}

export const nightsBetween = (a: Date, b: Date) =>
  Math.round((b.getTime() - a.getTime()) / 86_400_000)

export const formatZAR = (n: number) =>
  new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR" }).format(n)

// Parse "YYYY-MM-DD" as a LOCAL date. new Date("2026-10-29") is parsed as UTC
// midnight, which shows the previous day in timezones behind UTC.
export const parseISODate = (s: string): Date => {
  const [y, m, d] = s.slice(0, 10).split("-").map(Number)
  return new Date(y, m - 1, d)
}

export const formatShort = (d: Date | string) =>
  (typeof d === "string" ? parseISODate(d) : d)
    .toLocaleDateString("en-ZA", { day: "numeric", month: "short" })

  export const formatLong = (d: Date | string) =>
    (typeof d === "string" ? parseISODate(d) : d)
      .toLocaleDateString("en-ZA", { day: "numeric", month: "long", year: "numeric" })

export const formatTime = (t: string): string => {
  const timePart = t.includes("T") ? t.split("T")[1] : t   // tolerate full datetimes
  const [hours, minutes] = timePart.split(":").map(Number)

  const period = hours < 12 ? "am" : "pm"
  const formattedHours = hours % 12 || 12

  return minutes === 0
    ? `${formattedHours}${period}`
    : `${formattedHours}:${String(minutes).padStart(2, "0")}${period}`
}
