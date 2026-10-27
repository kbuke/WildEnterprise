import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { fetchAllParks, postPark } from "../../features/Parks/api"
import { AdminSectionHeader } from "../../components/layout/adminSectionHeader"
import { AdminCards } from "../../components/layout/adminCards"
import { useState } from "react"
import { PopUp } from "../../components/ui/Popup"
import { GenericForm } from "../../components/form/GenericForm"
import { AddPark } from "./AddPark"
import { useForm, type SubmitHandler } from "react-hook-form"
import type { PostPark } from "../../features/Parks/types"

export function AdminParks(){
    const [addPark, setAddPark] = useState<boolean>(false)
    const queryClient = useQueryClient()

    const {data: allParks} = useQuery({
        queryKey: ["parks"],
        queryFn: fetchAllParks
    }) 

    const {
        register,
        formState: {errors},
        handleSubmit,
        reset,
        watch
    } = useForm<PostPark>()

    const createPark = useMutation({
        mutationFn: postPark,
        onSuccess: () => {
            queryClient.invalidateQueries(
                {queryKey: ["parks"]}
            )
            reset()
            setAddPark(!addPark)
        }
    })

    const onSubmit: SubmitHandler<PostPark> = (data) => createPark.mutate(data)

    console.log("addPark", addPark)

    return(
        <section>
            <AdminSectionHeader 
                header="Parks"
                setAddInstance={() => setAddPark(!addPark)}
            />

            <div
                className="bg-cloud h-screen w-full grid grid-cols-3 px-10"
            >
                {allParks &&
                    allParks.map((park, index) => {
                        const {img, name, id, slug} = park
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

            {addPark &&
                <PopUp 
                    child={
                        <GenericForm 
                            postOrPatch="Post"
                            instance="Park"
                            inputs={<AddPark register={register} errors={errors} watch={watch}/>}
                            onSubmit={handleSubmit(onSubmit)}
                            onClose={() => setAddPark(!addPark)}
                            isPending={createPark.isPending}
                            errorMessage={createPark.error?.message}
                    />}
                />
            }
        </section>
    )
}