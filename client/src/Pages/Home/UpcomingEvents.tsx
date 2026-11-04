import { useQuery } from "@tanstack/react-query"
import { fetchAllEvents } from "../../features/Events/api"
import { addDays, parseISODate, today } from "../../components/dates/dates"
import { ImgNameInfo } from "../../components/ui/ImgNameInfo"

export function UpcomingEvents(){

    const {data: allEvents} = useQuery({
        queryKey: ["events"],
        queryFn: fetchAllEvents
    })

    if(!allEvents) return <p>No Events Found</p>

    const currentDate = today()
    const ninetyDaysFromNow = addDays(currentDate, 90)

    const upcomingEvents = (allEvents.filter(event => {
        const eventDate = parseISODate(event.start_date)

        return(
            eventDate >= currentDate &&
            eventDate <= ninetyDaysFromNow
        )
    }))
    .sort((a, b) => {
        return(
            parseISODate(a.start_date).getTime() -
            parseISODate(b.start_date).getTime()
        )
    })

    console.log(upcomingEvents)

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
                    Upcoming Events
                </h1>

                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia, provident dicta porro ipsam qui necessitatibus, minus fugit ea maxime, tenetur quasi unde ut quibusdam ab cupiditate assumenda distinctio voluptas velit.
                </p>
            </div>

            <div
                className="bg-coal px-2 py-4 mt-4 h-auto flex flex-col gap-10 items-center text-white lg:grid lg:grid-cols-2"
            >
                {upcomingEvents.map((event, index) => {
                    const {id, name, img, slug, info, start_date, end_date} = event

                    return(
                        <ImgNameInfo 
                            key={index}
                            img={img}
                            name={name}
                            info={info}
                            id={id}
                            link={`/events/${id}/${slug}`}
                            additionalInfo={
                                <div
                                    className="border-b mb-2"
                                >
                                    <p><span className="font-bold">Date: </span>{start_date}</p>
                                </div>
                            }
                        />
                    )
                })}
            </div>
        </div>
    )
}