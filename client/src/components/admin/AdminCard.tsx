import { Link } from "react-router-dom"

type AdminCardProps = {
    name: string,
    img: string,
    url: string,
    id: number
}

export function AdminCard({
    name, img, url, id
}: AdminCardProps){
    return(
        <div
            className="flex flex-col items-center mt-10"
        >
            <div
                className="card-img-bg"
            >
                <img 
                    src={img}
                    className="card-img"
                />
            </div>

            <div>
                <h1
                    className="font-bold uppercase text-2xl"
                >
                    {name}
                </h1>

                <Link
                    to={url}
                    className="green-button border rounded py-2 px-4"
                >
                    <button>
                        See More
                    </button>
                </Link>
            </div>
        </div>
    )
}