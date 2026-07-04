import { useQuery } from "@tanstack/react-query";
import type { BlogType } from "../Types";

async function getSpecificBlog(id:number): Promise<BlogType> {
    const response = await fetch(`/api/blogs/${id}`)

    if(!response.ok){
        throw new Error(`HTTP Error! Status ${response.status}`)
    }

    return response.json()
}

export function useFetchSpecificBlog(id:number){
    const {
        data,
        error,
        isError,
        isLoading
    } = useQuery<BlogType, Error>({
        queryKey: ["blogs"],
        queryFn: () => getSpecificBlog(id)
    })

    return{
        blog: data,
        error,
        isError,
        isLoading
    }
}