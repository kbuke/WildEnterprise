import type { FieldErrors, FieldValues, RegisterOptions, UseFormRegister } from "react-hook-form"
import { Inputs } from "../ui/Inputs"
import { TextAreas } from "../ui/TextAreas"

export type NameImgInfoFields = {
    name: string,
    img: string,
    info: string
}

// Same shape as the rule in CardForm: given a message, returns the validation options
export type RequiredRule = (message: string) => RegisterOptions<NameImgInfoFields, any>

const alwaysRequired: RequiredRule = (message) => ({ required: message })

type NameImgInfoProps<T extends FieldValues & NameImgInfoFields> = {
    register: UseFormRegister<T>
    errors: FieldErrors<T>
    entityName?: string
    rule?: RequiredRule   // swap in a draft-aware rule; default is "always required"
}

export function NameImgInfoForm<T extends FieldValues & NameImgInfoFields>({
    register: registerProp,
    errors: errorsProp,
    entityName = "Item",
    rule = alwaysRequired
}: NameImgInfoProps<T>){
    const register = registerProp as unknown as UseFormRegister<NameImgInfoFields>
    const errors = errorsProp as FieldErrors<NameImgInfoFields>

    return(
        <>
            {/* Always required: even a draft needs a name */}
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
                {...register("img", rule("Card Image is required"))}
            />

            <TextAreas
                label="Info"
                placeholder={`Please enter ${entityName} Info`}
                error={errors.info?.message}
                {...register("info", rule("Info is required"))}
                className="h-30"
            />
        </>
    )
}