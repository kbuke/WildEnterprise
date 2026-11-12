type AdminInfoCardProps = {
    mainInfo: string | number
    topSubHeader: string,
    bottomSubHeader?: string
}

export function AdminInfoCard({
    mainInfo, topSubHeader, bottomSubHeader
}: AdminInfoCardProps){
    return(
        <div
            className="rounded bg-coal text-white h-100 w-120 flex flex-col items-center justify-center text-center px-4"
        >
            <h2
                className="font-bold text-3xl"
            >
                {topSubHeader}
            </h2>

            <h1
                className="font-bold text-5xl mt-4"
            >
                {mainInfo}
            </h1>

            <h2
                className="font-bold text-xl mt-4"
            >
                {bottomSubHeader}
            </h2>
        </div>
    )
}