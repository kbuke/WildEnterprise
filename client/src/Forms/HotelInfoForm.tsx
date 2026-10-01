import { Inputs } from "../CustomComponents/Inputs";
import { TextArea } from "../CustomComponents/TextArea";
import { DropDown } from "../CustomComponents/DropDown";
import { BaseForm } from "../CustomComponents/BaseForm";
import { useAllParks } from "../FetchInstances/FetchParks";
import type { PostBaseHotelType } from "../Types/HotelTypes/BaseHotelType";

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

    if (isLoading) return <div>Loading Parks...</div>
    if (error) return <div>{error.message}</div>

    const isPartner = hotelType === "Partner"

    return(
        <BaseForm<PostBaseHotelType>
            action={action === "Post" ? "Add" : "Edit"}
            title={isPartner ? "Partner Hotel" : "WildEnterprise Hotel"}
            onClose={onClose}
            endpoint={isPartner ? "hotels/partner" : "hotels/wildenterprise"}
            queryKeys={[isPartner ? ["hotels", "partner"] : ["hotels", "wildenterprise"]]}
        >
            {({ register, formState: { errors } }) => (
                <>
                    <Inputs
                        props={[
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
                        ]}
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
                            required: "Please select a park",
                            valueAsNumber: true
                        })}
                        error={errors.parkId}
                    />
                </>
            )}
        </BaseForm>
    )
}