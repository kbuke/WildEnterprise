import { fetchAllInstances, postInstance } from "../../api/client";
import { type PostPark, type AllParks, type SpecificPark } from "./types";

export const fetchAllParks = () => fetchAllInstances<AllParks[]>("/api/parks")
export const fetchSpecificPark = (id: number | string) => fetchAllInstances<SpecificPark>(`/api/parks/${id}`)

export const postPark = (newInfo: PostPark) => 
    postInstance<PostPark, AllParks>("/api/parks", newInfo)