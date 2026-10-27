import { fetchAllInstances, postInstance } from "../../api/client";
import type { AllWeHotelBookings, HotelBookingResponse, HotelStay, PostHotelBooking } from "./types";

export const fetchAllWeHotelBookings = () =>
    fetchAllInstances<AllWeHotelBookings[]>("/api/hotels/bookings")

export const fetchHotelStayByRef = (ref: string) =>
    fetchAllInstances<HotelStay>(`/api/hotels/bookings/lookup/${encodeURIComponent(ref)}`)

export const postHotelBooking = (info: PostHotelBooking) =>
    postInstance<PostHotelBooking, HotelBookingResponse>("/api/hotels/bookings", info)