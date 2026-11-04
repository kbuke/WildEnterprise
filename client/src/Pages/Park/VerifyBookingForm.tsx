import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { GenericForm } from "../../components/form/GenericForm"
import { Inputs } from "../../components/ui/Inputs"
import { verifyReviewBooking } from "../../features/Reviews/api"
import type { VerifiedBooking } from "../../features/Reviews/types"

type Props = {
  parkId: number
  onVerified: (booking: VerifiedBooking) => void
  onClose: () => void
}
type Values = { bookingRef: string; email: string }

export function VerifyBookingForm({ parkId, onVerified, onClose }: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm<Values>()

  const { mutate, isPending, error } = useMutation({
    mutationFn: verifyReviewBooking,
    onSuccess: (res, vars) => onVerified({ ...vars, bookingName: res.bookingName }),
  })

  const onSubmit = handleSubmit((v) =>
    mutate({ parkId, bookingRef: v.bookingRef.trim(), email: v.email.trim() })
  )

  return (
    <GenericForm
      postOrPatch="Post"
      instance="Review"
      title="Find your booking"
      submitLabel="Continue"
      className="bg-white w-[40%] max-h-[90%] rounded flex flex-col px-10 py-6 overflow-auto"
      onSubmit={onSubmit}
      onClose={onClose}
      isPending={isPending}
      errorMessage={error?.message}
      inputs={
        <div className="text-black">
          <p className="mb-6">
            Enter the booking reference from your confirmation email and the email address you booked with.
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
            autoComplete="email"
            error={errors.email?.message}
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" },
            })}
          />
        </div>
      }
    />
  )
}