import { ImgNameInfo } from "../../components/ui/ImgNameInfo"
import { RenderArticles } from "../../components/ui/RenderArticles"
import type { AllActivities } from "../../features/Activities/types"
import type { AllArtciles } from "../../features/Articles/types"
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

type ArticleProps = BaseProps & {
    subheading: "Articles"
    relationalArray: AllArtciles[]
}

// add future relations here, each with the props it needs
type ParkRelationProps = ActivitiesProps | RoomsProps | ArticleProps

export function ParkRelations(props: ParkRelationProps) {
    const { text, heading, subheading } = props

    return (
        <div>
            <div className="px-20 mb-4">
                <h3 className="uppercase text-sunset font-bold text-2xl">{subheading}</h3>
                <h1 className="uppercase font-bold text-5xl mt-4 mb-4">{heading}</h1>
                <p>{text}</p>
            </div>

            {props.subheading === "Rooms" &&
                <Rooms 
                    rooms={props.relationalArray}
                    parkId={props.parkId}
                />
            }

            {props.subheading === "Activities" &&
                <ActivityList 
                    activities={props.relationalArray}
                    onBook={props.onBook}
                />
            }

            {props.subheading === "Articles" &&
                <RenderArticles 
                    articles={props.relationalArray}
                    marginBottom={false}
                />
            }

            {/* {props.subheading === "Rooms" ? (
                <Rooms rooms={props.relationalArray} parkId={props.parkId} />
            ) : (
                <ActivityList
                    activities={props.relationalArray}
                    onBook={props.onBook}
                />
            )} */}
        </div>
    )
}

type ActivityListProps = {
    activities: AllActivities[]
    onBook: (type: ParkRelationType, id: number) => void
}

function ActivityList({ activities, onBook }: ActivityListProps) {
    return (
        <div
            className="associate-bg mb-10"
        >
            {activities.map((activity, index) => {
                const {name, img, info, id} = activity

                return(
                    <ImgNameInfo 
                        key={index}
                        name={name}
                        img={img}
                        info={info}
                        id={id}
                        bookButton={true}
                        onBook={() => onBook("Activities", id)}
                        additionalInfo={
                            <ParkActivityRelations 
                                activity={activity}
                            />
                        }
                    />
                )
            })}
        </div>

    )
}