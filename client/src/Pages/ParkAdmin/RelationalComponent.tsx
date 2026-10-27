type RelationalProps = {
    name: string,
    img: string,
    id: number
}

type RelationalComponentProps = {
    relation: string
    relationalArray: RelationalProps[] | []
    text?: string
    canAdd: boolean
    addInstance?: () => void
    canEdit: boolean
    canDelete: boolean
}

export function RelationalComponent({
    relation,
    relationalArray,
    text,
    canAdd,
    addInstance,
    canEdit,
    canDelete
}: RelationalComponentProps){
    return(
        <div
            className="bg-coal text-sunset py-4 px-10 flex flex-col border-b"
        >
            <h1
                className="font-bold uppercase text-2xl"
            >
                {relation}
            </h1>

            <p
                className="mt-2"
            >
                {text}
            </p>

            <div
                className="grid grid-cols-2 mt-4"
            >
                {relationalArray.map((relation, index) => {
                    const {name, img, id} = relation

                    return(
                        <div
                            className="grid grid-cols-[1fr_3fr] gap-10 mt-4"
                            key={index}
                        >
                            <div
                                className="h-70 w-60 rounded bg-sunset flex items-center justify-center"
                            >
                                <img 
                                    src={img}
                                    alt={`${name}-img`}
                                    className="h-69 w-59"
                                />
                            </div>

                            <div>
                                <h2
                                    className="uppercase font-bold"
                                >
                                    {name}
                                </h2>

                                <div
                                    className="flex gap-4 mt-4"
                                >
                                    {canEdit &&
                                        <button
                                            className="bg-purple-600 text-white px-10 py-2 rounded cursor-pointer"
                                        >
                                            Edit {name}
                                        </button>
                                    }

                                    {canDelete &&
                                        <button
                                            className="bg-red-600 text-white px-10 py-2 rounded cursor-pointer"
                                        >
                                            Delete {name}
                                        </button>
                                    }
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            {canAdd &&
                <button
                    className="bg-green-800 text-white mt-10 cursor-pointer px-10 py-2 rounded uppercase self-center w-60"
                    onClick={addInstance}
                >
                    Add {relation}
                </button>
            }
        </div>
    )
}