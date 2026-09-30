import { useQuery } from "@tanstack/react-query";
import { fetchInstance } from "../Requests/fetchInstance";
import type { FetchAllParkType } from "../Types/ParkTypes/ParkTypes";

export function useAllParks(){
    return useQuery<FetchAllParkType[], Error>({
        queryKey: ["parks"],
        queryFn: () => fetchInstance<FetchAllParkType[]>("/parks"),
    })
}