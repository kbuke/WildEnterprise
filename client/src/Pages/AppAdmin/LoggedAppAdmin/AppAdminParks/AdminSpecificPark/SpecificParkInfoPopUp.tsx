import { useSpecificPark } from "../../../../../FetchInstances/FetchSpecificPark"
import { SpecificParkImg } from "./SpecificParkImg"
import { SpecificParkInfo } from "./SpecificParkInfo"

type SpecificParkInfoPopUpPropType = {
  id: number,
  cat: string
}

export function SpecificParkInfoPopUp({ 
    id, 
    cat
}: SpecificParkInfoPopUpPropType) {

    console.log(id)

    const { data: park, isLoading, isError } = useSpecificPark(id)

    console.log(park)

    if (isLoading) return <p>Fetching specific park...</p>
    if (isError || !park) return <p>Error fetching park</p>

    const {
        activities,
        hotels,
        images,
        img,
        info,
        location,
        partner_hotels,
    } = park

    return(
        <section>
            {cat === "Info" &&
                <SpecificParkInfo 
                    img = {img}
                    info={info}
                    location={location}
                />
            }

            {cat === "Img" &&
                <SpecificParkImg 
                    images={images}
                    id={id}
                />
            }
        </section>
    )
}
