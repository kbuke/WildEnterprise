import { useQuery } from "@tanstack/react-query";
import type { SiteType } from "../Types";

async function getSpecificSite(id:number): Promise<SiteType> {
    const response = await fetch(`/api/sites/${id}`)

    if(!response.ok){
        throw new Error(`HTTP Error! Status ${response.status}`)
    }

    return response.json()
}

export function useFetchSpecificSite(id:number){
    const {
        data,
        error,
        isError,
        isLoading
    } = useQuery<SiteType, Error>({
        queryKey: ["sites"],
        queryFn: () => getSpecificSite(id)
    })

    return{
        site: data,
        error, 
        isError,
        isLoading
    }
}