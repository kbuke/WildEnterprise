import { useMutation, useQuery } from "@tanstack/react-query"
import { fetchAllEvents, postEvent } from "../../features/Events/api"
import { AdminSectionHeader } from "../../components/layout/adminSectionHeader"
import { useState } from "react"
import { AdminCards } from "../../components/layout/adminCards"
import { PopUp } from "../../components/ui/Popup"
import { GenericForm } from "../../components/form/GenericForm"
import { AddEvent } from "./AddEvent"
import { useForm, type SubmitHandler } from "react-hook-form"
import type { PostEvent } from "../../features/Events/types"
import { queryClient } from "../../ReactQuery/queryClient"

export function AdminEvents(){
    const [addEvent, setAddEvent] = useState<boolean>(false)

    const {data: allEvents} = useQuery({
        queryKey: ["events"],
        queryFn: fetchAllEvents
    })

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
        watch
    } = useForm<PostEvent>()

    const createEvent = useMutation({
        mutationFn: postEvent,
        onSuccess: () => {
            queryClient.invalidateQueries(
                {queryKey: ["events"]}
            )
            reset()
            setAddEvent(!addEvent)
       } 
    })

    const onSubmit: SubmitHandler<PostEvent> = (data) => {
        const payload: PostEvent = {
            ...data,
            endDate: data.multiDayEvent && data.endDate ? data.endDate : undefined,
            pI3: data.pI3 || undefined,
            pI4: data.pI4 || undefined,
            pI5: data.pI5 || undefined
        }
        createEvent.mutate(payload)
    }

    return(
        <section>
            <AdminSectionHeader 
                header="Events"
                setAddInstance={() => setAddEvent(!addEvent)}
            />

            <div
                className="bg-cloud h-screen w-full grid grid-cols-3 px-10"
            >
                {allEvents&&
                    allEvents.map((event, index) => {
                        const {img, name, id, slug} = event
                        return(
                            <AdminCards 
                                key={index}
                                id={id}
                                name={name}
                                img={img}
                                slug={slug}
                                edit={true}
                            />
                        )
                    })
                }
            </div>

            {
                addEvent &&
                    <PopUp 
                        child={
                            <GenericForm 
                                postOrPatch="Post"
                                instance="Events"
                                inputs={
                                    <AddEvent 
                                        register={register}
                                        errors={errors}
                                        watch={watch}
                                    />
                                }
                                onSubmit={handleSubmit(onSubmit)}
                                onClose={() => setAddEvent(!addEvent)}
                                isPending={createEvent.isPending}
                                errorMessage={createEvent.error?.message}
                            />
                        }
                    />
            }
        </section>
    )
}