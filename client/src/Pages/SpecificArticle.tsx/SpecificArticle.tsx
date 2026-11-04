import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { fetchSpecificArticle } from "../../features/Articles/api"

export function SpecificArticle(){
    const {id} = useParams()

    const {data: specificArticle} = useQuery({
        queryKey: ["articles"],
        queryFn: () => fetchSpecificArticle(Number(id))
    })

    console.log(specificArticle)
    return(
        <section>

        </section>
    )
}