import { useState } from "react"
import type { AnimalType } from "../../../Types"
import { SiteAnimalProfile } from "./SiteAnimalProfile"
import { PopUp } from "../../../Components.tsx/PopUp"

type SiteAnimalsType = {
    name: string,
    animals: AnimalType[]
}

export function SiteAnimals({
    name,
    animals
}: SiteAnimalsType){
    const [selectedAnimal, setSelectedAnimal] = useState<AnimalType>()
    return(
        <div
            className="px-4 mb-10"
        >
            {selectedAnimal &&
                <PopUp>
                    <SiteAnimalProfile 
                        name={selectedAnimal.name}
                        img={selectedAnimal.img}
                        info={selectedAnimal.info}
                        endangered_level={selectedAnimal.endangered_level}
                        animal_type={selectedAnimal.animal_type}
                        big_five={selectedAnimal.big_five}
                        onClose={() => setSelectedAnimal(undefined)}
                    />
                </PopUp>
            }
            <h1
                className="siteHeadings"
            >
                Animals of {name}
            </h1>

            <div
                className="mt-8 flex gap-4"
            >
                {animals?.map(animal => {
                    return(
                        <div
                            key={animal.id}
                            className="h-90 w-100 border rounded bg-black/80 cursor-pointer flex flex-col text-white text-center"
                            onClick={() => setSelectedAnimal(animal)}
                        >
                            <img 
                                src={animal.img}
                                className="rounded-tr rounded-tl"
                            />

                            <h2
                                className="uppercase mt-4 text-3xl tracking-[4px]"
                            >
                                {animal.name}
                            </h2>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}