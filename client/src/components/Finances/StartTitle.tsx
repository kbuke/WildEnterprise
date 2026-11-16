type StatTitleProps = {
    label: string,
    value: string,
    sub: string
}


export function StatTile({ label, value, sub }: StatTitleProps) {
    return (
        <div className="rounded border border-white/30 p-6">
            <h3 className="text-lg font-bold text-gray-300">{label}</h3>
            <p className="text-4xl font-bold mt-2">{value}</p>
            <p className="text-sm text-gray-400 mt-2">{sub}</p>
        </div>
    )
}