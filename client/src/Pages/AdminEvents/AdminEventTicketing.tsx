import { AdminInfoCard } from "../../components/admin/AdminInfoCard"

type AdminTicketingProps = {
    noOfTickets: number,
    ticketPrice: number,
    ticketSold: number
}

export function AdminEventTicketing({
    noOfTickets,
    ticketPrice,
    ticketSold
}: AdminTicketingProps){

    const eventTicketCardArray = [
        {
            mainInfo: noOfTickets,
            topSubHeader: "Tickets to Sell:",
            bottomSubHeader: "This is the total number of tickets we have for event"
        },
        {
            mainInfo: ticketPrice,
            topSubHeader: "ZAR",
            bottomSubHeader: "Ticket Price Per Person"
        },
        {
            mainInfo: noOfTickets - ticketSold,
            topSubHeader: "Remaining Tickets",
            bottomSubHeader: `So far we have sold ${ticketSold} tickets, raising ZAR ${ticketSold * ticketPrice}`
        }
    ]
    return(
        <div
            className="py-4"
        >
            <h1
                className="font-bold text-4xl text-sunset uppercase"
            >
                Ticket Info
            </h1>

            <div
                className="grid grid-cols-3 gap-4 py-10"
            >
                {eventTicketCardArray.map((cardInfo, index) => {
                    return(
                        <AdminInfoCard 
                            key={index}
                            mainInfo={cardInfo.mainInfo}
                            topSubHeader={cardInfo.topSubHeader}
                            bottomSubHeader={cardInfo.bottomSubHeader}
                        />
                    )
                })}
            </div>
        </div>
    )
}