import { useForm } from "react-hook-form";
import { Inputs } from "../CustomComponents/Inputs";
import { FormHeadings } from "./FormHeadings";
import type { PostBaseHotelType } from "../Types/HotelTypes/BaseHotelType";
import { TextArea } from "../CustomComponents/TextArea";
import { useAllParks } from "../FetchInstances/FetchParks";
import { DropDown } from "../CustomComponents/DropDown";
import { usePostInsatnce } from "../CustomHooks/usePostInstance";

type HotelFormType = {
    action: "Post" | "Patch"
    onClose: () => void
    hotelType: "Partner" | "WildEnterprise"
}

export function HotelInfoForm({
    onClose,
    action,
    hotelType
}: HotelFormType){

    const {
        data: parks,
        isLoading,
        error
    } = useAllParks()

    console.log(parks)

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm<PostBaseHotelType>()

    const postHotel = usePostInsatnce<PostBaseHotelType>()

    if (isLoading) return <div>Loading Parks...</div>
    if (error) return <div>{error.message}</div>

     const endpoint = hotelType === "Partner"
        ? "hotels/partner"
        : "hotels/wildenterprise"
    
    const queryKey = hotelType === "Partner"
        ? ["hotels", "partner"]
        : ["hotels", "wildenterprise"]

    const onSubmit = (values: PostBaseHotelType) => {
        postHotel.mutate(
            {
                endpoint,
                values,
                queryKeys: [queryKey]
            },
            {
                onSuccess: () => {
                    reset()
                    onClose()
                }
            }
        )
    }

    return(
        <form
            className="bg-white w-[95%] h-[80%] self-center rounded overflow-y-auto"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
        >
            <FormHeadings 
                action={action === "Post" ? "Add" : "Edit"}
                title={hotelType === "Partner" ? "Partner Hotel" : "WildEnterprise Hotel"}
                onClose={onClose}
            />

            <div
                className="py-4 px-80"
            >
                <Inputs 
                    props={
                        [
                            {
                                textType: "text",
                                label: "Hotel Name",
                                placeholder: "Enter Hotel Name",
                                register: register("name", {
                                    required: "Hotel Name is required"
                                }),
                                error: errors.name
                            },

                            {
                                textType: "text",
                                label: "Hotel Image",
                                placeholder: "Please enter hotel image",
                                register: register("img", {
                                    required: "Hotel image is required"
                                }),
                                error: errors.img
                            },

                            {
                                textType: "email",
                                label: "Hotel Email Address",
                                placeholder: "Please enter hotel email address",
                                register: register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Please enter a valid email address"
                                    }
                                }),
                                error: errors.email
                            },

                            {
                                textType: "password",
                                label: "Hotel Password",
                                placeholder: "Please enter hotel password",
                                register: register("password", {
                                    required: "Please enter password"
                                }),
                                error: errors.password
                            }
                        ]
                    }
                />

                <TextArea 
                    placeholder="Enter Hotel Intro"
                    label="Hotel Intro"
                    extraClasses="h-30"
                    register={register("info", {
                        required: "Please enter hotel info"
                    })}
                    error={errors.info}
                />

                <DropDown 
                    propArray={parks ?? []}
                    label="Select Park"
                    disabledOption="Select a park"
                    register={register("parkId", {
                        required: "Please select a park"
                    })}
                />

                <button
                    className="bg-green-800 text-white px-4 rounded h-12 w-30 cursor-pointer"
                    type="submit"
                >
                    {action === "Post" ? "Add Hotel" : "Edit Hotel"}
                </button>
            </div>
        </form>
    )
}