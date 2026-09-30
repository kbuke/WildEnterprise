import { useState } from "react"
import { useAllHotels } from "../../../../FetchInstances/FetchHotels"
import { AdminPgHeader } from "../../../../CustomComponents/AppAdminComponents/AdminPgHeader"
import { PopUp } from "../../../../CustomComponents/Popup"
import { HotelInfoForm } from "../../../../Forms/HotelInfoForm"
import { useAllPartnerHotels } from "../../../../FetchInstances/FetchPartnerHotels"

type HotelCardType = {
    id: number
    name: string
    img: string
}

export function AppAdminHotels(){
    const [hotelAction, setHotelAction] = useState<null | "Post">(null)
    const [selectedHotel, setSelectedHotel] = useState<number>()
    const [hotelType, setHotelType] = useState<"WildEnterprise" | "Partner">("WildEnterprise")

    const {
        data: hotels,
        isLoading,
        error
    } = useAllHotels()

    const {
        data: partnerHotels,
        isLoading: partnerHotelLoading,
        error: partnerHotelError
    } = useAllPartnerHotels()

    if(isLoading) return <p>WildEnterprise Hotels Loading...</p>
    if(error) return <p>Error fetching WildEnterprise Hotels</p>

    if(partnerHotelLoading) return <p>Partner Hotels Loading...</p>
    if(partnerHotelError) return <p>Error fetching Partner Hotels...</p>

    const hotelOptionButton = (buttonText: "WildEnterprise" | "Partner") => {
        return(
            <button
                onClick={() => setHotelType(buttonText)}
                className={`${hotelType === buttonText ? "font-bold" : "opacity-25"} cursor-pointer px-4 h-12 rounded bg-blue-200`}
            >
                {buttonText} Hotel
            </button>
        )
    }

    const hotelMapper = (list: HotelCardType[]) => {
        if (list.length === 0) {
            return <p>No {hotelType} Hotels Registered</p>
        }

        return list.map((hotel) => (
            <div
                key={hotel.id}
                className="border-b w-100 pb-4"
            >
                <img
                    src={hotel.img}
                    alt={hotel.name}
                    className="w-full rounded"
                />

                <h1 className="text-center mt-2 text-2xl font-semibold">
                    {hotel.name}
                </h1>
            </div>
        ))
    }

    console.log(hotels)
    console.log(partnerHotels)

    return(
        <section>
            <AdminPgHeader 
                header={hotelType === "WildEnterprise" ? "WildEnterprise Hotels" : "Partner Hotels"}
                addButtonHeader="Hotel"
                setAddInstance={() => setHotelAction("Post")}
            />

            <div
                className="flex gap-10 mt-4 px-6"
            >
                {hotelOptionButton("WildEnterprise")}
                {hotelOptionButton("Partner")}
            </div>

            <div
                className="px-6 py-4 grid grid-cols-3 justify-center mt-4"
            >
                {
                    hotelType === "WildEnterprise"
                        ? hotelMapper(hotels ?? [])
                        : hotelMapper(partnerHotels ?? [])
                }

                {hotelAction === "Post" &&
                    <PopUp 
                        children={
                            <HotelInfoForm 
                                onClose={() => setHotelAction(null)}
                                action={hotelAction}
                                hotelType={hotelType}
                            />
                        }
                    />
                }
            </div>
        </section>
    )
}