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

export const formatShort = (d: Date) =>
  d.toLocaleDateString("en-ZA", { day: "numeric", month: "short" })

export const formatZAR = (n: number) =>
  new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR" }).format(n)