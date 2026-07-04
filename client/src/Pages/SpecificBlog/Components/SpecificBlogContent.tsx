import type { SiteType } from "../../../Types"
import { Link } from "react-router-dom"

type SpecificBlogType = {
    content: string,
    sites: SiteType[]
}

export function SpecificBlogContent({
    content,
    sites
}: SpecificBlogType){
    console.log(sites)
    return(
        <div
            // className="px-10 py-4"
            className="py-4"
        >
            <div
                className="flex items-center gap-4 py-2 px-10"
            >
                <h2
                    className="text-2xl font-bold tracking-[2px]"
                >
                    Tagged Sites: </h2>
                {sites.map(site => {
                    const {slug, id, name, head_img} = site

                    return(
                        <Link
                            to={`/sites/${slug}/${id}`}
                            className="flex gap-2 items-center bg-gray-500/80 text-white py-2 px-6 rounded"
                        >
                            <img 
                                src={head_img}
                                className="h-14 w-14 rounded-full"
                            />

                            <p
                                className="text-xl uppercase font-bold tracking-[4px]"
                            >
                                {name}
                            </p>
                        </Link>
                    )
                })}
            </div>

            <div
                className="py-8 bg-black/80 text-white px-6 border-t-2 border-white"
            >
                <p
                    className="text-2xl tracking-[2px]"
                >
                    {content}
                </p>
            </div>
        </div>
    )
}