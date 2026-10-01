type SpecificParkInfo = {
    img: string
    info: string
    location: string
}

export function SpecificParkInfo({
    img,
    info,
    location
}: SpecificParkInfo){
    console.log(img)

    const infoLayout = (label: string, context: string) => {
        return(
            <div
                className="grid grid-cols-[1fr_4fr] gap-4 ml-4 text-xl mb-4 border-b"
            >
                <label
                    className="font-bold"
                >
                    {label}
                </label>

                <p>
                    {context}
                </p>
            </div>
        )
    }
    return(
        <div
            className="px-10 py-4 grid grid-cols-[1fr_2fr]"
        >
            <div
                className="border border-green-600 p-4 h-80 w-120 rounded"
            >
                <img 
                    src={img}
                />
            </div>

            <div>
                {infoLayout("Location:", location)}
                {infoLayout("Info:", info)}
            </div>
        </div>
    )
}