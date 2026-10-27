import { Link } from "react-router-dom"

type AdminCard = {
    id: number,
    name: string, 
    img: string,
    slug: string,
    edit: boolean
}

export function AdminCards({
    id, 
    name, 
    img,
    slug,
    edit
}: AdminCard){
    return(
        <div
            className={`grid grid-cols-[1fr_3fr] mt-6 gap-4 h-70 ${id % 3 !== 0 && "border-r border-sunset"}`}
        >
            <div
                className="h-70 w-60 bg-sunset flex items-center justify-center"
            >
                <img 
                    src={img}
                    alt={`${name}-img`}
                    className="h-69 w-59"
                />
            </div>

            <div
                className="flex flex-col items-start gap-2 justify-end"
            >
                <h1
                    className="text-3xl font-bold uppercase"
                >
                    {name}
                </h1>

                {edit &&
                    <button
                        className="bg-blue-800 text-white rounded cursor-pointer px-4 py-2"
                    >
                        Edit {name}
                    </button>
                }

                <button
                    className="bg-red-800 text-white rounded cursor-pointer px-4 py-2"
                >
                    Delete {name}
                </button>

                <Link
                    className="bg-purple-800 text-white rounded cursor-pointer px-4 py-2"
                    to={`/adminparks/${slug}/${id}`}
                >
                    {name} Info
                </Link>
            </div>
        </div>
    )
}