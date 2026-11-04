type Item = { id: number; name: string }

type Props = {
    items: Item[] | undefined
    selected: number[]
    onToggle: (id: number) => void
    emptyText?: string
}

export function ToggleList({ items, selected, onToggle, emptyText = "Nothing to choose from yet." }: Props) {
    if (!items?.length) return <p className="mb-8 text-sm opacity-70">{emptyText}</p>

    return (
        <div className="flex flex-wrap gap-2 mb-8">
            {items.map((item) => {
                const on = selected.includes(item.id)
                return (
                    <button
                        key={item.id}
                        type="button"
                        aria-pressed={on}
                        onClick={() => onToggle(item.id)}
                        className={`px-4 py-1 rounded border cursor-pointer ${
                            on ? "bg-green-800 text-white border-green-800" : "bg-white hover:bg-gray-100"
                        }`}
                    >
                        {on && "✓ "}{item.name}
                    </button>
                )
            })}
        </div>
    )
}