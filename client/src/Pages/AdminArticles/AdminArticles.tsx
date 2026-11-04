import { useQuery } from "@tanstack/react-query";
import { AdminSectionHeader } from "../../components/layout/adminSectionHeader";
import { fetchAdminArticles } from "../../features/Articles/api";
import { useState } from "react";
import { AddArticle } from "./AddArticle";
import type { AllArtciles } from "../../features/Articles/types";

export function AdminArticles(){

    const [addArticle, setAddArtilce] = useState<boolean>(false)
    const [articleOptions, setArticleOptions] = useState<"All" | "Draft" | "Published">("All")
    
    const {data: articles} = useQuery({
        queryKey: ["articles"],
        queryFn: fetchAdminArticles
    })

    const selectArticleOptions = ["All", "Published", "Draft"] as const

    const draftArticles = articles?.filter(article => article.status === "Draft")
    const publishedArticles = articles?.filter(article => article.status === "Published")

    const displayArticles = (articles: AllArtciles[]) => {
        return(
            articles.length === 0
                ? <p
                    className="text-center font-bold"
                >
                    No Articles to display, please write a new one above.
                </p>
                :
                <div
                    className="mt-4 grid grid-cols-3"
                >
                    {articles.map((article, index) => {
                        const{id, title, img, slug, status, published_at} = article

                        return(
                            <div
                                key={index}
                            >
                                <div
                                    className="card-img-bg"
                                >
                                    <img 
                                        className="card-img"
                                        src={`${img ? img : "https://img.magnific.com/free-vector/abstract-coming-soon-halftone-style-background-design_1017-27282.jpg?semt=ais_hybrid&w=740&q=80"}`}
                                    />
                                </div>

                                <h1>
                                    {title}
                                </h1>

                                <p><span>Status: </span> {status}</p>
                            </div>
                        )
                    })}
                </div>
        )
    }

    return(
        <section>
            <AdminSectionHeader 
                header="Articles"
                setAddInstance={() => setAddArtilce(!addArticle)}
            />

            <div
                className="flex items-center justify-center gap-10 mb-10"
            >
                {selectArticleOptions.map((option, index) => (
                    <button
                        key={index}
                        className={`mt-4 text-white ${option === articleOptions ? "bg-yellow-400" : "bg-yellow-400/60"}`}
                        onClick={() => setArticleOptions(option)}
                    >
                        {option}
                    </button>
                ))}
            </div>

            {articleOptions === "All" && articles&& displayArticles(articles)}
            {articleOptions === "Published" && publishedArticles&& displayArticles(publishedArticles)}
            {articleOptions === "Draft" && draftArticles&& displayArticles(draftArticles)}

            {addArticle &&
                <AddArticle 
                    openClose = {() => setAddArtilce(!addArticle)}
                />
            }
        </section>
    )
}