
import type { PostParkType } from "../Types/ParkTypes/ParkTypes"
import { BaseForm } from "../CustomComponents/BaseForm"
import { Inputs } from "../CustomComponents/Inputs"
import { TextArea } from "../CustomComponents/TextArea"
import { DropDown } from "../CustomComponents/DropDown"

type ParkInfoForm = {
    action: "Post" | "Patch"
    onClose: () => void
}

export function ParkInfoForm({
    action,
    onClose
}: ParkInfoForm){

    const allowedLocations = [
        "Eastern Cape",
        "Free State",
        "Gauteng",
        "KwaZulu-Natal",
        "Limpopo",
        "Mpumalanga",
        "North West",
        "Western Cape"
    ]

    return(
        <BaseForm<PostParkType>
            action={action == "Post" ? "Add" : "Edit"}
            title="Park"
            onClose={onClose}
            endpoint={"/parks"}
            queryKeys={[["parks"]]}
        >
            {({register, formState: {errors}}) => (
                <>
                    <Inputs 
                        props = {[
                            {
                                textType: "text",
                                label: "Park Name",
                                placeholder: "Please enter park name",
                                register: register("name", {
                                    required: "Park Name is required"
                                }),
                                error: errors.name
                            },

                            {
                                textType: "text",
                                label: "Park Image",
                                placeholder: "Please enter park image",
                                register: register("img", {
                                    required: "Park image is required"
                                }),
                                error: errors.img
                            },
                        ]}
                    />

                    <TextArea 
                        placeholder="Enter Info About Park"
                        label="Park Info"
                        extraClasses="h-30"
                        register={register("info", {
                            required: "Please enter park info"
                        })}
                        error={errors.info}
                    />

                    <DropDown 
                        propArray={allowedLocations}
                        label="Park Location"
                        disabledOption="Select a location"
                        register={register("location", {
                            required: "Please select a location"
                        })}
                        error={errors.location}
                    />
                </>
            )}
        </BaseForm>
    )
}