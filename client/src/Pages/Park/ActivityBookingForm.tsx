import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { GenericForm } from "../../components/form/GenericForm"
import { Inputs } from "../../components/ui/Inputs"
import { postActivityBooking } from "../../features/ActivityBookings/api"
import type { AllActivities } from "../../features/Activities/types"
import type { VerifiedStay } from "../../features/HotelBookings/types"
import {
    addDays, formatLong, formatShort, formatZAR, MAX_ADVANCE_DAYS, toISODate, today
} from "../../components/dates/dates"

const MONTHS = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"]

type Props = {
    activity: AllActivities
    stay: VerifiedStay | null
    onClose: () => void
}
type Values = { date: string; noOfPeople: number }

export function ActivityBookingForm({ activity, stay, onClose }: Props) {
    const todayISO = toISODate(today())
    const minDate = stay && stay.arrival > todayISO ? stay.arrival : todayISO
    const maxDate = stay ? stay.departure : toISODate(addDays(today(), MAX_ADVANCE_DAYS))
    const maxPeople = stay?.guests

    const { register, handleSubmit, watch, formState: { errors } } = useForm<Values>({
        defaultValues: { noOfPeople: 1 },
    })

    const people = Number(watch("noOfPeople")) || 0

    // Display only: the server calculates the real price
    const perk = !!stay && (activity.free_with_stay || activity.discount_with_stay)
    const total = !perk ? activity.price * people
        : activity.free_with_stay ? 0
        : activity.price * people * (1 - (activity.stay_discount ?? 0))

    const { mutate, isPending, error, data: booked } = useMutation({
        mutationFn: postActivityBooking,
    })

    const onSubmit = handleSubmit((v) =>
        mutate({
            date: v.date,
            noOfPeople: v.noOfPeople,
            activityId: activity.id,
            ...(stay && {
                bookingRef: stay.bookingRef,
                email: stay.email,
                stayType: stay.stayType,
            }),
        })
    )

    if (booked) {
        return (
            <div className="bg-white rounded p-10 w-[40%] text-center">
                <h1 className="font-bold text-3xl mb-4">You're booked in!</h1>
                <p>{activity.name} on {formatLong(booked.date)} for {booked.no_of_people}</p>
                <p className="mt-2">Reference: <strong>{booked.booking_reference}</strong></p>
                <p className="mt-2 font-bold">
                    {booked.total_price === 0 ? "Free with your stay" : formatZAR(booked.total_price)}
                </p>
                <button
                    onClick={onClose}
                    className="mt-6 bg-green-800 text-white px-10 py-2 rounded cursor-pointer"
                >
                    Close
                </button>
            </div>
        )
    }

    return (
        <GenericForm
            postOrPatch="Post"
            instance="Activity"
            title={`Book ${activity.name}`}
            submitLabel="Confirm booking"
            className="bg-white w-[45%] max-h-[90%] rounded flex flex-col px-10 py-6 overflow-auto"
            onSubmit={onSubmit}
            onClose={onClose}
            isPending={isPending}
            errorMessage={error?.message}
            inputs={
                <>
                    {stay && (
                        <p className="mb-6 bg-gray-100 rounded p-3">
                            Your stay: {formatShort(stay.arrival)} → {formatShort(stay.departure)} ·{" "}
                            {stay.guests} guest{stay.guests > 1 && "s"}
                        </p>
                    )}

                    {!activity.all_year_round && activity.available_months && (
                        <p className="mb-4 text-sm">
                            Available in: {activity.available_months.map(m => MONTHS[m - 1]).join(", ")}
                        </p>
                    )}

                    <Inputs
                        type="date"
                        label="Date"
                        min={minDate}
                        max={maxDate}
                        error={errors.date?.message}
                        {...register("date", {
                            required: "Pick a date",
                            validate: (v) => {
                                if (v < minDate || v > maxDate) {
                                    return stay
                                        ? `Pick a day during your stay (${formatShort(minDate)} to ${formatShort(maxDate)})`
                                        : "Pick a valid date"
                                }
                                if (!activity.all_year_round && activity.available_months?.length) {
                                    const month = Number(v.slice(5, 7))
                                    if (!activity.available_months.includes(month)) {
                                        return `${activity.name} isn't available in ${MONTHS[month - 1]}`
                                    }
                                }
                                return true
                            },
                        })}
                    />

                    <Inputs
                        type="number"
                        label={maxPeople ? `Number of people (max ${maxPeople})` : "Number of people"}
                        min={1}
                        max={maxPeople}
                        error={errors.noOfPeople?.message}
                        {...register("noOfPeople", {
                            required: "Enter the number of people",
                            valueAsNumber: true,
                            min: { value: 1, message: "At least 1 person" },
                            ...(maxPeople && {
                                max: { value: maxPeople, message: `Your stay is for ${maxPeople} guest(s)` },
                            }),
                        })}
                    />

                    <p className="mb-6 font-bold text-xl">
                        Total: {total === 0 && perk ? "Free with your stay" : formatZAR(total)}
                    </p>
                </>
            }
        />
    )
}