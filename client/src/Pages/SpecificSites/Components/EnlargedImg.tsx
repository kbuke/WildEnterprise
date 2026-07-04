import { XCircleIcon } from "@heroicons/react/20/solid"

type EnlargedImgType = {
    img: string
    onCancel: () => void
}

export function EnlargedImg({
    img,
    onCancel
}: EnlargedImgType){
    return(
        <div
            className="self-center flex flex-col"
        >
            <img 
                src={img}
                className="h-200 w-350 rounded"
            />

            <XCircleIcon 
                className="h-20 mt-10 text-red-600 bg-white w-20 self-center rounded-full cursor-pointer"
                onClick={onCancel}
            />
        </div>
    )
}