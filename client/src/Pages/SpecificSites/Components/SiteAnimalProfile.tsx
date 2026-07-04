import { ExclamationTriangleIcon, FolderIcon } from "@heroicons/react/24/outline";
import type { AnimalProfileType, AnimalType } from "../../../Types";

export function SiteAnimalProfile({
    img,
    name,
    info,
    endangered_level,
    animal_type,
    big_five,
    onClose
}: AnimalProfileType){

    return(
        <div
            className="
                h-220 w-320 self-center bg-black/90 rounded overflow-y-auto text-white flex flex-col
            "
        >
            <img 
                src={img}
                className="rounded-tr rounded-tl h-150 w-full"
            />

            <div
                className="px-10 flex flex-col items-center py-4"
            >
                <h1
                    className="uppercase text-4xl tracking-[4px] inline-block border-b-2"
                >
                    {name}
                </h1>

                <div
                    className="mt-4 mb-4 w-full flex justify-between px-20 border-b py-2 items-center"
                >
                    <div
                        className="animalClassificationDiv"
                    >
                        <FolderIcon 
                            className="h-14"
                        />

                        <p
                            className="animalClassificationText"
                        >
                            {animal_type}
                        </p>
                    </div>

                    {
                        big_five &&
                            <div
                                className="h-10 w-10 rounded-full bg-white flex flex-col items-center animate-pulse"
                            >
                                <p
                                    className="text-black self-center justify-self-center font-bold text-4xl"
                                >
                                    5
                                </p>
                            </div>
                    }

                    <div
                        className="animalClassificationDiv"
                    >
                        <div
                            // className="bg-blue-600 rounded-full p-1"
                            className={`
                                ${endangered_level === "Least Concern" && "bg-green-600"}
                                ${endangered_level === "Never Threatened" && "bg-blue-600"}
                                ${endangered_level === "Vulnerable" && "bg-yellow-600"}
                                ${endangered_level === "Endangered" && "bg-orange-600"}
                                ${endangered_level === "Critically Endangered" && "bg-red-600 animate-pulse"}
                            rounded-full p-1`}
                        >
                            <ExclamationTriangleIcon 
                                className={`h-14`}
                            />
                        </div>
                        <p
                            className="animalClassificationText"
                        >
                            {endangered_level}
                        </p>
                    </div>
                </div>

                <p
                    className="text-xl mt-4 text-center tracking-[2px]"
                >
                    {info}
                </p>

                <button
                    className="bg-red-600/80 uppercase text-2xl tracking-[3px] cursor-pointer w-40 h-12 rounded mt-4"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    )
}