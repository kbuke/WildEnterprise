import { useState } from "react"
import { useAllHotels } from "../../../../FetchInstances/FetchHotels"
import { AdminPgHeader } from "../../../../CustomComponents/AppAdminComponents/AdminPgHeader"
import { PopUp } from "../../../../CustomComponents/Popup"
import { HotelInfoForm } from "../../../../Forms/HotelInfoForm"
import { useAllPartnerHotels } from "../../../../FetchInstances/FetchPartnerHotels"
import { AdminHomeButton } from "../../../../CustomComponents/AppAdminComponents/AdminHomeButton"
import { AdminCard } from "../../../../CustomComponents/AppAdminComponents/AdminCards"

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

    return(
        <section>
            <AdminPgHeader 
                header={hotelType === "WildEnterprise" ? "WildEnterprise Hotels" : "Partner Hotels"}
                addButtonHeader="Hotel"
                setAddInstance={() => setHotelAction("Post")}
            />

            <AdminHomeButton />

            <div
                className="flex gap-10 mt-4 px-6"
            >
                {hotelOptionButton("WildEnterprise")}
                {hotelOptionButton("Partner")}
            </div>

            {
                hotelType === "WildEnterprise"
                    ? <AdminCard 
                        editOption={false}
                        infoButton={true}
                        cardArray={hotels ?? []}
                    />
                    : <AdminCard 
                        editOption={false}
                        infoButton={true}
                        cardArray={partnerHotels ?? []}
                    />
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
        </section>
    )
}