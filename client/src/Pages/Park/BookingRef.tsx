import { useQuery } from "@tanstack/react-query";
import { Inputs } from "../../components/ui/Inputs";
import { fetchAllWeHotelBookings } from "../../features/HotelBookings/api";
import { useState } from "react";

export function BookingRef(){
    const [bookingRef, setBookingRef] = useState<string>("")

    const {data: allWeHotelBookings, isLoading, isError} = useQuery({
        queryKey: ["WeHotel"],
        queryFn: fetchAllWeHotelBookings
    })

    if(isError || !allWeHotelBookings) return <p>Error...</p>

    console.log(allWeHotelBookings)

    const filterBookings = allWeHotelBookings.filter(booking => booking.booking_ref === bookingRef)

    // const filterBookings = (ref: string) => {
    //     return allWeHotelBookings.filter(booking => booking.booking_ref === ref)
    // }

    console.log(filterBookings)
    return(
        <div
            className="mt-4"
        >
            <div>
                <label>
                    Enter Booking Reference:
                </label>

                <input 
                    className="w-full border-b"
                    placeholder="Enter booking reference"
                    onChange={(e) => setBookingRef(e.target.value)}
                />
            </div>

            <button
                type="button"
                className="bg-green-800 text-white rounded cursor-pointer mt-4 px-10 py-2"
                onClick={() => filterBookings(bookingRef)}
            >
                Enter
            </button>

            {bookingRef === "" && <p></p>}

            {bookingRef !== "" && filterBookings.length === 0 &&
                <p>
                    Reference not found
                </p>
            }

            {bookingRef !== "" && filterBookings.length !== 0 &&
                <p>
                    Reference  found
                </p>
            }
        </div>
    )
}