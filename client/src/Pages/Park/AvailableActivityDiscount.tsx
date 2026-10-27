import { useState } from "react";
import type { FormEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAllWeHotelBookings } from "../../features/HotelBookings/api";
import { GenericForm } from "../../components/form/GenericForm";
import type { AllWeHotelBookings, SpecificWeHotelBooking } from "../../features/HotelBookings/types";
import type { SpecificWeHotel } from "../../features/Hotels/types";

type AvailableActivityDiscountProps = {
    setCheckExsitingBooking: React.Dispatch<React.SetStateAction<boolean>>
    onClose: () => void
};

export function AvailableActivityDiscount({
    setCheckExsitingBooking
}: AvailableActivityDiscountProps) {
    const [bookingRef, setBookingRef] = useState("");
    const [confirmedBooking, setConfrimedBooking] = useState<boolean>(false)
    const [unfoundBooking, setUnfoundBooking] = useState<boolean>(false)
    const [usedBooking, setUsedBooking] = useState<SpecificWeHotelBooking[]>()

    const { data: allWeHotelBookings } = useQuery({
        queryKey: ["weBookings"],
        queryFn: fetchAllWeHotelBookings
    });

    console.log(allWeHotelBookings)

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const matchingBooking = allWeHotelBookings?.filter(
            (booking) => booking.booking_ref === bookingRef.trim()
        );

        console.log(matchingBooking)

        if (matchingBooking) {
            console.log("Got ya");
            setUsedBooking(matchingBooking)
            setConfrimedBooking(true)
            setCheckExsitingBooking(false);
        } else {
            console.log("No match");
            setUnfoundBooking(true)
        }
    };

    return (
        !confirmedBooking ?
            <form 
                onSubmit={onSubmit}
                className="bg-white h-auto w-[80%] rounded py-10 px-12"
            >
                <div
                    className="flex justify-between items-center"
                >
                    <h1>
                        Enter Booking Reference
                    </h1>

                    <button
                        className="bg-red-800 text-white px-10 py-2 rounded cursor-pointer"
                    >
                        Cancel
                    </button>
                </div>

                {unfoundBooking &&
                    <div
                        className="w-full text-white rounded bg-red-800 mt-10 text-center py-4 uppercase text-xl"
                    >
                        <p>
                            Booking Not Found, Please Try Again
                        </p>
                    </div>
                }

                <div className="flex flex-col pb-10 pt-4">
                    <label className="font-bold">
                        Enter your hotel booking reference
                    </label>

                    <input
                        placeholder="Hotel Booking Reference"
                        className="border-b mt-4"
                        value={bookingRef}
                        onChange={(e) => setBookingRef(e.target.value)}
                    />
                </div>

                <div className="flex gap-10 justify-end">
                    <button type="submit">
                        Find Booking
                    </button>

                    <button
                        type="button"
                        onClick={() => setCheckExsitingBooking(true)}
                    >
                        I don't have a booking
                    </button>
                </div>
            </form>
        : <GenericForm />
    );
}