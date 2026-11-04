import { useState } from "react"
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import type { DateRange } from "react-day-picker"
import type { PostEvent } from "../../features/Events/types"
import { postEvent } from "../../features/Events/api"
import { queryClient } from "../../ReactQuery/queryClient"
import { GenericForm } from "../../components/form/GenericForm"
import { CardForm } from "../../components/form/CardInstance"
import { Checkbox } from "../../components/ui/Checkbox"
import { Inputs } from "../../components/ui/Inputs"
import { DateRangePicker } from "../../components/ui/DateRangePicker"
import { nightsBetween, toISODate, today } from "../../components/dates/dates"

type AddParkEventProp = {
    parkId: number
    onClose: () => void
}

export function AddParkEvent({ parkId, onClose }: AddParkEventProp) {
    const [dateRange, setDateRange] = useState<DateRange | undefined>()
    const [rangeError, setRangeError] = useState<string>()

    const { register, handleSubmit, formState: { errors }, watch } = useForm<PostEvent>({
        defaultValues: { multiDayEvent: false },
        shouldUnregister: true, // unmounted fields are dropped and not validated
    })

    const name = watch("name")
    const multiDay = watch("multiDayEvent")

    const { mutate, isPending, error } = useMutation({
        mutationFn: postEvent,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["parks"] })
            onClose()
        },
    })

    const onSubmit = handleSubmit((data) => {
        let startDate = data.startDate
        let endDate: string | undefined

        if (multiDay) {
            if (!dateRange?.from || !dateRange.to || nightsBetween(dateRange.from, dateRange.to) < 1) {
                setRangeError("Select a start and end date (two different days)")
                return
            }
            startDate = toISODate(dateRange.from)
            endDate = toISODate(dateRange.to)
        }

        setRangeError(undefined)
        mutate({ ...data, startDate, endDate, parkId })
    })

    return (
        <GenericForm
            postOrPatch="Post"
            instance="Park Event"
            onSubmit={onSubmit}
            onClose={onClose}
            isPending={isPending}
            errorMessage={error?.message}
            inputs={
                <>
                    <CardForm register={register} errors={errors} entityName="Events" />

                    <Checkbox
                        variableName="multiDayEvent"
                        register={register}
                        label="Multi Day Event?"
                    />

                    {multiDay ? (
                        <div className="flex flex-col gap-1 mb-4">
                            <label className="font-bold">Event dates</label>
                            <DateRangePicker
                                value={dateRange}
                                onChange={setDateRange}
                                placeholder="Select start and end date"
                            />
                            {rangeError && <p className="text-red-600">{rangeError}</p>}
                        </div>
                    ) : (
                        <Inputs
                            type="date"
                            label="Event Date"
                            min={toISODate(today())}
                            error={errors.startDate?.message}
                            {...register("startDate", {
                                required: "Enter start date",
                                validate: (v) => v >= toISODate(today()) || "Event can't be in the past",
                            })}
                        />
                    )}

                    <Inputs
                        type="time"
                        label="Start time"
                        error={errors.startTime?.message}
                        {...register("startTime", { required: "Please enter start time" })}
                    />

                    <Inputs
                        type="time"
                        label="End time"
                        error={errors.endTime?.message}
                        {...register("endTime", {
                            required: "Please enter end time",
                            // a multi-day event may end earlier in the day than it started
                            validate: (v, form) =>
                                multiDay || v > form.startTime || "End time must be after start time",
                        })}
                    />

                    <Inputs
                        type="number"
                        label="Number of tickets available"
                        min={1}
                        error={errors.noOfTickets?.message}
                        {...register("noOfTickets", {
                            required: "Number of tickets is required",
                            valueAsNumber: true,
                            min: { value: 1, message: "Has to be at least 1 ticket" },
                        })}
                    />

                    <Inputs
                        type="number"
                        label={`Price per person for ${name || "event"} (ZAR)`}
                        min={0}
                        error={errors.ticketPrice?.message}
                        {...register("ticketPrice", {
                            required: "Price is required",
                            valueAsNumber: true,
                            min: { value: 0, message: "Can't be negative" },
                        })}
                    />
                </>
            }
        />
    )
}