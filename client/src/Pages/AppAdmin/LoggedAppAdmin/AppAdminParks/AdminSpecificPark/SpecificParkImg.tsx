import { useState } from "react"
import type { FetchAllParkImgType } from "../../../../../Types/ParkTypes/ParkImgType"
import { ParkImgForm } from "../../../../../Forms/ParkImgForm"

type SpecificParkImagesType = {
    images: FetchAllParkImgType[]
    id: number
}

export function SpecificParkImg({images, id}: SpecificParkImagesType){
    const [addImg, setAddImg] = useState<boolean>(false)

    console.log(images)
    return(
        <div
            className="flex flex-col"
        >
            {addImg === false
                ? <>
                    <button
                        className="mt-4 self-center bg-green-600 text-white px-4 rounded w-40 h-12 cursor-pointer"
                        onClick={() => setAddImg(!addImg)}
                    >
                        Add Image
                    </button>

                    {images.length === 0
                        ? <p
                            className="text-center mt-2 font-bold"
                        >
                            No images yet, please upload above
                        </p>
                        : <div
                            className="mt-4 px-4 grid grid-cols-4 gap-4 justify-center"
                        >
                            {images.map((img, index) => (
                                <img 
                                    src={img.img}
                                    key={index}
                                    className="rounded h-50 border cursor-pointer"
                                />
                            ))}
                        </div>
                    }
                </>
                : <ParkImgForm 
                    onClose={() => setAddImg(!addImg)}
                    parkId={id}
                />
            }
        </div>
    )
}