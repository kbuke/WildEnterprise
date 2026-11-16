export const zar = new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    maximumFractionDigits: 0,
})

export const compactZar = (n: number) =>
    n >= 1000 ? `R${Math.round(n / 1000)}k` : `R${n}`

// "2026-03-02" -> "2 Mar". The T00:00:00 stops the date shifting a day with timezones.
export const shortDate = (iso: string) =>
    new Date(`${iso}T00:00:00`).toLocaleDateString("en-ZA", { day: "numeric", month: "short" })

export const longDate = (iso: string) =>
    new Date(`${iso}T00:00:00`).toLocaleDateString("en-ZA", {
        day: "numeric",
        month: "short",
        year: "numeric",
    })