import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { fetchSpecificPark } from "../../features/Parks/api"
import { useState } from "react"
import { MONTHS } from "../../components/dates/Months"
import { PopUp } from "../../components/ui/Popup"
import { AddParkActivity } from "./AddParkActivity"
import { GenericForm } from "../../components/form/GenericForm"
import { useForm } from "react-hook-form"
import { AdminParkActivities } from "./Activities"
import { AdminParkEvents } from "./Events"
import { AddParkEvent } from "./AddParkEvent"
import { AdminHeader } from "../../components/admin/AdminHeader"
import { PatchPark } from "./PatchPark"

export function AdminSpecificPark(){
    const [overview, setOverview] = useState<boolean>(true)
    const [addActivity, setAddActivity] = useState<boolean>(false)
    const [addEvent, setAddEvent] = useState<boolean>(false)
    const [patchPark, setPatchPark] = useState<boolean>(false)
    const [deletePark, setDeletePark] = useState<boolean>(false)

    const {id} = useParams()

    const parkId = Number(id)

    const {data: specificPark, isError, isLoading} = useQuery({
        queryKey: ["parks", id],
        queryFn: () => fetchSpecificPark(parkId)
    })

    if(isError || !specificPark) return <p>Error</p>
    if(isLoading) return <p>Loading...</p>

    const {
        activities,
        card_info,
        hotels,
        images,
        events,
        img,
        info,
        location,
        name,
        partner_hotels,
        primary_img_1,
        primary_img_2,
        primary_img_3,
        primary_img_4,
        primary_img_5
    } = specificPark

    const primaryImages = (img: string, imgNumber: string) => {
        return(
            <img 
                src={img}
                alt={`primary-img-${imgNumber}-${name}`}
            />
        )
    }

    return(
        <section>
            <AdminHeader 
                img={img}
                name={name}
                info={info}
                setPatch={()=>setPatchPark(true)}
                setDelete={()=>setDeletePark(true)}
            />

            <div
                className="p-10"
            >
                <h2>
                    Primary Images
                </h2>

                <div
                    className={`grid ${primary_img_3 ? "grid-cols-5" : "grid-cols-2"} mt-8`}
                >
                    {primaryImages(primary_img_1, "1")}
                    {primaryImages(primary_img_2, "2")}
                    {primary_img_3 && primaryImages(primary_img_3, "3")}
                    {primary_img_4 && primaryImages(primary_img_4, "4")}
                    {primary_img_5 && primaryImages(primary_img_5, "5")}
                </div>
            </div>

            <div
                className="bg-coal text-white w-full h-30 border-b border-white sticky top-0 z-40 flex items-center gap-20 px-20 border-t-white"
            >
                <h1
                    onClick={() => setOverview(true)}
                    className={`uppercase font-bold text-2xl ${overview && "text-sunset"} cursor-pointer`}
                >
                    Overview
                </h1>

                <h1
                    onClick={() => setOverview(false)}
                    className={`uppercase font-bold text-2xl ${!overview && "text-sunset"} cursor-pointer`}
                >
                    Finances
                </h1>
            </div>

            <div
                className="bg-coal text-white py-10 px-20"
            >
                <AdminParkActivities 
                    activities={activities}
                    setAddActivity={() => setAddActivity(!addActivity)}
                />

                <AdminParkEvents 
                    events={events}
                    addEvent={() => setAddEvent(true)}
                />
            </div>

            {addActivity &&
                <PopUp 
                    child={
                        <AddParkActivity 
                            parkId={parkId}
                            onClose={() => setAddActivity(!addActivity)}
                        />
                    }
                />
            }

            {addEvent &&
                <PopUp 
                    child={
                        <AddParkEvent 
                            parkId={parkId}
                            onClose={() => setAddEvent(!addEvent)}
                        />
                    }
                />
            }

            {patchPark &&
                <PatchPark 
                    park={specificPark}
                    onClose={() => setPatchPark(false)}
                />
            }
        </section>
    )
}