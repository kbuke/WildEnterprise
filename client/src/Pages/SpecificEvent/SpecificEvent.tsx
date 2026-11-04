import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { fetchSpecificEvent } from "../../features/Events/api"
import { TicketInfo } from "./TicketInfo"

export function SpecificEvent(){
    const {id} = useParams()

    const {data: specificEvent} = useQuery({
        queryKey: ["events", Number(id)],
        queryFn: () => fetchSpecificEvent(Number(id))
    })

    console.log(specificEvent)

    if(!specificEvent) return <p>Event not found</p>

    const {
        name,
        park,
        ticket_price,
        tickets_remaining,
        no_of_tickets,
        tickets_sold,
        end_time,
        end_date,
        start_date,
        start_time,
        img,
        info,
        multi_day_event
    } = specificEvent

    console.log(park)
    return(
        <section>
            <div
                style={{backgroundImage: `url(${img})`}}
                className="h-200 w-full bg-center bg-cover"
            >
                <div
                    className="bg-black/40 h-full w-full"
                >
                    <div
                        className="text-white flex flex-col p-10"
                    >
                        <h1
                            className="uppercase font-bold text-7xl text-sunset"
                        >
                            {name}
                        </h1>

                        {park &&
                            <p>
                                {park.name}
                            </p>
                        }

                        {(no_of_tickets - tickets_sold) > 0 ?
                            <button
                                className="green-button w-80 uppercase font-bold text-lg"
                            >
                                Book Tickets Now
                            </button>
                            : <p>
                                Sorry this event has sold out
                            </p>
                        }
                    </div>
                </div>
            </div>

            <p
                className="px-20 py-10 text-lg"
            >
                {info}
            </p>

            <TicketInfo 
                eventId={Number(id)}
                eventName={name}
                price={ticket_price}
                ticketsRemaining={no_of_tickets - tickets_sold}
            />
        </section>
    )
}