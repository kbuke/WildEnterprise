import { Link } from "react-router-dom"

type AssociatedCardType = {
    name: string,
    img: string,
    url: string
}

type LinkableItem = {
    id: number,
    slug: string,
    name: string,
    img: string
}

type AssociatedLinkProps<T extends LinkableItem> = {
    items: T[],
    label: string,
    basePath: string
}

export function AssociatedCard({
    name, img, url
}: AssociatedCardType){
    return(
        <Link
            to={url}
        >
            <img 
                src={img}
                className=""
            />

            <h2>
                {name}
            </h2>
        </Link>
    )
}

export function AssociatedMapper<T extends LinkableItem>({
    items,
    label,
    basePath
}: AssociatedLinkProps<T>){
    if (items.length === 0){
        return <p>No {label} Registered</p>
    }

    return(
        <div>
            {items.map((item) => (
                <AssociatedCard 
                    key={item.id}
                    name={item.name}
                    img={item.img}
                    url={`${basePath}/${item.slug}/${item.id}`}
                />
            ))}
        </div>
    )
}