import type { AllActivities } from "../../features/Activities/types"
import type { AllRooms } from "../../features/Rooms/types"
import { ParkActivityRelations } from "./ActivityRelations"
import type { ParkRelationType } from "./Park"
import { Rooms } from "./Rooms"

type BaseProps = {
    text: string
    heading: string
}

type ActivitiesProps = BaseProps & {
    subheading: "Activities"
    relationalArray: AllActivities[]
    onBook: (type: ParkRelationType, id: number) => void
}

type RoomsProps = BaseProps & {
    subheading: "Rooms"
    relationalArray: AllRooms[]
    parkId: number
}

// add future relations here, each with the props it needs
type ParkRelationProps = ActivitiesProps | RoomsProps

export function ParkRelations(props: ParkRelationProps) {
    const { text, heading, subheading } = props

    return (
        <div>
            <div className="px-20 mb-4">
                <h3 className="uppercase text-sunset font-bold text-2xl">{subheading}</h3>
                <h1 className="uppercase font-bold text-5xl mt-4 mb-4">{heading}</h1>
                <p>{text}</p>
            </div>

            {props.subheading === "Rooms" ? (
                <Rooms rooms={props.relationalArray} parkId={props.parkId} />
            ) : (
                <ActivityList
                    activities={props.relationalArray}
                    onBook={props.onBook}
                />
            )}
        </div>
    )
}

type ActivityListProps = {
    activities: AllActivities[]
    onBook: (type: ParkRelationType, id: number) => void
}

function ActivityList({ activities, onBook }: ActivityListProps) {
    return (
        <div className="bg-coal w-full text-white grid grid-cols-2 py-4 px-10 gap-4">
            {activities.map((activity) => {
                const { name, img, info, id } = activity

                return (
                    <div key={id} className="grid grid-cols-[1fr_3fr] gap-4">
                        <div className="h-70 w-60 bg-sunset rounded flex items-center justify-center">
                            <img src={img} alt={`${name}-img`} className="h-69 w-59 rounded" />
                        </div>

                        <div>
                            <h1>{name}</h1>
                            <p>{info}</p>

                            <ParkActivityRelations activity={activity} />

                            <button
                                className="bg-green-800 px-8 py-2 rounded uppercase cursor-pointer"
                                onClick={() => onBook("Activities", id)}
                            >
                                Book {name}
                            </button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}