// api.ts
import { postInstance } from "../../api/client"
import type {
    BookingLookup, CancelResult, CancelTickets, EventBooking, PostEventBooking
} from "./types"

export const postEventBooking = (info: PostEventBooking) =>
    postInstance<PostEventBooking, EventBooking>("/api/eventbookings/create", info)

export const lookupEventBooking = (info: BookingLookup) =>
    postInstance<BookingLookup, EventBooking>("/api/eventbookings/lookup", info)

export const cancelEventTickets = (info: CancelTickets) =>
    postInstance<CancelTickets, CancelResult>("/api/eventbookings/cancel", info)