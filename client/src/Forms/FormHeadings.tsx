type FormHeadingType = {
    action: "Add" | "Edit" | "Delete",
    title: string
    onClose: () => void
}

export function FormHeadings({
    action,
    title,
    onClose
}: FormHeadingType){
    return(
        <div
            className="flex justify-between py-4 px-14 border-b w-[98%] justify-self-center flex-row items-center"
        >
            <h1
                className="text-2xl font-bold"
            >
                {action} {title}
            </h1>

            <button
                className="bg-red-600/80 text-white px-4 py-2 rounded cursor-pointer w-30"
                onClick={onClose}
            >
                Close
            </button>
        </div>
    )
}