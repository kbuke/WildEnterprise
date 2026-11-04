export type ReviewLookup = {
  parkId: number
  bookingRef: string
  email: string
}

export type VerifyReviewResponse = { bookingName: string }
export type VerifiedBooking = ReviewLookup & { bookingName: string }

export type PostReview = ReviewLookup & {
  rating: number
  review: string
  reviewerName: string
}

export type ParkReview = {
  id: number
  reviewer_name: string
  review_img: string
  rating: number
  review: string
  review_date: string
}