type AdminPgHeaderType = {
    header: string,
    addButtonHeader: string,
    setAddInstance: () => void
}

export function AdminPgHeader({
    header,
    addButtonHeader,
    setAddInstance
}: AdminPgHeaderType){
    return(
        <div
            className="bg-black text-white py-4 flex flex-col items-center"
        >
            <h1
                className="uppercase text-6xl font-bold tracking-[2px]"
            >
                All {header}
            </h1>

            <button
                className="mt-4 bg-green-600/80 px-4 py-2 rounded text-xl h-12 w-40 cursor-pointer hover:-translate-y-2 duration-300"
                onClick={setAddInstance}
            >
                Add {addButtonHeader}
            </button>
        </div>
    )
}