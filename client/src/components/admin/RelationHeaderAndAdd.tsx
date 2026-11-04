type RelationHeaderProps = {
    title: string
    addRelation: () => void
}

export function RelationHeaderAndAdd({
    title,
    addRelation
}: RelationHeaderProps){
    return(
        <div
            className="flex gap-4 items-center"
        >
            <h1
                className="text-sunset uppercase text-xl"
            >
                {title}
            </h1>

            <button
                className="bg-green-800 px-10 py-2 cursor-pointer rounded"
                onClick={addRelation}
            >
                Add {title}
            </button>
        </div>
    )
}