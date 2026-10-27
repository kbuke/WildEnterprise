import { useParams } from "react-router-dom"
import { fetchSpecificPark } from "../../features/Parks/api"
import { useQuery } from "@tanstack/react-query"
import { RelationalComponent } from "./RelationalComponent"
import { useState } from "react"
import { PopUp } from "../../components/ui/Popup"
import { AddNewRoom } from "./AddNewRoom"

export function ParkAdminDashboard(){
    const [addRoom, setAddRoom] = useState<boolean>(false)

    const {id: parkId} = useParams()

    const parkIdInt = Number(parkId)

    if(!parkId){
        return <p>Park Not Found</p>
    }

    const {data: specificPark, isLoading, isError} = useQuery({
        queryFn: () => fetchSpecificPark(parkId),
        queryKey: ["parks", parkIdInt]
    })

    if(!specificPark){
        return <p>No Park found</p>
    }

    const {
        accomodation,
        activities,
        card_info,
        hotels,
        id,
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
        slug,
        rooms
    } = specificPark

    return (
        <div
            className="mt-4"
        >
            <div
                className="flex flex-col items-center justify-center mb-4"
            >
                <div
                    className="h-60 w-60 rounded-full bg-sunset flex items-center justify-center"
                >
                    <img 
                        src={img}
                        className="h-58 w-58 rounded-full"
                    />
                </div>

                <h1
                    className="uppercase font-extrabold text-sunset mt-4 text-5xl"
                >
                    {name}
                </h1>
            </div>

            <RelationalComponent 
                relation="Rooms"
                relationalArray={rooms}
                text={`${name} has the following room-types on  site`}
                canAdd={true}
                addInstance={() => setAddRoom(!addRoom)}
                canEdit={true}
                canDelete={true}
            />

            <RelationalComponent 
                relation="Activities"
                relationalArray={activities}
                text={`${name} has the following activities on offer. Currently only the site admin can edit, add and delete activities to ${name}`}
                canAdd={false}
                canEdit={false}
                canDelete={false}
            />

            {addRoom &&
                <PopUp 
                    child={
                        <AddNewRoom 
                            parkName={name}
                            parkId={parkIdInt}
                            onClose={() => setAddRoom(!addRoom)}
                        />
                    }
                />
            }
        </div>
    )
}