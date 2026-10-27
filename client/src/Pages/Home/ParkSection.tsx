import { useQuery } from "@tanstack/react-query"
import { fetchAllParks } from "../../features/Parks/api"
import { Link } from "react-router-dom"
import { useState } from "react"

export function ParkSection(){
    const [hoverPark, setHoverPark] = useState<number>()

    const {data: allParks} = useQuery({
        queryKey: ["parks"],
        queryFn: fetchAllParks
    })

    console.log(allParks)


    return(
        <div
            className="pt-10"
        >
            <div
                className="px-6 lg:px-40 mb-10"
            >
                <h1
                    className="font-meta primary-header uppercase"
                >
                    Sites
                </h1>

                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia, provident dicta porro ipsam qui necessitatibus, minus fugit ea maxime, tenetur quasi unde ut quibusdam ab cupiditate assumenda distinctio voluptas velit.
                </p>
            </div>

            <div
                className="bg-coal px-2 py-4 mt-4 h-auto flex flex-col gap-10 items-center text-white lg:grid lg:grid-cols-2"
            >
                {allParks &&
                    allParks.map((park, index) => {
                        const{
                            name,
                            slug,
                            img,
                            info,
                            location,
                            id,
                            card_info,
                        } = park

                        return(
                            <div
                                key={index}
                                className={`border-b border-sunset py-4 lg:border-b-0 lg:${id % 2 == 1 && "border-r"} lg:grid lg:grid-cols-2`}
                            >
                                <div
                                    className="bg-sunset rounded h-30 lg:h-80 w-70 flex items-center justify-center justify-self-center"
                                >
                                    <img 
                                        src={img}
                                        className="h-29 lg:h-79 w-69 rounded"
                                    />
                                </div>

                                <div>
                                    <h1
                                        className="uppercase primary-card-header mb-0"
                                    >
                                        {name}
                                    </h1>

                                    <h2
                                        className="mb-6 text-card-sub-header"
                                    >
                                        {location}
                                    </h2>

                                    <p
                                        className="hidden lg:block mb-6"
                                    >
                                        {card_info}
                                    </p>

                                    <Link
                                        to={`/parks/${slug}/${id}`}
                                        className="bg-sunset px-4 py-2 rounded-lg"
                                    >
                                        Find Out More
                                    </Link>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}