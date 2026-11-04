import { useQuery } from "@tanstack/react-query";
import { fetchAllArticles } from "../../features/Articles/api";
import { RenderArticles } from "../../components/ui/RenderArticles";

export function ArticleSection(){

    const {data: allArticles} = useQuery({
        queryKey: ["articles"],
        queryFn: fetchAllArticles
    })

    if(!allArticles) return <p>No Articles</p>

    return(
        <RenderArticles 
            articles={allArticles}
            title="Latest News"
            text="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia, provident dicta porro ipsam qui necessitatibus, minus fugit ea maxime, tenetur quasi unde ut quibusdam ab cupiditate assumenda distinctio voluptas velit."
            marginBottom={true}
        />
    )
}