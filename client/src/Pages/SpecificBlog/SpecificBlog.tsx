import { useParams } from "react-router-dom"
import type { ParamsType } from "../../Types"
import { useFetchSpecificBlog } from "../../Hooks/useFetchSpecificBlog"
import { CalendarDaysIcon, EyeIcon, PencilIcon } from "@heroicons/react/24/outline"
import { printDates } from "../../Utils/printDates"
import { SpecificBlogContent } from "./Components/SpecificBlogContent"

export function SpecificBlog(){
    const {id} = useParams<ParamsType>()
    const blogId = Number(id)

    const {
        blog,
        error,
        isError,
        isLoading
    } = useFetchSpecificBlog(blogId)

    if(isLoading) return <p>Loading...</p>
    if(isError) return <p>Error: {error?.toString()}</p>
    if(!blog) return <p>Site not found</p>

    const {content, cover_photo, edited_at, published_at, sites, title, views} = blog

    return(
        <section>
            <div
                className="w-full h-240"
                style={{
                    backgroundImage: `url(${cover_photo})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat"
                }}
            >
                <div
                    className="bg-black/60 absolute w-250 bottom-10 ml-4 rounded py-4 px-6 text-white"
                >
                    <h1
                        className="uppercase tracking-[6px] text-9xl border-b-4"
                    >
                        {title}
                    </h1>

                    <div
                        className="mt-4 flex justify-between border-b"
                    >
                        <div
                            className="flex items-center gap-4 ml-8"
                        >
                            <CalendarDaysIcon 
                                className="h-16"
                            />

                            {printDates({
                                dateType: "Published",
                                date: published_at
                            })}
                        </div>

                        {edited_at &&
                            <div
                                className="flex items-center gap-4"
                            >
                                <PencilIcon 
                                    className="h-16"
                                />

                                {printDates({
                                    dateType: "Last Editted",
                                    date: edited_at
                                })}
                            </div>
                        }

                        <div
                            className="flex items-center gap-4 mr-8"
                        >
                            <EyeIcon 
                                className="h-16"
                            />

                            <p
                                className="text-2xl"
                            >
                                {views}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <SpecificBlogContent 
                content={content}
                sites={sites}
            />
        </section>
    )
}