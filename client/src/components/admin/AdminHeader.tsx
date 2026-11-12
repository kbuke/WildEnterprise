type AdminHeaderProps = {
    img: string,
    name: string,
    info: string,
    setPatch: () => void,
    setDelete: () => void
}

export function AdminHeader({
    img, name, info, setPatch, setDelete
}: AdminHeaderProps){

    return(
        <div
            className="flex flex-col w-full bg-coal py-4 text-white"
        >
            <div
                className="bg-sunset h-60 w-60 rounded-full flex items-center justify-center self-center"
            >
                <img 
                    className="h-59 w-59 rounded-full"
                    src={img}
                    alt={`${name}-img`}
                />
            </div>

            <h1
                className="text-center font-bold text-5xl uppercase mt-4"
            >
                {name}
            </h1>

            <div
                className="mt-10 w-full grid grid-cols-[4fr_1fr]"
            >
                <div className="px-10 py-10">
                    <h2>
                        {info}
                    </h2>
                </div>

                <div
                    className="py-10 flex flex-col px-10 gap-4"
                > 
                    <button
                        className="bg-blue-600"
                        onClick={setPatch}
                    >
                        Edit {name}
                    </button>

                    <button
                        className="bg-red-600"
                        onClick={setDelete}
                    >
                        Delete {name}
                    </button>
                </div>
            </div>
        </div>
    )
}