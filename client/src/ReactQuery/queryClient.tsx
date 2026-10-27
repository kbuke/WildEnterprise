import { QueryCache, QueryClient } from "@tanstack/react-query";

function errorHandler(errorMessage: string){
    return(
        console.error(`Error: ${errorMessage}`)
    )
}

export const queryClient = new QueryClient({
    queryCache: new QueryCache({
        onError: (error) => {
            errorHandler(error.message)
        }
    })
})