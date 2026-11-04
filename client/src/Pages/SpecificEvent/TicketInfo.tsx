import { useState } from "react"
import { PartySizeSelector } from "../../components/ui/PartySizeSelector"
import { ConfirmEventBooking } from "./ConfirmEventBooking"

type TicketInfoProps = {
    eventId: number,
    eventName: string
    price: number,
    ticketsRemaining: number
}

export function TicketInfo({
    eventId,
    eventName,
    price,
    ticketsRemaining
}: TicketInfoProps){
    const [partySize, setPartySize] = useState<number>(1)
    const [confirmBooking, setConfirmBooking] = useState<boolean>(false)

    const changePartySize = (size: number) => {
        setPartySize(size)
    }

    const ticketContainers = (
        header: string,
        header2: string,
        additionalText?: string
    ) => {
        return(
            <div
                className="flex flex-col text-center"
            >
                <h1
                    className="font-bold text-6xl"
                >
                    {header}
                </h1>

                <h1
                    className="text-4xl font-bold"
                >
                    {header2}
                </h1>

                <p
                    className="text-2xl"
                >
                    {additionalText}
                </p>
            </div>
        )
    }

    return(
        <div>
            <h1
                className="text-sunset uppercase font-bold text-4xl px-20 mb-6"
            >
                Book Your Tickets
            </h1>

            <div
                className="bg-coal py-4 px-20 text-white flex flex-col"
            >
                <div
                    className="grid grid-cols-3 gap-4"
                >
                    {ticketContainers(String(ticketsRemaining), "Tickets", "Remaining")}

                    {ticketContainers("ZAR", String(price), "Per Person")}

                    <PartySizeSelector 
                        partySize={partySize}
                        setIncreasePartySize={() => partySize < ticketsRemaining && changePartySize(partySize + 1)}
                        setDecreasePartySize={() => partySize > 1 && changePartySize(partySize - 1)}
                        titleHeader="text-center text-6xl"
                    />
                </div>

                <button
                    className="green-button self-center w-90 h-20 text-2xl font-bold uppercase"
                    onClick={() => setConfirmBooking(true)}
                >
                    Complete Booking
                </button>
            </div>

            {confirmBooking &&
                <ConfirmEventBooking 
                    eventId={eventId}
                    eventName={eventName}
                    price={price}
                    partySize={partySize}
                    onClose={() => setConfirmBooking(false)}
                />
            }
        </div>
    )
}