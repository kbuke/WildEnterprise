import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { PopUp } from "../../components/ui/Popup"
import { StarRating } from "../../components/ui/StarRating"
import { formatLong } from "../../components/dates/dates"
import { fetchParkReviews } from "../../features/Reviews/api"
import type { VerifiedBooking } from "../../features/Reviews/types"
import { VerifyBookingForm } from "./VerifyBookingForm"
import { ReviewForm } from "./ReviewForm"

export function AccomodationReviews({ parkId }: { parkId: number }) {
  const [open, setOpen] = useState(false)
  const [verified, setVerified] = useState<VerifiedBooking | null>(null)

  const close = () => {
    setOpen(false)
    setVerified(null)   // always start from step 1 next time
  }

  const { data: reviews, isPending, isError } = useQuery({
    queryKey: ["reviews", parkId],
    queryFn: () => fetchParkReviews(parkId),
  })

  console.log(reviews)

  const average = reviews?.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : null

  return (
    <div className="mt-10">
      <div className="flex gap-10 items-center">
        <h1 className="text-sunset uppercase text-3xl">Reviews</h1>

        {average && (
          <div className="flex items-center gap-2">
            <StarRating value={Math.round(Number(average))} className="text-2xl" />
            <span>{average} ({reviews!.length})</span>
          </div>
        )}

        <button
          className="bg-green-800 text-white px-10 py-2 cursor-pointer rounded"
          onClick={() => setOpen(true)}
        >
          Add Review
        </button>
      </div>

      {isPending && <p className="mt-6">Loading reviews...</p>}
      {isError && <p className="mt-6 text-red-400">Could not load reviews</p>}
      {reviews?.length === 0 && <p className="mt-6">No reviews yet. Stayed with us? Be the first.</p>}

      <div className="mt-6 grid grid-cols-2 gap-4">
        {reviews?.map((r) => (
          <div key={r.id} className="bg-white/10 rounded p-4">
            <div className="flex items-center gap-3 mb-2">
              <img src={r.review_img} alt="" className="h-10 w-10 rounded-full bg-white" />
              <div>
                <p className="font-bold">{r.reviewer_name}</p>
                <p className="text-sm opacity-70">{formatLong(r.review_date)}</p>
              </div>
            </div>
            <StarRating value={r.rating} className="text-xl" />
            <p className="mt-2">{r.review}</p>
          </div>
        ))}
      </div>

      {open && (
        <PopUp
          child={
            verified
              ? <ReviewForm booking={verified} onClose={close} />
              : <VerifyBookingForm parkId={parkId} onVerified={setVerified} onClose={close} />
          }
        />
      )}
    </div>
  )
}