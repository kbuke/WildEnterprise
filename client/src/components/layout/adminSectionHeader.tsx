type AdminSection = {
    header: string
    setAddInstance: () => void
}

export function AdminSectionHeader({
    header,
    setAddInstance
}: AdminSection){
    return(
        <div
            className="flex flex-col text-center border-b py-8 w-[98%] justify-self-center"
        >
            <h1
                className="uppercase text-4xl font-bold"
            >
                All WildEnterprise {header}
            </h1>

            <button
                className="bg-green-800 text-white w-40 h-12 rounded-lg cursor-pointer self-center mt-4"
                onClick={setAddInstance}
            >
                Add {header}
            </button>
        </div>
    )
}