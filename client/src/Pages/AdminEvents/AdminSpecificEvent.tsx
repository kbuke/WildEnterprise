import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { fetchSpecificEvent } from "../../features/Events/api"
import { AdminHeader } from "../../components/admin/AdminHeader"
import { useState } from "react"
import { PatchEvent } from "./PatchEvent"
import { AdminEventTicketing } from "./AdminEventTicketing"

export function AdminSpecificEvent(){
    const [patchEvent, setPatchEvent] = useState<boolean>(false)
    const [deleteEvent, setDeleteEvent] = useState<boolean>(false)

    const {id} = useParams()

    const {data: specificEvent, isError} = useQuery({
        queryFn: () => fetchSpecificEvent(Number(id)),
        queryKey: ["events", id]
    })

    if(isError || !specificEvent) return <p>Could not find event</p>
    if(!id) return <p>Could not find event {id}</p>

    console.log(specificEvent)

    const {
        card_info,
        end_date,
        end_time,
        img,
        info,
        multi_day_event,
        name,
        no_of_tickets,
        park,
        park_id,
        primary_img_1,
        primary_img_2,
        primary_img_3,
        primary_img_4,
        primary_img_5,
        start_date,
        ticket_price,
        tickets_sold
    } = specificEvent
    return(
        <section
            className="flex flex-col items-center"
        >
            <AdminHeader 
                img={img}
                name={name}
                info={info}
                setDelete={() => setDeleteEvent(true)}
                setPatch={() => setPatchEvent(true)}
            />

            <AdminEventTicketing 
                noOfTickets={no_of_tickets}
                ticketPrice={ticket_price}
                ticketSold={tickets_sold}
            />

            {patchEvent &&
                <PatchEvent 
                    event={specificEvent}
                    // id={Number(id)}
                    onClose={() => setPatchEvent(false)}
                />
            }
        </section>
    )
}