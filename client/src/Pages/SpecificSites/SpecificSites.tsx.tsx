import { useParams } from "react-router-dom"
import { useFetchSites } from "../../Hooks/useFetchSites"
import type { ParamsType } from "../../Types"
import { useFetchSpecificSite } from "../../Hooks/useFetchSpecificSite"

export function SpecificSites(){
    const {slug, id} = useParams<ParamsType>()

    const siteId = Number(id)

    const {
        site,
        error,
        isError,
        isLoding
    } = useFetchSpecificSite(siteId)

    console.log(site)

    console.log(id)
    return(
        <section>
            <h1>Heloooooooo</h1>
        </section>
    )
}