import type { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"
import { Inputs } from "../ui/Inputs"
import { TextAreas } from "../ui/TextAreas"

export type NameImgInfoFields = {
    name: string,
    img: string,
    info: string
}

type NameImgInfoProps<T extends FieldValues & NameImgInfoFields> = {
    register: UseFormRegister<T>
    errors: FieldErrors<T>
    entityName?: string
}

export function NameImgInfoForm<T extends FieldValues & NameImgInfoFields>({
    register: registerProp,
    errors: errorsProp,
    entityName = "Item"
}: NameImgInfoProps<T>){
    const register = registerProp as unknown as UseFormRegister<NameImgInfoFields>
    const errors = errorsProp as FieldErrors<NameImgInfoFields>

    return(
        <>
            <Inputs
                label="Name"
                error={errors.name?.message}
                placeholder={`Enter ${entityName} Name`}
                {...register("name", { required: "Name is required" })}
            />

            <Inputs
                label="Image"
                error={errors.img?.message}
                placeholder={`Enter ${entityName} Card Image`}
                {...register("img", { required: "Card Image is required" })}
            />

            <TextAreas
                label="Info"
                placeholder={`Please enter ${entityName} Info`}
                error={errors.info?.message}
                {...register("info", { required: "Info is required" })}
                className="h-30"
            />
        </>
    )
}