type AdminCardItem = {
    name: string,
    img: string,
    id: number
}

type AdminCardType = {
    cardArray: AdminCardItem[]
    onDelete: (id: number, name: string) => void
    onEdit?: (id: number, name: string) => void
    onInfo?: (id: number, name: string) => void
}

export function AdminCard({
    cardArray,
    onDelete,
    onEdit,
    onInfo
}: AdminCardType){

    const cardButtons = (
        option:string,
        extraClass: string,
        onClick: () => void
    ) => {
        return(
            <button
                className={`${extraClass} rounded cursor-pointer text-white h-10`}
                onClick={onClick}
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
                const {name, img, id} = card
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
                            {cardButtons("Delete", "bg-red-600 text-white", () => onDelete(id, name))}

                            {
                                onEdit &&
                                    cardButtons("Edit", "bg-blue-600", () => onEdit(id, name))
                            }

                            {
                                onInfo && 
                                    cardButtons("Info", "bg-purple-600", () => onInfo(id, name))
                            }
                        </div>
                    </div>
                )
            })}
        </div>
    )
}