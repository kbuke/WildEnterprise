import { useState } from "react"
import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { GenericForm } from "../../components/form/GenericForm"
import { NameImgInfoForm } from "../../components/form/NameImgInfo"
import { postActivity } from "../../features/Activities/api"
import type { PostActivity } from "../../features/Activities/types"
import { Checkbox } from "../../components/ui/Checkbox"
import { Inputs } from "../../components/ui/Inputs"
import { MONTHS } from "../../components/dates/Months"

type AddParkActivityProps = {
    parkId: number
    onClose: () => void
}

export function AddParkActivity({ parkId, onClose }: AddParkActivityProps) {
    const queryClient = useQueryClient()

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<PostActivity>({
        defaultValues: {
            freeWithStay: false,
            discountWithStay: false,
            allYearRound: false,
        },
    })

    const name = watch("name")
    const isFree = watch("freeWithStay")
    const isDiscount = watch("discountWithStay")
    const isAllYear = watch("allYearRound")

    // Months live in state (not the form) because they're toggled by clicking, not typing
    const [availableMonths, setAvailableMonths] = useState<number[]>([])
    const [monthError, setMonthError] = useState<string>()

    const toggleMonth = (month: number) => {
        setMonthError(undefined)
        setAvailableMonths(prev =>
            prev.includes(month)
                ? prev.filter(m => m !== month)
                : [...prev, month].sort((a, b) => a - b)
        )
    }

    const { mutate, isPending, error } = useMutation({
        mutationFn: postActivity,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["parks"] })
            onClose()
        },
    })

    const onSubmit = handleSubmit((data) => {
        if (!data.allYearRound && availableMonths.length === 0) {
            setMonthError("Select at least one month")
            return
        }

        const hasDiscount = data.discountWithStay && !data.freeWithStay

        mutate({
            ...data,
            parkId,
            availableMonths: data.allYearRound ? null : availableMonths,
            discountWithStay: hasDiscount,
            stayDiscount: hasDiscount ? Number(data.stayDiscount) / 100 : null,
        })
    })

    return (
        <GenericForm
            postOrPatch="Post"
            instance="Park Activity"
            onSubmit={onSubmit}
            onClose={onClose}
            isPending={isPending}
            errorMessage={error?.message}
            inputs={
                <>
                    <NameImgInfoForm
                        register={register}
                        errors={errors}
                        entityName="Activity"
                    />

                    <Inputs
                        label={`Price per person for ${name || "activity"} (ZAR)`}
                        type="number"
                        min={0}
                        error={errors.price?.message}
                        {...register("price", {
                            required: "Price is required",
                            valueAsNumber: true,
                            min: { value: 0, message: "Can't be negative" },
                        })}
                    />

                    <Checkbox
                        variableName="freeWithStay"
                        register={register}
                        label="Free with stay"
                    />

                    {!isFree && (
                        <Checkbox
                            variableName="discountWithStay"
                            register={register}
                            label="Discount with stay"
                        />
                    )}

                    {isDiscount && !isFree && (
                        <Inputs
                            label="Discount Amount (%)"
                            type="number"
                            min={1}
                            max={99}
                            error={errors.stayDiscount?.message}
                            {...register("stayDiscount", {
                                required: "Enter a discount between 1 and 99",
                                valueAsNumber: true,
                                min: { value: 1, message: "Minimum is 1%" },
                                max: { value: 99, message: "Maximum is 99%" },
                            })}
                        />
                    )}

                    <Checkbox
                        variableName="allYearRound"
                        register={register}
                        label="All year round"
                    />

                    {!isAllYear && (
                        <>
                            <div className="grid grid-cols-6 gap-4 mb-2">
                                {MONTHS.map((month, index) => {
                                    const monthNumber = index + 1
                                    const selected = availableMonths.includes(monthNumber)

                                    return (
                                        <button
                                            type="button"
                                            key={month}
                                            onClick={() => toggleMonth(monthNumber)}
                                            className={`cursor-pointer text-white text-center rounded py-1 ${
                                                selected ? "bg-sunset" : "bg-coal"
                                            }`}
                                        >
                                            {month}
                                        </button>
                                    )
                                })}
                            </div>
                            {monthError && <p className="text-red-600 mb-6">{monthError}</p>}
                        </>
                    )}
                </>
            }
        />
    )
}