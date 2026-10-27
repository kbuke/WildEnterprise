export type AllRooms = {
    id: number,
    base_price: number,
    hotel_id: number,
    img: string,
    max_people: number,
    name: string,
    no_of_rooms: number
}

export type PostRoom = {
    name: string,
    img: string,
    noOfRooms: string,
    maxPeople: string,
    basePrice: string,
    parkId: number
}