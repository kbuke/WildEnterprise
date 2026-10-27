import { fetchAllInstances, postInstance } from "../../api/client";
import type { SpecificEvent, AllEvents, PostEvent } from "./types";

export const fetchAllEvents = () => fetchAllInstances<AllEvents[]>("/api/events")
export const fetchSpecificEvent = (id: number) => fetchAllInstances<SpecificEvent>(`/api/events/${id}`)

export const postEvent = (newInfo: PostEvent) => 
    postInstance<PostEvent, AllEvents>("/api/events", newInfo)