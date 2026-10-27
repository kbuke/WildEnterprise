// features/ActivityBookings/types.ts
export type AllActivityBookings = {
    date: string
    no_of_people: number
    activity_id: number
    hotel_booking_id?: number
    partner_hotel_booking_id?: number
}

export type PostActivityBooking = {
    date: string
    noOfPeople: number
    activityId: number
    hotelBookingId?: number
    partnerHotelBookingId?: number
}