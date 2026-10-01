type AdminCardItem = {
    name: string,
    img: string
}

type AdminCardType = {
    editOption: boolean
    infoButton: boolean
    cardArray: AdminCardItem[]
}

export function AdminCard({
    editOption,
    infoButton,
    cardArray,
}: AdminCardType){

    const cardButtons = (
        option:string,
        extraClass: string
    ) => {
        return(
            <button
                className={`${extraClass} rounded cursor-pointer text-white h-10`}
            >
                {option}
            </button>
        )
    }

    return(
        <div
            className="px-6 py-4 grid grid-cols-3 justify-center mt-4 gap-10 w-full"
        >
            {cardArray.map((card, index) => {
                const {name, img} = card
                return(
                    <div
                        key={index}
                        className="border-b w-100 pb-4"
                    >
                        <img 
                            src={img}
                            alt={`${name}-img`}
                            className="w-full rounded"
                        />

                        <h1 className="text-center mt-2 text-2xl font-semibold">
                            {name}
                        </h1>

                        <div
                            className="grid grid-cols-2 gap-14 mt-6"
                        >
                            {cardButtons("Delete", "bg-red-600 text-white")}

                            {
                                editOption &&
                                    cardButtons("Edit", "bg-blue-600")
                            }

                            {
                                infoButton && 
                                    cardButtons("Info", "bg-purple-600")
                            }
                        </div>
                    </div>
                )
            })}
        </div>
    )
}