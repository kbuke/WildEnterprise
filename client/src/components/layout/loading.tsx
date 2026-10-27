import { useIsFetching } from "@tanstack/react-query";

export function Loading(){
    const isFetching = useIsFetching()
    const display = isFetching? "inherit" : "none"

    console.log("isFetching", isFetching)

    return(
        isFetching? <p>Loading...</p> : null
    )
}