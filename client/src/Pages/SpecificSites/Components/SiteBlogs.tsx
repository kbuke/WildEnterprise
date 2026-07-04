import { CalendarIcon, EyeIcon } from "@heroicons/react/24/outline";
import type { BlogType } from "../../../Types";
import { formatDate } from "../../../Utils/formatDate";

type SiteBlogType = {
    name: string
    blogs: BlogType[]
}

export function SiteBlogs({
    name,
    blogs
}: SiteBlogType){
    console.log(blogs)

    return(
        <div
            className="p-4 bg-black/80 text-white flex flex-col"
        >
            <h1
                className="siteHeadings"
            >
                Recent {name} Blogs
            </h1>

            <div
                className="flex gap-4"
            >
                {blogs.map(blog => {
                    console.log(blog)
                    const {
                        cover_photo,
                        id,
                        title,
                        views,
                        published_at
                    } = blog

                    const newDate = formatDate({date: published_at})

                    return(
                        <div
                            key={id}
                            className="bg-white text-black cursor-pointer rounded h-120 w-100 overflow-y-hidden"
                        >
                            <div
                                className="flex flex-col"
                            >
                                <img 
                                    src={cover_photo}
                                    className="w-full h-65"
                                />

                                <h2
                                    className="uppercase text-center mt-4 text-2xl border-b mr-4 ml-4 tracking-[4px] font-bold"
                                >
                                    {title}
                                </h2>


                                <div
                                    className="flex items-center gap-4 px-4 mt-4"
                                >
                                    <EyeIcon 
                                        className="h-10"
                                    />

                                    <p>
                                        {views}
                                    </p>
                                </div>

                                <div
                                    className="flex items-center gap-4 px-4 mt-4"
                                >
                                    <CalendarIcon 
                                        className="h-10"
                                    />

                                    <p>
                                        {newDate}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <button
                className="bg-white text-black mt-6 h-14 p-4 uppercase font-bold tracking-[2px] rounded self-center justify-self-center cursor-pointer hover:-translate-y-2 duration-200"
            >
                See More {name} Articles
            </button>
        </div>
    )
}