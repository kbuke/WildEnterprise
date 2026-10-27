import { useQuery } from "@tanstack/react-query"
import { fetchAllParks } from "../../features/Parks/api"
import { Link } from "react-router-dom"

export function NavBar(){
    const {data: allParks} = useQuery({
        queryFn: fetchAllParks,
        queryKey: ["parks"]
    })

    const navLinks = [
        {
            text: "Home",
            link: "/"
        }
    ]

    allParks?.map((park) => navLinks.push({
        text: park.name,
        link: `/parks/${park.slug}/${park.id}`
    }))

    return (
        <section
            className="bg-coal h-30 w-full sticky top-0 z-50 overflow-hidden flex items-center justify-between text-white border-b"
        >
            <img 
                src="/NavLogo.png"
                className="h-38"
            />

            <div
                className="flex gap-8 uppercase"
            >
                {navLinks.map((navLink, index) => {
                    const {text, link} = navLink

                    return(
                        <Link
                            key={index}
                            to={link}
                        >
                            {text}
                        </Link>
                    )
                })}
            </div>

            <button
                className="bg-sunset px-4 py-2 rounded mr-10 cursor-pointer"
            >
                Support Us
            </button>
            
        </section>
    )
}