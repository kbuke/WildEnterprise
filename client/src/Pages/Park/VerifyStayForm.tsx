import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { GenericForm } from "../../components/form/GenericForm"
import { Inputs } from "../../components/ui/Inputs"
import { verifyStay } from "../../features/HotelBookings/api"
import type { VerifiedStay } from "../../features/HotelBookings/types"

type Props = {
    parkId: number
    onVerified: (stay: VerifiedStay) => void
    onBack: () => void
}
type Values = { bookingRef: string; email: string }

export function VerifyStayForm({ parkId, onVerified, onBack }: Props) {
    const { register, handleSubmit, formState: { errors } } = useForm<Values>()

    const { mutate, isPending, error } = useMutation({
        mutationFn: verifyStay,
        onSuccess: (details, vars) => onVerified({ ...vars, ...details }),
    })

    const onSubmit = handleSubmit((v) =>
        mutate({
            parkId,
            bookingRef: v.bookingRef.trim(),
            email: v.email.trim(),
            stayType: "we",   // later: let the user choose "we" or "partner"
        })
    )

    return (
        <GenericForm
            postOrPatch="Post"
            instance="Activity"
            title="Find your stay"
            submitLabel="Continue"
            className="bg-white w-[40%] max-h-[90%] rounded flex flex-col px-10 py-6 overflow-auto"
            onSubmit={onSubmit}
            onClose={onBack}
            isPending={isPending}
            errorMessage={error?.message}
            inputs={
                <>
                    <p className="mb-6">
                        Enter the booking reference from your confirmation email and the email you booked with.
                    </p>
                    <Inputs
                        label="Booking reference"
                        placeholder="WE-1A2B3C4D"
                        autoComplete="off"
                        error={errors.bookingRef?.message}
                        {...register("bookingRef", { required: "Booking reference is required" })}
                    />
                    <Inputs
                        label="Email address"
                        type="email"
                        error={errors.email?.message}
                        {...register("email", {
                            required: "Email is required",
                            pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" },
                        })}
                    />
                </>
            }
        />
    )
}