import { useForm } from "react-hook-form"
import type { PostPark } from "../../features/Parks/types"
import { cleanParkPayload, pickDirty } from "../../features/Parks/helpers"
import { GenericForm } from "../../components/form/GenericForm"
import { AddPark } from "./AddPark"

type ParkFormProps = {
    mode: "Post" | "Patch",
    defaultValues?: Partial<PostPark>
    onSubmit: (data: Partial<PostPark>) => void
    onClose: () => void
    isPending: boolean,
    errorMessage?: string
}

export function ParkForm({
    mode, defaultValues, onSubmit, onClose, isPending, errorMessage
}: ParkFormProps){
    const {
        register,
        handleSubmit,
        watch,
        formState: {errors, dirtyFields}
    } = useForm<PostPark>({
        defaultValues
    })

    const submit = handleSubmit((data) => {
        const clean = cleanParkPayload(data)
        onSubmit(mode === "Patch" ? pickDirty(clean, dirtyFields): clean)
    })

    return(
        <GenericForm 
            postOrPatch={mode}
            instance="Parks"
            inputs={
                <AddPark 
                    register={register}
                    errors={errors}
                    watch={watch}
                />
            }
            onSubmit={submit}
            onClose={onClose}
            isPending={isPending}
            errorMessage={errorMessage}
        />
    )
}