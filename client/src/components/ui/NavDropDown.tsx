import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"

// Anything with these four fields can go in a dropdown (parks, events, projects...)
export type NavItem = {
    id: number
    name: string
    img: string
    slug: string
}

type NavDropdownProps = {
    label: string
    basePath: string // e.g. "/parks" -> links to /parks/<slug>/<id>
    items: NavItem[] | undefined // undefined while the query is still loading
}

export function NavDropdown({ label, basePath, items }: NavDropdownProps) {
    const [open, setOpen] = useState<boolean>(false)
    const wrapperRef = useRef<HTMLDivElement>(null)

    // Tapping outside closes the menu (needed on touch screens, where there is no mouseleave)
    useEffect(() => {
        if (!open) return

        const handlePointerDown = (e: PointerEvent) => {
            if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false)
        }

        document.addEventListener("pointerdown", handlePointerDown)
        return () => document.removeEventListener("pointerdown", handlePointerDown)
    }, [open])

    return (
        <div
            ref={wrapperRef}
            // h-full so the hover area runs to the bottom of the nav and the panel
            // sits flush underneath it: no gap for the mouse to fall through.
            className="relative h-full flex items-center"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            onBlur={(e) => {
                if (!wrapperRef.current?.contains(e.relatedTarget as Node)) setOpen(false)
            }}
            onKeyDown={(e) => {
                if (e.key === "Escape") setOpen(false)
            }}
        >
            <button
                type="button"
                aria-haspopup="true"
                aria-expanded={open}
                onClick={() => setOpen(true)}
                className={`uppercase cursor-pointer text-2xl font-bold ${open ? "text-sunset" : ""}`}
            >
                {label}
            </button>

            {open && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 min-w-72 max-h-[70vh] overflow-y-auto bg-coal border border-white/30 rounded-b shadow-lg normal-case">
                    {items === undefined && <p className="px-4 py-3 text-gray-400">Loading...</p>}

                    {items?.length === 0 && (
                        <p className="px-4 py-3 text-gray-400">Nothing here yet</p>
                    )}

                    {items?.map(({ id, name, img, slug }) => (
                        <Link
                            key={id}
                            to={`${basePath}/${slug}/${id}`}
                            onClick={() => setOpen(false)}
                            className="grid grid-cols-[auto_1fr] items-center gap-4 px-4 py-3 cursor-pointer hover:bg-white/10"
                        >
                            <img
                                src={img}
                                alt=""
                                className="h-12 w-12 rounded-full object-cover"
                            />

                            <p>{name}</p>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}