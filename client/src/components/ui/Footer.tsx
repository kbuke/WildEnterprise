export function Footer(){

    const labels = (label: string, value: string) => {
        return(
            <div
                className="flex gap-2 mt-4"
            >
                <label
                    className="font-bold"
                >
                    {label}
                </label>

                <p>
                    {value}
                </p>
            </div>
        )
    }
    return(
        <div
            className="border-t border-white bg-coal py-10 px-4 text-white lg:grid grid-cols-3"
        >
            <div>
                {labels("Physical Address:", "Second Floor, Block A, Townbush Office Park, 460 Townbush Road, Pietermaritzburg, 3201")}
                {labels("Postal Address: ", "PO Box 21450, Mayors Walk, 3208")}
                {labels("Telephone no: ", "033 343 6380")}
            </div>
        </div>
    )
}