// FetchInstances/FetchHotels.ts
import { useQuery } from "@tanstack/react-query";
import { fetchInstance } from "../Requests/fetchInstance";
import type { FetchAllWeHotelType } from "../Types/HotelTypes/WeHotelTypes/WeHotelTypes";

export function useAllHotels(){
    return useQuery<FetchAllWeHotelType[], Error>({
        queryKey: ["hotels", "wildenterprise"],
        queryFn: () => fetchInstance<FetchAllWeHotelType[]>("hotels/wildenterprise"),
    })
}