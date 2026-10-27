import { postInstance } from "../../api/client";
import type { AllRooms, PostRoom } from "./types";

export const postRoom = (newInfo: PostRoom) =>
    postInstance<PostRoom, AllRooms>("/api/rooms", newInfo)