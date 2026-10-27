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

export function AdminSpecificPark(){
    const [overview, setOverview] = useState<boolean>(true)
    const [addActivity, setAddActivity] = useState<boolean>(false)

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

    console.log(specificPark)

    return(
        <section>
            <div
                className="mt-4 flex flex-col items-center"
            >
                <div
                    className="h-50 w-50 rounded-full bg-sunset flex items-center justify-center"
                >
                    <img 
                        src={img}
                        className="h-48 w-48 rounded-full"
                    />
                </div>

                <h1
                    className="uppercase font-bold text-4xl"
                >
                    {name}
                </h1>

                <p
                    className="text-2xl"
                >
                    {location}
                </p>
            </div>

            <div
                className="grid grid-cols-2 text-white bg-coal text-center px-8 mt-4"
            >
                <div
                    className="border-r border-sunset"
                >
                    <h2
                        className="pt-10"
                    >
                        Card Info
                    </h2>
                    <p
                        className="pb-10"
                    >
                        {card_info}
                    </p>
                </div>

                <div>
                    <h2
                        className="pt-10"
                    >
                        Page Info
                    </h2>
                    <p
                        className="pb-10"
                    >
                        {info}
                    </p>
                </div>
            </div>

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
        </section>
    )
}