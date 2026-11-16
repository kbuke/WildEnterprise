import { useQuery } from "@tanstack/react-query"
import { fetchAllEvents } from "../../features/Events/api"
import { today, toISODate } from "../../components/dates/dates"
import { Link } from "react-router-dom"

export function EventScannerDashboard(){

    const {data: allEvents} = useQuery({
        queryFn: fetchAllEvents,
        queryKey: ["events"]
    })

    if(!allEvents) return <p>No events found</p>

    const todayISO = toISODate(today())

    const todaysEvents = allEvents?.filter(
        event => event.start_date <= todayISO && todayISO <= (event.end_date ?? event.start_date)
    )

    console.log(todaysEvents)

    console.log(allEvents)

    return(
        <section>
            <h1>Today's Events</h1>

            <div
                className="p-10"
            >
                {todaysEvents?.length === 0
                    ? <p>No Events Today. Please login the day there is one.</p>
                    : todaysEvents.map((event, index) => {
                        const {id, name, slug, img} = event
                        return(
                            <Link
                                to={`/scanevent/${slug}/${id}`}
                                className="h-140 w-100 border overflow-hidden flex flex-col rounded"
                                key={index}
                            >
                                <img 
                                    src={img}
                                    className="h-120"
                                />

                                <div
                                    className="bg-coal text-sunset h-20 flex items-center justify-center font-bold text-2xl uppercase"
                                >
                                    {name}
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
        </section>
    )
}