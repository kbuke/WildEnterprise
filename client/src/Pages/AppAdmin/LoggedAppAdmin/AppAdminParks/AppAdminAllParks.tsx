import { useState } from "react";
import { AdminPgHeader } from "../../../../CustomComponents/AppAdminComponents/AdminPgHeader";
import { AdminHomeButton } from "../../../../CustomComponents/AppAdminComponents/AdminHomeButton";
import { useAllParks } from "../../../../FetchInstances/FetchParks";
import { AdminCard } from "../../../../CustomComponents/AppAdminComponents/AdminCards";
import { PopUp } from "../../../../CustomComponents/Popup";
import { ParkInfoForm } from "../../../../Forms/ParkInfoForm";

export function AppAdminAllParks(){
    const [parkAction, setParkAction] = useState<null | "Post" | "Patch" | "Delete">()

    const {
        data: parks,
        isLoading,
        error
    } = useAllParks()

    if(isLoading) return <p>Fetching Parks...</p>
    if(error) return <p>Error fetching Parks</p>

    return(
        <section>
            <AdminPgHeader 
                header="Parks"
                addButtonHeader="Parks"
                setAddInstance={() => setParkAction("Post")}
            />

            <AdminHomeButton />

            <AdminCard 
                editOption={true}
                infoButton={true}
                cardArray={parks ?? []}
            />

            {parkAction === "Post" &&
                <PopUp 
                    children={
                        <ParkInfoForm 
                            onClose={() => setParkAction(null)}
                            action="Post"
                        />
                    }
                />
            }
        </section>
    )
}