import { RelationHeaderAndAdd } from "../../components/admin/RelationHeaderAndAdd"
import { formatShort, formatTime } from "../../components/dates/dates"
import type { AllEvents } from "../../features/Events/types"
import { RenderParkRelations } from "./RenderParkRelations"

type AdminEventsProps = {
    events: AllEvents[]
    addEvent: () => void
}

export function AdminParkEvents({
    events,
    addEvent
}: AdminEventsProps){
    console.log(events)

    const labelValues = (label: string, value: string) => {
        return(
            <div
                className="flex flex-col border-b"
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
            className="mt-10"
        >
            <RelationHeaderAndAdd 
                title="Events"
                addRelation={addEvent}
            />
            <div
                className="mt-10 grid grid-cols-2 py-4 gap-4"
            >

                {events &&
                    events.map((event) => {
                        const {
                            end_date,
                            end_time,
                            multi_day_event,
                            no_of_tickets,
                            park_id,
                            start_date,
                            start_time,
                            ticket_price,
                            tickets_sold
                        } = event

                        const eventInfoCardSection = () => {
                            return(
                                <>
                                    <div>
                                        <div
                                            className="grid grid-cols-2"
                                        >
                                            {labelValues("Start Date", start_date)}
                                            {end_date &&
                                                labelValues("End Date", end_date)
                                            }
                                        </div>

                                        <div
                                            className="grid grid-cols-2"
                                        >
                                            {labelValues("Start Time", formatTime(start_time))}
                                            {labelValues("End Time", formatTime(end_time))}
                                        </div>

                                        <div
                                            className="grid grid-cols-2"
                                        >
                                            {labelValues("Number of tickets", String(no_of_tickets))}
                                            {labelValues("Tickets Sold", String(tickets_sold))}
                                        </div>
                                    </div>
                                </>
                            )
                        }
                        return(
                            <RenderParkRelations 
                                key={event.id}
                                parkRelations={event}
                                additionalDiv={eventInfoCardSection()}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}