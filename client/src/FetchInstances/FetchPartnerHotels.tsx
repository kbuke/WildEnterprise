import { useQuery } from "@tanstack/react-query";
import { fetchInstance } from "../Requests/fetchInstance";
import type { FetchAllPartnerHotelType } from "../Types/HotelTypes/PartnerHotelTypes/PartnerHotelType";


export function useAllPartnerHotels(){
    return useQuery<FetchAllPartnerHotelType[], Error>({
        queryKey: ["hotels", "partner"],
        queryFn: () => fetchInstance<FetchAllPartnerHotelType[]>("hotels/partner"),
    })
}