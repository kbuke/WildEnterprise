import { useState } from "react"
import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { GenericForm } from "../../components/form/GenericForm"
import { postHotelBooking } from "../../features/HotelBookings/api"
import { ApiError } from "../../api/client"
import type { AvailabilityQuery, RoomChoice } from "../../features/Availability/types"
import { formatShort, formatZAR } from "../../components/dates/dates"
import { Inputs } from "../../components/ui/Inputs"

type Props = {
  choices: RoomChoice[]
  total: number
  query: AvailabilityQuery
  onClose: () => void
}
type FormValues = { name: string; email: string }

export function BookingForm({ choices, total, query, onClose }: Props) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [serverError, setServerError] = useState<string>()
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>()

  const mutation = useMutation({
    mutationFn: postHotelBooking,
    onSuccess: (booking) => {
      queryClient.invalidateQueries({ queryKey: ["availability"] })
      navigate("/successfulhotelbooking", { state: { booking } })
    },
    onError: (err) => {
      setServerError(err.message)
      // e.g. someone else took the room: refresh availability behind the popup
      if (err instanceof ApiError && err.status === 400) {
        queryClient.invalidateQueries({ queryKey: ["availability"] })
      }
    },
  })

  const onValid = (values: FormValues) => {
    setServerError(undefined)
    mutation.mutate({
      parkId: query.parkId,
      arrival: query.arrival,
      departure: query.departure,
      guests: query.partySize,
      name: values.name,
      email: values.email,
      rooms: choices.map(c => ({ roomId: c.room.id, quantity: c.quantity })),
    })
  }

  return (
    <GenericForm
      postOrPatch="Post"
      instance="Booking"
      title="Complete your booking"
      submitLabel="Confirm booking"
      onSubmit={handleSubmit(onValid)}
      onClose={onClose}
      isPending={mutation.isPending}
      errorMessage={serverError}
      inputs={
        <div className="flex flex-col gap-4 mb-4 text-black">
          <div className="bg-gray-400 rounded p-4 text-white">
            {choices.map(({ room, quantity, stay_price }) => (
              <p key={room.id} className="flex justify-between">
                <span>{quantity} × {room.name}</span>
                <span>{formatZAR(quantity * stay_price)}</span>
              </p>
            ))}
            <p className="mt-2">
              {formatShort(query.arrival)} → {formatShort(query.departure)} · {query.partySize} guest{query.partySize > 1 && "s"}
            </p>
            <p className="font-bold text-xl mt-2">Total: {formatZAR(total)}</p>
          </div>

          <Inputs
            label="Full Name"
            placeholder="Primary Guests Name"
            type="text"
            error={errors.name?.message}
            {...register("name", { required: "Name is required" })}
          />

          <Inputs
            label="Email Address"
            placeholder="Primary Guests Email"
            type="email"
            error={errors.email?.message}
            {...register("email", { required: "Email is required" })}
          />
        </div>
      }
    />
  )
}