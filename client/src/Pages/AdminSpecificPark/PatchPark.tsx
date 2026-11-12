import { useMutation } from "@tanstack/react-query"
import type { PostPark, SpecificPark } from "../../features/Parks/types"
import { patchPark } from "../../features/Parks/api"
import { queryClient } from "../../ReactQuery/queryClient"
import { PopUp } from "../../components/ui/Popup"
import { ParkForm } from "../AdminParks/ParkForm"
import { parkToFormValues } from "../../features/Parks/helpers"

type PatchParkProp = {
    park: SpecificPark,
    onClose: () => void
}

export function PatchPark({
    park,
    onClose
}: PatchParkProp){
    const {id} = park

    const update = useMutation({
        mutationFn: (changes: Partial<PostPark>) => patchPark(id, changes),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["parks"],
            })
            onClose()
        }
    })

    if(!park) return null

    return(
        <PopUp
            child={
                <ParkForm 
                    mode="Patch"
                    defaultValues={parkToFormValues(park)}
                    onSubmit={update.mutate}
                    onClose={onClose}
                    isPending={update.isPending}
                    errorMessage={update.error?.message}
                />
            }
        />
    )
}