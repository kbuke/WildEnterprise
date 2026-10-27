import { fetchAllInstances, postInstance } from "../../api/client";
import type { SpecificActivity, AllActivities, PostActivity } from "./types";

export const fetchAllActivities = () => fetchAllInstances<AllActivities>("/api/activities")
export const fetchSpecificActivity = (id: number) => fetchAllInstances<SpecificActivity>(`/api/activities/${id}`)

export const postActivity = (newInfo: PostActivity) =>
    postInstance<PostActivity, AllActivities>("/api/activities", newInfo)