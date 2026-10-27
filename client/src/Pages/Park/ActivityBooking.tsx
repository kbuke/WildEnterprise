import { useQuery } from "@tanstack/react-query";
import { GenericForm } from "../../components/form/GenericForm";
import { fetchSpecificActivity } from "../../features/Activities/api";
import { useState } from "react";
import { AvailableActivityDiscount } from "./AvailableActivityDiscount";

type ActivityFormProps = {
    activityId: number,
    onClose: (() => void)
}

export function ActivityBooking({
    activityId,
    onClose
}: ActivityFormProps){

    const [checkExistingBooking, setCheckExsitingBooking] = useState<boolean>(true)
    const [existingBooking, setExistingBooking] = useState<string>()
    
    const {data: specificActivity, isLoading, isError} = useQuery({
        queryKey: ["activities", activityId],
        queryFn: () => fetchSpecificActivity(activityId)
    })
    console.log(specificActivity)

    if(isError || !specificActivity) return <p>Error</p>

    const {
        free_with_stay,
        discount_with_stay
    } = specificActivity

    return (
        (free_with_stay || discount_with_stay) && checkExistingBooking ?
            <AvailableActivityDiscount 
                setCheckExsitingBooking={setCheckExsitingBooking}
                onClose={() => setCheckExsitingBooking(false)}
            /> :
            <GenericForm 
                onClose={onClose}
            />

    )
}


// import { useState } from "react"
// import { useForm } from "react-hook-form"
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
// import { fetchSpecificActivity } from "../../features/Activities/api"
// import { fetchHotelStayByRef } from "../../features/HotelBookings/api"
// import { postActivityBooking } from "../../features/ActivityBookings/api"
// import { LocalCheckbox } from "../../components/ui/Checkbox"
// import { Inputs } from "../../components/ui/Inputs"
// import { GenericForm } from "../../components/form/GenericForm"
// import { BookingRef } from "./BookingRef"

// type ActivityBookingProps = {
//     activityId: number
//     onClose: () => void
// }

// type BookingFormValues = {
//     date: string
//     noOfPeople: number
// }

// export function ActivityBooking({ activityId, onClose }: ActivityBookingProps) {
//     const queryClient = useQueryClient()
//     const [isStaying, setIsStaying] = useState(false)
//     const [lookupRef, setLookupRef] = useState("")
//     const [stayError, setStayError] = useState<string>()

//     const { register, handleSubmit, watch, formState: { errors } } = useForm<BookingFormValues>()

//     const { data: activity, isError, isLoading } = useQuery({
//         queryKey: ["activities", activityId],
//         queryFn: () => fetchSpecificActivity(activityId),
//     })

//     const { data: foundStay, isFetching: isLookingUp, isError: refNotFound } = useQuery({
//         queryKey: ["hotel-stay", lookupRef],
//         queryFn: () => fetchHotelStayByRef(lookupRef),
//         enabled: isStaying && lookupRef !== "",
//         retry: false,
//     })

//     const { mutate, isPending, error } = useMutation({
//         mutationFn: postActivityBooking,
//         onSuccess: () => {
//             queryClient.invalidateQueries({ queryKey: ["activities"] })
//             onClose()
//         },
//     })

//     const people = Number(watch("noOfPeople")) || 0

//     if (isLoading) return <p>Loading...</p>
//     if (isError || !activity) return <p>Error</p>

//     const {
//         name,
//         price,
//         all_year_round,
//         available_months,
//         free_with_stay,
//         discount_with_stay,
//         stay_discount,
//         park_id,
//     } = activity

//     const stay = isStaying ? foundStay : undefined
//     const wrongPark = !!stay && stay.parkId !== park_id
//     const validStay = stay && !wrongPark ? stay : undefined
//     const hasStayDeal = free_with_stay || discount_with_stay

//     // Same formula as the backend, for a live preview only (the server decides the real price)
//     const eligible = validStay ? Math.min(people, validStay.guests) : 0
//     const rate = free_with_stay ? 0 : discount_with_stay && stay_discount ? 1 - stay_discount : 1
//     const estimate = price * (eligible * rate + (people - eligible))

//     const onSubmit = handleSubmit((data) => {
//         if (isStaying && !validStay) {
//             setStayError("Enter a valid booking reference for a stay at this park")
//             return
//         }
//         setStayError(undefined)

//         mutate({
//             date: data.date,
//             noOfPeople: data.noOfPeople,
//             activityId,
//             hotelBookingId: validStay?.id,
//         })
//     })

//     return (
//         <GenericForm
//             postOrPatch="Post"
//             instance={`Booking for ${name}`}
//             onSubmit={onSubmit}
//             onClose={onClose}
//             isPending={isPending}
//             errorMessage={stayError ?? error?.message}
//             inputs={
//                 <>
//                     {hasStayDeal && (
//                         <LocalCheckbox
//                             variableName="isStaying"
//                             label="Are you booked to stay with us?"
//                             checked={isStaying}
//                             onChange={setIsStaying}
//                         />
//                     )}

//                     {isStaying && (
//                         <>
//                             <BookingRef
//                                 onSearch={setLookupRef}
//                                 isLoading={isLookingUp}
//                                 found={!!stay && !wrongPark}
//                                 notFound={refNotFound && lookupRef !== ""}
//                             />
//                             {wrongPark && (
//                                 <p className="text-red-600">
//                                     That booking is at a different park, so the stay deal doesn't apply.
//                                 </p>
//                             )}
//                         </>
//                     )}

//                     <Inputs
//                         label="Date"
//                         type="date"
//                         min={validStay?.arrival}
//                         max={validStay?.departure}
//                         error={errors.date?.message}
//                         {...register("date", {
//                             required: "Date is required",
//                             validate: (value) => {
//                                 const month = Number(value.slice(5, 7))
//                                 if (!all_year_round && !available_months?.includes(month)) {
//                                     return "This activity isn't available in that month"
//                                 }
//                                 if (validStay && (value < validStay.arrival || value > validStay.departure)) {
//                                     return `Your stay is ${validStay.arrival} to ${validStay.departure}`
//                                 }
//                                 return true
//                             },
//                         })}
//                     />

//                     <Inputs
//                         label="Number of People"
//                         type="number"
//                         min={1}
//                         error={errors.noOfPeople?.message}
//                         {...register("noOfPeople", {
//                             required: "Required",
//                             valueAsNumber: true,
//                             min: { value: 1, message: "Must be at least 1" },
//                         })}
//                     />

//                     {validStay && people > validStay.guests && (
//                         <p className="text-sm">
//                             Your stay is booked for {validStay.guests}{" "}
//                             {validStay.guests === 1 ? "guest" : "guests"}, so only{" "}
//                             {validStay.guests} of your party get the stay deal. The rest pay full price.
//                         </p>
//                     )}

//                     {people > 0 && (
//                         <p className="font-bold mt-2">Estimated total: R{estimate.toFixed(2)}</p>
//                     )}
//                 </>
//             }
//         />
//     )
// }