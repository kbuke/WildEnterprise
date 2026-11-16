import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import { fetchAllParks } from "../../features/Parks/api"
import { fetchAllEvents } from "../../features/Events/api"
import { fetchAllProjects } from "../../features/Projects/api"
import { NavDropdown, type NavItem } from "./NavDropdown"
import { upcomingEvents } from "../../features/Events/upcoming"

type NavEntry =
    | { kind: "link"; label: string; to: string }
    | { kind: "dropdown"; label: string; basePath: string; items: NavItem[] | undefined }

export function NavBar() {
    const { data: allParks } = useQuery({
        queryFn: fetchAllParks,
        queryKey: ["parks"],
    })

    const {data: upcoming} = useQuery({
        queryFn: fetchAllEvents,
        queryKey: ["events"],
        select: upcomingEvents
    })
    // const { data: allEvents } = useQuery({ queryFn: fetchAllEvents, queryKey: ["events"] })
    const { data: allProjects } = useQuery({ queryFn: fetchAllProjects, queryKey: ["projects"] })

    // To add a new menu: add one object here.
    const navEntries: NavEntry[] = [
        { kind: "link", label: "Home", to: "/" },
        { kind: "dropdown", label: "Parks", basePath: "/parks", items: allParks },
        { kind: "dropdown", label: "Events", basePath: "/events", items: upcoming },
        { kind: "dropdown", label: "Projects", basePath: "/projects", items: allProjects },
    ]

    return (
        <section className="bg-coal h-30 w-full sticky top-0 z-50 flex items-center justify-between text-white border-b">
            {/* The logo is taller than the bar, so the clipping lives here and not on the
                whole nav (overflow-hidden on the nav would also cut off the dropdowns). */}
            <div className="h-full overflow-hidden flex items-center">
                <img src="/NavLogo.png" alt="Wild Enterprise" className="h-38" />
            </div>

            <nav className="h-full flex items-center gap-8 uppercase text-2xl font-bold">
                {navEntries.map((entry) =>
                    entry.kind === "link" ? (
                        <Link key={entry.label} to={entry.to}>
                            {entry.label}
                        </Link>
                    ) : (
                        <NavDropdown
                            key={entry.label}
                            label={entry.label}
                            basePath={entry.basePath}
                            items={entry.items}
                        />
                    )
                )}
            </nav>

            <button className="bg-sunset px-4 py-2 rounded mr-10 cursor-pointer">
                Staying With Us?
            </button>
        </section>
    )
}