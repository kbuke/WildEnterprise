import { Controller, useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { GenericForm } from "../../components/form/GenericForm"
import { Inputs } from "../../components/ui/Inputs"
import { TextAreas } from "../../components/ui/TextAreas"   // adjust to your path
import { StarRating } from "../../components/ui/StarRating"
import { postReview } from "../../features/Reviews/api"
import type { VerifiedBooking } from "../../features/Reviews/types"

type Props = { booking: VerifiedBooking; onClose: () => void }
type Values = { reviewerName: string; rating: number; review: string }

export function ReviewForm({ booking, onClose }: Props) {
  const queryClient = useQueryClient()

  const { register, handleSubmit, control, watch, formState: { errors } } = useForm<Values>({
    defaultValues: {
      reviewerName: booking.bookingName.split(" ")[0],
      rating: 0,
      review: "",
    },
  })

  const reviewLength = watch("review")?.length ?? 0

  const { mutate, isPending, error } = useMutation({
    mutationFn: postReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", booking.parkId] })
      onClose()
    },
  })

  const onSubmit = handleSubmit((v) =>
    mutate({
      // the server re-verifies these, so nothing can be swapped in step 2
      parkId: booking.parkId,
      bookingRef: booking.bookingRef,
      email: booking.email,
      rating: v.rating,
      review: v.review.trim(),
      reviewerName: v.reviewerName.trim(),
    })
  )

  return (
    <GenericForm
      postOrPatch="Post"
      instance="Review"
      title="Leave a review"
      submitLabel="Submit review"
      onSubmit={onSubmit}
      onClose={onClose}
      isPending={isPending}
      errorMessage={error?.message}
      inputs={
        <div className="text-black">
          <div className="flex flex-col mb-8">
            <label className="font-bold mb-2">Your rating</label>
            <Controller
              control={control}
              name="rating"
              rules={{ validate: (v) => v >= 1 || "Please choose a rating from 1 to 5 stars" }}
              render={({ field }) => (
                <StarRating value={field.value} onChange={field.onChange} />
              )}
            />
            {errors.rating && <p className="text-red-600 text-sm mt-2">{errors.rating.message}</p>}
          </div>

          <Inputs
            label="Name shown with your review"
            error={errors.reviewerName?.message}
            {...register("reviewerName", {
              required: "Name is required",
              minLength: { value: 2, message: "At least 2 characters" },
              maxLength: { value: 50, message: "At most 50 characters" },
            })}
          />

          <TextAreas
            label={`Your review (${reviewLength}/1000)`}
            rows={6}
            error={errors.review?.message}
            {...register("review", {
              required: "Please write a review",
              minLength: { value: 10, message: "At least 10 characters" },
              maxLength: { value: 1000, message: "At most 1000 characters" },
            })}
          />
        </div>
      }
    />
  )
}