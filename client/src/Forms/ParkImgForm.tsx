import { BaseForm } from "../CustomComponents/BaseForm";
import { Inputs } from "../CustomComponents/Inputs";
import type { PostParkImgType } from "../Types/ParkTypes/ParkImgType";

type AddParkimgType = {
    onClose: () => void
    parkId: number
}

export function ParkImgForm({
    onClose,
    parkId
}: AddParkimgType){
    return(
        <BaseForm<PostParkImgType>
            action="Add"
            title="Park Img"
            onClose={onClose}
            endpoint="/parkimg"
            queryKeys={[["parks"]]}    
            defaultValues={{parkId}}
        >
            {({register, formState: {errors}}) => (
                <>
                    <Inputs 
                        props = {[
                            {
                                textType: "text",
                                label: "Park Image",
                                placeholder: "Please enter park image",
                                register: register("img", {
                                    required: "Park image must be given"
                                }),
                                error: errors.img
                            }
                        ]}
                    />
                </>
            )}
        </BaseForm>
    )
}