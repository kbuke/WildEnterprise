import { MapPinIcon } from "@heroicons/react/24/outline"
import { SectionHeading } from "../../../Components.tsx/SectionHeadings"
import { useFetchSites } from "../../../Hooks/useFetchSites"
import { useEffect, useState } from "react"
import { useFetchSpecificSite } from "../../../Hooks/useFetchSpecificSite"
import { Link } from "react-router-dom"

export function Sites(){
    const [selectedPark, setSelectedPark] = useState<number>()

    console.log(selectedPark)

    const {
        sites,
        isError,
        error,
        isLoading
    } = useFetchSites()

    console.log(sites)
    return(
        <section
            className="bg-black/80 text-white"
        >
            <div
                className="mx-4 py-4"
            >
                {SectionHeading({
                    heading: "WildEnterprise Sites",
                    textWhite: true
                })}

                {sites.map(site => {
                    return(
                        <div
                            className="grid grid-cols-[2fr_3fr] gap-2 mt-4"
                            key={site.id}
                        >
                            <img 
                                src = {site.head_img}
                                alt = {`${site.name} img`}
                                className="rounded h-100"
                            />

                            <div
                                className="mx-6 flex flex-col"
                            >
                                <h1
                                    className="text-3xl uppercase tracking-[8px]"
                                >
                                    {site.name}
                                </h1>

                                <div
                                    className="mt-4 flex items-center gap-4"
                                >
                                    <MapPinIcon 
                                        className="h-8"
                                    />

                                    <p
                                        className="font-bold tracking-[2px]"
                                    >
                                        {site.location}
                                    </p>
                                </div>

                                <p
                                    className="mt-4 text-xl"
                                >
                                    {site.intro}
                                </p>
                                
                                <Link
                                    className="flex items-center justify-center rounded bg-green-600/80 cursor-pointer mt-4 uppercase w-60 h-20 text-xl tracking-[6px] hover:-translate-y-2 duration-200 self-center"
                                    to={`/sites/${site.slug}/${site.id}`}
                                >
                                    <p>
                                        Learn More
                                    </p>
                                </Link>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}