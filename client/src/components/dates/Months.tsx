// constants/months.ts
export const MONTHS = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
] as const

export type MonthName = typeof MONTHS[number]

// 1 -> "Jan", 12 -> "Dec"
export const monthName = (n: number): MonthName | undefined => MONTHS[n - 1]