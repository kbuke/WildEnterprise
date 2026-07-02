import { useFetchSites } from "../../../Hooks/useFetchSites"

export function Sites(){
    const {
        sites,
        isError,
        error,
        isLoading
    } = useFetchSites()

    console.log(sites)
    return(
        <section>
            
        </section>
    )
}