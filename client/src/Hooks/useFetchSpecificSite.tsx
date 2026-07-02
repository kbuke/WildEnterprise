import type { SiteType } from "../Types";

async function getSpecificSite(id:number): Promise<SiteType> {
    const response = await fetch(`/api/sites/${id}`)

    if(!response.ok){
        throw new Error(`HTTP Error! Status ${response.status}`)
    }

    return response.json()
}