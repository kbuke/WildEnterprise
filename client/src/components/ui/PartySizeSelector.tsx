type PartySizeProps = {
    setDecreasePartySize: () => void
    setIncreasePartySize: () => void
    partySize: number
    titleHeader?: string
}

export function PartySizeSelector({
    setDecreasePartySize,
    setIncreasePartySize,
    partySize,
    titleHeader
}: PartySizeProps){
    return(
        <div className="flex flex-col gap-2">
            <label className={`font-bold uppercase ${titleHeader ? `${titleHeader}` : "text-lg"}`}>
                Party Size
            </label>
            <div className="bg-white text-black grid grid-cols-[1fr_4fr_1fr] text-center rounded items-center">
                <button type="button" className="cursor-pointer" onClick={setDecreasePartySize}>-</button>
                <span>{partySize}</span>
                <button type="button" className="cursor-pointer" onClick={setIncreasePartySize}>+</button>
            </div>
        </div>
    )
}