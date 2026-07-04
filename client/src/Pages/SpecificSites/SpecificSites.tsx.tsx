import { useParams } from "react-router-dom"
import type { ParamsType } from "../../Types"
import { useFetchSpecificSite } from "../../Hooks/useFetchSpecificSite"
import { ArrowDownCircleIcon, MapPinIcon } from "@heroicons/react/24/outline"
import { SiteInfo } from "./Components/SiteInfo"
import { SiteAnimals } from "./Components/SiteAnimals"
import { SiteBlogs } from "./Components/SiteBlogs"

export function SpecificSites(){
    const { id } = useParams<ParamsType>()

    const siteId = Number(id)

    const {
        site,
        error,
        isError,
        isLoading
    } = useFetchSpecificSite(siteId)

    if(isLoading) return <p>Loading...</p>
    if(isError) return <p>Error: {error?.toString()}</p>
    if(!site) return <p>Site not found</p>

    console.log(site)

    return(
        <section
            className="flex flex-col"
        >
            <div
                style={{
                    backgroundImage: `url(${site?.head_img})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat"
                }}
                className="w-full h-240 text-white flex flex-col"
            >
                <div
                    className="bg-black/60 absolute w-250 bottom-10 ml-4 rounded p-4"
                >
                    <h1
                        className="uppercase tracking-[6px] text-9xl"
                    >
                        {site?.name}
                    </h1>

                    <div
                        className="mt-4 mb-4 flex gap-4 items-center"
                    >
                        <MapPinIcon 
                            className="h-8"
                        />

                        <p
                            className="font-bold tracking-[2px] text-lg"
                        >
                            {site?.location}
                        </p>
                    </div>

                    <p
                        className="text-lg tracking-[4px]"
                    >
                        {site?.intro}
                    </p>

                    <ArrowDownCircleIcon 
                        className="h-12 mt-4 justify-self-center animate-pulse"
                    />
                </div>
            </div>

            <SiteInfo 
                name={site.name}
                info={site?.info}
                img1={site?.primary_img_1}
                img2={site?.primary_img_2}
                img3={site?.primary_img_3}
            />

            <SiteAnimals 
                name={site.name}
                animals={site.animals}
            />

            <SiteBlogs 
                name={site.name}
                blogs={site.blogs}
            />
        </section>
    )
}