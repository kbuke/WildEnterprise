import type { AllArtciles } from "../../features/Articles/types"
import { Link } from "react-router-dom"

type RenderArticleProps = {
    articles: AllArtciles[]
    title?: string
    text?: string
    marginBottom?: boolean
}

export function RenderArticles({
    articles,
    title,
    text,
    marginBottom
}: RenderArticleProps){
    const recentArtciles = articles.slice(0, 3)
    return(
        <div
            // className="pt-10"
            className={`${marginBottom ? "pt-10" : "pt-0"}`}
        >
            <div
                className={`px-6 lg:px-40 ${!marginBottom? "mb-0" : "mb-10"}`}
            >
                {title &&
                    <>
                        <h1
                            className="font-meta primary-header uppercase"
                        >
                            {title}
                        </h1>

                        <p>
                            {text}
                        </p>
                    </>
                }
            </div>

            <div
                className="bg-coal pb-4 flex flex-col"
            >
                <div
                    className="py-4 mt-4 h-auto flex flex-col gap-10 items-center text-white lg:grid lg:grid-cols-3 px-10"
                >
                    {recentArtciles.map((article, index) => {
                        const {title, img, slug, id, published_at} = article

                        return(
                            <Link
                                to={`/articles/${id}/${slug}`}
                                key={index}
                                className="bg-sunset flex flex-col text-white h-120 overflow-hidden rounded text-center"
                            >
                                <img 
                                    src={img ? img : ""}
                                    className="h-90"
                                />

                                <h1
                                    className="text-center mt-4 uppercase font-bold text-4xl"
                                >
                                    {title}
                                </h1>

                                <p>
                                    {published_at}
                                </p>
                            </Link>
                        )
                    })}
                </div>

                <button
                    className="green-button self-center"
                >
                    More Articles
                </button>
            </div>
        </div>
    )
}