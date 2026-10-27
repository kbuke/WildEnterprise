import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { fetchSpecificPark } from "../../features/Parks/api"
import { AssociatedMapper } from "../../components/layout/associatedLinks"
import { FourImgHeroSection } from "../../components/ui/FourImgHeroSection"
import { ParkRelations } from "./ParkRelations"
import { useState } from "react"
import { PopUp } from "../../components/ui/Popup"
import { ActivityBooking } from "./ActivityBooking"

export type ParkRelationType = "Activities" | "Hotels" | "Partner Hotels"

type Booking = {type: ParkRelationType, id: number}


export function Park(){
    const [booking, setBooking] = useState<Booking | null>(null)

    const {id} = useParams()
    const parkId = Number(id)

    const {data, isError} = useQuery({
        queryKey: ["parks", id],
        queryFn: () => fetchSpecificPark(parkId),
        enabled: !Number.isNaN(parkId)
    })

    // if(isError || !data) return <p>Error...</p>
    if(!data){
        return isError ? <p>Could not load park</p> : null
    }

    if(!parkId){
        return <p>Can not find park id</p>
    }

    console.log(data)

    const {
        activities,
        hotels,
        images,
        img,
        info,
        location,
        name,
        partner_hotels,
        primary_img_1,
        primary_img_2,
        primary_img_3,
        primary_img_4,
        primary_img_5,
        accomodation,
        rooms
    } = data

    console.log(rooms)


    return(
        <section>
            <FourImgHeroSection 
                pI1={primary_img_1}
                pI2={primary_img_2}
                pI3={primary_img_3}
                pI4={primary_img_4}
                header={name}
            />

            <div
                className="py-10 px-20 text-xl"
            >
                <p>
                    {info}
                </p>

                <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos, dolorem doloribus odio doloremque fuga vero, amet nisi totam sapiente, fugiat eveniet ipsa dolor asperiores molestiae? Voluptatum blanditiis officiis reiciendis facere.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae soluta nostrum eius quod omnis repellat ipsam, impedit harum cum quas maiores voluptas id iste architecto sapiente libero ea in quis.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto earum aliquid quidem? Veniam mollitia totam, numquam amet, excepturi eum nemo ipsum ullam rem in dolores doloribus aperiam expedita nostrum illo!
                </p>
            </div>

            {accomodation &&
                <>
                    <ParkRelations 
                        text="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos, dolorem doloribus odio doloremque fuga vero, amet nisi totam sapiente, fugiat eveniet ipsa dolor asperiores molestiae? Voluptatum blanditiis officiis reiciendis facere. Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae soluta nostrum eius quod omnis repellat ipsam, impedit harum cum quas maiores voluptas id iste architecto sapiente libero ea in quis."
                        subheading="Rooms"
                        heading={`Book your stay at ${name}`}
                        relationalArray={rooms}
                        parkId={parkId}
                    />
                </>
            }

            <ParkRelations 
                text="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos, dolorem doloribus odio doloremque fuga vero, amet nisi totam sapiente, fugiat eveniet ipsa dolor asperiores molestiae? Voluptatum blanditiis officiis reiciendis facere. Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae soluta nostrum eius quod omnis repellat ipsam, impedit harum cum quas maiores voluptas id iste architecto sapiente libero ea in quis."
                subheading="Activities"
                heading={`Plan your activities at ${name}`}
                relationalArray={activities}
                onBook = {(type, id) => setBooking({type, id})}
                // parkId={parkId}
            />

            {booking?.type === "Activities" && (
                <PopUp 
                    child={
                        <ActivityBooking 
                            activityId={booking.id}
                            onClose={() => setBooking(null)}
                        />
                    }
                />
            )}
        </section>
    )
}