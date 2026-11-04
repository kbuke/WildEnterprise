// components/form/CardInstance.tsx
import { useState } from "react"
import type { FieldErrors, FieldValues, RegisterOptions, UseFormRegister } from "react-hook-form"
import { Inputs } from "../ui/Inputs"
import { TextAreas } from "../ui/TextAreas"
import { LocalCheckbox } from "../ui/Checkbox"
import { NameImgInfoForm, type RequiredRule } from "./NameImgInfo"


export type CardFields = {
    name: string
    img: string
    info: string
    cardInfo: string
    pI1: string
    pI2: string
    pI3?: string
    pI4?: string
    pI5?: string
}

export type {RequiredRule}

// export type RequiredRule = (message: string) => RegisterOptions<CardFields, any>

const alwaysRequired: RequiredRule = (message) => ({ required: message })

type CardFormProps<T extends FieldValues & CardFields> = {
    register: UseFormRegister<T>
    errors: FieldErrors<T>
    entityName?: string
    rule?: RequiredRule   // swap in a draft-aware rule; default is "always required"
}

export function CardForm<T extends FieldValues & CardFields>({
    register: registerProp,
    errors: errorsProp,
    entityName = "Item",
    rule = alwaysRequired,
}: CardFormProps<T>) {
    const register = registerProp as unknown as UseFormRegister<CardFields>
    const errors = errorsProp as FieldErrors<CardFields>

    const [fivePics, setFivePics] = useState(false)

    return (
        <>
            <NameImgInfoForm
                register={register}
                errors={errors}
                entityName={entityName}
                rule={rule}
            />

            <TextAreas
                label="Card Info"
                placeholder="Please enter Card Info"
                error={errors.cardInfo?.message}
                {...register("cardInfo", rule("Card info is required"))}
                className="h-30"
            />

            <Inputs
                label="Primary Image 1"
                placeholder="Please enter primary image 1"
                error={errors.pI1?.message}
                {...register("pI1", rule("Primary Image 1 is required"))}
            />

            <Inputs
                label="Primary Image 2"
                placeholder="Please enter primary image 2"
                error={errors.pI2?.message}
                {...register("pI2", rule("Primary Image 2 is required"))}
            />

            <LocalCheckbox
                variableName="fivePics"
                label="Include five primary pictures"
                checked={fivePics}
                onChange={setFivePics}
            />

            {fivePics && (
                <>
                    {(["pI3", "pI4", "pI5"] as const).map((key, i) => (
                        <Inputs
                            key={key}
                            label={`Primary Image ${i + 3}`}
                            placeholder={`Please enter primary image ${i + 3}`}
                            error={errors[key]?.message}
                            {...register(key, rule(`Primary Image ${i + 3} is required when using five images`))}
                        />
                    ))}
                </>
            )}
        </>
    )
}