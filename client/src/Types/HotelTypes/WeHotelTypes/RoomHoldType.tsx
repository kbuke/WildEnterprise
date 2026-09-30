import type { FetchAllRoomType } from "./RoomType"

export type FetchAllRoomHoldType = {
    id: number
    quentity: number
    arrival_date: Date
    departure_date: Date
    session_token: string
    expires_at: Date
    room_id: number
}

export type FetchSpecificRoomHoldType = {
    room: FetchAllRoomType
}& FetchAllRoomHoldType