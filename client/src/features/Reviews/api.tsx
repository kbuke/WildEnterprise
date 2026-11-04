import { fetchAllInstances, postInstance } from "../../api/client"
import type { ParkReview, PostReview, ReviewLookup, VerifyReviewResponse } from "./types"

export const fetchParkReviews = (parkId: number) =>
  fetchAllInstances<ParkReview[]>(`/api/reviews?parkId=${parkId}`)

export const verifyReviewBooking = (info: ReviewLookup) =>
  postInstance<ReviewLookup, VerifyReviewResponse>("/api/reviews/verify", info)

export const postReview = (info: PostReview) =>
  postInstance<PostReview, ParkReview>("/api/reviews", info)