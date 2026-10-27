import { postInstance } from "../../api/client";
import type { AllActivityBookings, PostActivityBooking } from "./types";

// features/ActivityBookings/api.ts
export const postActivityBooking = (newInfo: PostActivityBooking) =>
    postInstance<PostActivityBooking, AllActivityBookings>("/api/activities/bookings", newInfo)