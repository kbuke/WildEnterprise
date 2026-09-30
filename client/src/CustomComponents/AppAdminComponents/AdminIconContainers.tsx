import { Link } from "react-router-dom"

type AdminIconContainerType = {
    icon: string,
    title: string,
    link: string
}

type AdminIconContainerArrayType = {
    props: AdminIconContainerType[]
}

export function AdminIconContainer({
    props
}: AdminIconContainerArrayType){
    return(
        props.map((prop, index) => {
            const {icon, title, link} = prop
            return(
                <Link
                    key={index}
                    className="bg-gray-400/80 rounded-xl h-60 w-120 overflow-hidden flex flex-col items-center justify-center cursor-pointer"
                    to={link}
                >
                    <div
                        className="bg-white rounded-full h-34 w-34 flex items-center justify-center"
                    >
                        <img 
                            src={icon}
                            className="h-24 w-24"
                        />
                    </div>

                    <p
                        className="font-bold uppercase mt-4 text-2xl tracking-[2px]"
                    >
                        {title}
                    </p>
                </Link>
            )
        })
    )
}