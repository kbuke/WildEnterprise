import { MapPinIcon } from "@heroicons/react/24/outline"
import { SectionHeading } from "../../../Components.tsx/SectionHeadings"
import { useFetchSites } from "../../../Hooks/useFetchSites"

export function Sites(){
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
                                
                                <button
                                    className="rounded bg-green-600/80 cursor-pointer mt-4 uppercase w-60 h-20 text-xl tracking-[6px] hover:-translate-y-2 duration-200 self-center"
                                >
                                    Learn More
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}