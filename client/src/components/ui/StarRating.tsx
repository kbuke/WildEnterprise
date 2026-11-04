import { useState } from "react"

type Props = {
  value: number
  onChange?: (value: number) => void
  className?: string
}

export function StarRating({ value, onChange, className = "text-3xl" }: Props) {
  const [hover, setHover] = useState(0)
  const shown = hover || value

  if (!onChange) {
    return (
      <div role="img" aria-label={`${value} out of 5 stars`} className={`flex ${className}`}>
        {[1, 2, 3, 4, 5].map(n => (
          <span key={n} className={n <= value ? "text-yellow-400" : "text-gray-400"}>★</span>
        ))}
      </div>
    )
  }

  return (
    <div role="radiogroup" aria-label="Rating" className={`flex ${className}`} onMouseLeave={() => setHover(0)}>
      {[1, 2, 3, 4, 5].map(n => (
        <button
          key={n}
          type="button"
          role="radio"
          aria-checked={value === n}
          aria-label={`${n} star${n > 1 ? "s" : ""}`}
          onClick={() => onChange(n)}
          onMouseEnter={() => setHover(n)}
          className={`cursor-pointer ${n <= shown ? "text-yellow-400" : "text-gray-300"}`}
        >
          ★
        </button>
      ))}
    </div>
  )
}