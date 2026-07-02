import { useQuery } from "@tanstack/react-query";
import type { SiteType } from "../Types";

async function getSites(): Promise<SiteType[]> {
    const response = await fetch("/api/sites")

    if(!response.ok){
        throw new Error(`HTTP Error! Status ${response.status}`)
    }

    return response.json()
}

export function useFetchSites(){
    const {
        data = [],
        error,
        isError,
        isLoading
    } = useQuery<SiteType[], Error>({
        queryKey: ["sites"],
        queryFn: getSites
    })

    return{
        sites: data,
        error,
        isError,
        isLoading
    }
}