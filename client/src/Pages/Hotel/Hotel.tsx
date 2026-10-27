import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { fetchSpecificHotel } from "../../features/Hotels/api"
import { Link } from "react-router-dom"

export function Hotel(){
    const {id} = useParams()
    const hotelId = Number(id)

    const {data, isError} = useQuery({
        queryKey: ["hotel", hotelId],
        queryFn: () => fetchSpecificHotel(hotelId),
        enabled: !Number.isNaN(hotelId)
    })

    if(isError || !data) return <p>Error fetching data</p>

    console.log(data)

    const {
        name,
        email,
        img,
        info,
        park,
        rooms
    } = data

    console.log(rooms)

    const {
        name: parkName,
        id: parkId,
        img: parkImg
    } = park
    

    return(
        <div>
            <h1>{name}</h1>

            <img 
                src={img}
                alt={`${name}-img`}
            />

            <p>
                {info}
            </p>

            <Link
                to={`/park/${parkId}`}
                className="border bg-blue-600"
            >
                <img 
                    src={parkImg}
                    alt={`${parkName}-img`}
                />

                <h2>
                    {parkName}
                </h2>
            </Link>
        </div>
    )
}