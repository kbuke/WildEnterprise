import { useCheckSession } from "../../../CustomHooks/useSession";
import type { CheckWeHotelAdminSessionType } from "../../../Types/HotelTypes/WeHotelTypes/WeHotelTypes";

export function WeHotelAdminDashboard(){
    const { data: hotel } = useCheckSession<CheckWeHotelAdminSessionType>("Hotel")

    if (!hotel) return null

    return(
        <section>
            Logged in as {hotel.name}
        </section>
    )
}