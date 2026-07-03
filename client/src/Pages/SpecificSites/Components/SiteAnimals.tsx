type SiteAnimalsType = {
    name: string,
    animals: []
}

export function SiteAnimals({
    name,
    animals
}: SiteAnimalsType){
    console.log(name, animals)
    return(
        <div
            className="px-4 mb-10"
        >
            <h1
                className="siteHeadings"
            >
                Animals of {name}
            </h1>

            <div
                className="mt-8 flex gap-4"
            >
                {animals.map(animal => {
                    return(
                        <div
                            key={animal.id}
                            className="h-90 w-100 border rounded bg-black/80 cursor-pointer flex flex-col text-white text-center"
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