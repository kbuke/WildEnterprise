// components/forms/CardForm.tsx
import { useState } from "react"
import type { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"
import { Inputs } from "../ui/Inputs"
import { TextAreas } from "../ui/TextAreas"
import { LocalCheckbox } from "../ui/Checkbox"
import { NameImgInfoForm } from "./NameImgInfo"

// The fields every card-style form shares
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

type CardFormProps<T extends FieldValues & CardFields> = {
    register: UseFormRegister<T>
    errors: FieldErrors<T>
    entityName?: string // "Event", "Park", etc. for placeholders
}

export function CardForm<T extends FieldValues & CardFields>({
    register: registerProp, // call register, registerProp
    errors: errorsProp,
    entityName = "Item",
}: CardFormProps<T>) {
    // Single cast so the field names type-check inside this component
    const register = registerProp as unknown as UseFormRegister<CardFields>
    const errors = errorsProp as FieldErrors<CardFields>

    const [fivePics, setFivePics] = useState(false)

    return (
        <>
            <NameImgInfoForm 
                register={register}
                errors={errors}
                entityName="Park"
            />

            <TextAreas
                label="Card Info"
                placeholder="Please enter Card Info"
                error={errors.cardInfo?.message}
                {...register("cardInfo", { required: "Card info is required" })}
                className="h-30"
            />

            <Inputs
                label="Primary Image 1"
                placeholder="Please enter primary image 1"
                error={errors.pI1?.message}
                {...register("pI1", { required: "Primary Image 1 is required" })}
            />

            <Inputs
                label="Primary Image 2"
                placeholder="Please enter primary image 2"
                error={errors.pI2?.message}
                {...register("pI2", { required: "Primary Image 2 is required" })}
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
                            {...register(key)}
                        />
                    ))}
                </>
            )}
        </>
    )
}