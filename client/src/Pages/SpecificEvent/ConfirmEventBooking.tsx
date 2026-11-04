import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import { GenericForm } from "../../components/form/GenericForm"
import { PopUp } from "../../components/ui/Popup"
import { Inputs } from "../../components/ui/Inputs"
import { Checkbox } from "../../components/ui/Checkbox"
import { postEventBooking } from "../../features/EventBookings/api"
import { formatZAR } from "../../components/dates/dates"

type Props = {
    eventId: number
    eventName: string
    price: number
    partySize: number
    onClose: () => void
}

type Values = {
    name: string
    email: string
    sendTicketsToAll: boolean
    guests: { name: string; email: string }[]    // guests 2..N
}

export function ConfirmEventBooking({ eventId, eventName, price, partySize, onClose }: Props) {
    const queryClient = useQueryClient()

    const { register, handleSubmit, watch, formState: { errors } } = useForm<Values>({
        defaultValues: {
            sendTicketsToAll: false,
            guests: Array.from({ length: partySize - 1 }, () => ({ name: "", email: "" })),
        },
    })

    const separate = watch("sendTicketsToAll") && partySize > 1

    const { mutate, isPending, error, data: booked } = useMutation({
        mutationFn: postEventBooking,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["events"] }),   // refresh remaining count
    })

    const onSubmit = handleSubmit((v) => {
        const you = { name: v.name.trim(), email: v.email.trim() }
        mutate({
            eventId,
            name: you.name,
            email: you.email,
            sendTicketsToAll: separate,
            attendees: [
                you,
                ...v.guests.map((g) => ({
                    name: g.name.trim(),
                    email: separate ? g.email.trim() : undefined,
                })),
            ],
        })
    })

    if (booked) {
        return (
            <PopUp
                child={
                    <div className="bg-white rounded p-10 w-[45%] text-center">
                        <h1 className="font-bold text-3xl mb-4">You're booked in!</h1>
                        <p>{booked.no_of_people} ticket{booked.no_of_people > 1 && "s"} for {booked.event_name}</p>
                        <p className="mt-2">Booking reference: <strong>{booked.booking_ref}</strong></p>
                        <p className="mt-4">
                            {booked.send_tickets_to_all
                                ? "Each guest has been emailed their own QR ticket. Your email also has your booking reference."
                                : booked.no_of_people > 1
                                    ? `One email with ${booked.no_of_people} QR codes is on its way to ${booked.email}. Forward each code to the right guest.`
                                    : `Your QR ticket is on its way to ${booked.email}.`}
                        </p>
                        {booked.tickets.some((t) => t.email_status === "Failed") && (
                            <p className="mt-2 text-red-600">
                                Some emails failed to send. Please contact us with your booking reference.
                            </p>
                        )}
                        <p className="mt-4 text-sm">
                            Need to cancel? <Link to="/managebooking" className="underline">Manage your booking</Link>
                        </p>
                        <button
                            onClick={onClose}
                            className="mt-6 bg-green-800 text-white px-10 py-2 rounded cursor-pointer"
                        >
                            Close
                        </button>
                    </div>
                }
            />
        )
    }

    return (
        <PopUp
            child={
                <GenericForm
                    postOrPatch="Post"
                    instance="Booking"
                    title={`Book ${eventName}`}
                    submitLabel="Confirm booking"
                    onSubmit={onSubmit}
                    onClose={onClose}
                    isPending={isPending}
                    errorMessage={error?.message}
                    inputs={
                        <div className="text-black">
                            <p className="mb-6 font-bold text-xl">
                                {partySize} ticket{partySize > 1 && "s"} · {formatZAR(price * partySize)}
                            </p>

                            <Inputs
                                label="Your name (guest 1)"
                                error={errors.name?.message}
                                {...register("name", { required: "Your name is required" })}
                            />

                            <Inputs
                                label="Your email"
                                type="email"
                                error={errors.email?.message}
                                {...register("email", {
                                    required: "Your email is required",
                                    pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" },
                                })}
                            />

                            {partySize > 1 && (
                                <>
                                    <Checkbox
                                        variableName="sendTicketsToAll"
                                        register={register}
                                        label="Email each guest their own ticket"
                                    />
                                    <p className="-mt-6 mb-8 text-sm opacity-70">
                                        {separate
                                            ? "Every guest receives their own QR code by email."
                                            : "All QR codes are sent to your email and you pass them on."}
                                    </p>

                                    {Array.from({ length: partySize - 1 }, (_, i) => (
                                        <div key={i} className="border rounded p-4 mb-6">
                                            <p className="font-bold mb-2">Guest {i + 2}</p>
                                            <Inputs
                                                label="Name"
                                                error={errors.guests?.[i]?.name?.message}
                                                {...register(`guests.${i}.name` as const, {
                                                    required: `Guest ${i + 2}'s name is required`,
                                                })}
                                            />
                                            {separate && (
                                                <Inputs
                                                    label="Email"
                                                    type="email"
                                                    error={errors.guests?.[i]?.email?.message}
                                                    {...register(`guests.${i}.email` as const, {
                                                        required: `Guest ${i + 2}'s email is required`,
                                                        pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" },
                                                    })}
                                                />
                                            )}
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>
                    }
                />
            }
        />
    )
}