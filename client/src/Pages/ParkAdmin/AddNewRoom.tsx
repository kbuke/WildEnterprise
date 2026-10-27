import { useForm, type SubmitHandler } from "react-hook-form"
import type { PostRoom } from "../../features/Rooms/types"
import { GenericForm } from "../../components/form/GenericForm"
import { Inputs } from "../../components/ui/Inputs"
import { useMutation } from "@tanstack/react-query"
import { postRoom } from "../../features/Rooms/api"
import { queryClient } from "../../ReactQuery/queryClient"

type AddNewRoomProps = {
    parkName: string
    onClose: () => void,
    parkId: number
}

export function AddNewRoom({
    parkName,
    onClose,
    parkId
}: AddNewRoomProps){

    const {
        register,
        formState: {errors},
        handleSubmit,
        reset
    } = useForm<PostRoom>()

    const createRoom = useMutation({
        mutationFn: postRoom,
        onSuccess: () => {
            queryClient.invalidateQueries(
                {
                    queryKey: ["parks", parkId]
                }
            )
            reset()
            onClose()
        }
    })

    const onSubmit: SubmitHandler<PostRoom> = (data) => {
        const payload: PostRoom = {
            ...data,
            parkId
        }
        createRoom.mutate(payload)
    }

    return(
        <div
            className="w-full self-center justify-self-center"
        >
            <GenericForm 
                postOrPatch="Post"
                instance={`New Room Type to ${parkName}`}
                inputs={
                    <>
                        <Inputs 
                            placeholder="Please enter room type"
                            label="Room Type"
                            type="text"
                            error={errors.name?.message}
                            {...register("name", {
                                required: "Room name is required"
                            })}
                        />

                        <Inputs 
                            placeholder="Please enter room image"
                            label="Room Image"
                            type="text"
                            error={errors.img?.message}
                            {...register("img", {
                                required: "Room image is required"
                            })}
                        />

                        <Inputs 
                            placeholder="Please enter the number of rooms of this type"
                            label="Number of rooms"
                            type="text"
                            error={errors.noOfRooms?.message}
                            {...register("noOfRooms", {
                                required: "Number of rooms available must be given"
                            })}
                        />

                        <Inputs 
                            placeholder="Please enter the maximum amount of guests in this room"
                            label="Number of guests"
                            type="text"
                            error={errors.maxPeople?.message}
                            {...register("maxPeople", {
                                required: "Max number of guests must be given"
                            })}
                        />

                        <Inputs 
                            placeholder="Please enter the base price of this room"
                            label="Room Base Price (ZAR/night)"
                            type="text"
                            error={errors.basePrice?.message}
                            {...register("basePrice", {
                                required: "Must give base price per night"
                            })}
                        />
                    </>
                }
                onClose={onClose}
                onSubmit={handleSubmit(onSubmit)}
            />
        </div>
    )

}