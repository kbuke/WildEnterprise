import { useQuery } from "@tanstack/react-query"
import type { FetchSpecificParkType } from "../Types/ParkTypes/ParkTypes"
import { fetchInstance } from "../Requests/fetchInstance"



export function useSpecificPark(id: number | undefined){
    return useQuery<FetchSpecificParkType, Error>({
        queryKey: ["parks", id],
        queryFn: () => fetchInstance<FetchSpecificParkType>(`/parks/${id}`),
        enabled: id != undefined
    })
}