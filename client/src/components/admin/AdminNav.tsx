// components/admin/AdminNav.tsx
import { useState, type ReactNode } from "react"
import { Link } from "react-router-dom"
import type { UseMutationResult } from "@tanstack/react-query"
import { PopUp } from "../ui/Popup"
import { LogoutConfirm } from "./LogoutConfirm"
import type { NavItem } from "./types"

type AdminNavProps = {
    navs: NavItem[]
    logout: UseMutationResult<void, Error, void>
    extra?: ReactNode // optional account-specific elements
}

export function AdminNav({ navs, logout, extra }: AdminNavProps) {
    const [showLogout, setShowLogout] = useState(false)

    return (
        <div className="bg-coal text-white flex flex-row justify-between h-30 pr-14 uppercase z-30 sticky top-0">
            <img src="/HeroLogo.png" />

            <div className="self-center flex gap-4">
                {navs.map(({ url, title }) => (
                    <Link
                        key={url}
                        to={url}
                        className="self-center text-2xl border-b px-4 py-1"
                    >
                        {title}
                    </Link>
                ))}
                {extra}
            </div>

            <button
                className="bg-red-600 h-12 w-24 self-center rounded-lg cursor-pointer uppercase"
                onClick={() => setShowLogout(true)}
            >
                Logout
            </button>

            {showLogout && (
                <PopUp
                    child={
                        <LogoutConfirm
                            logout={logout}
                            onClose={() => setShowLogout(false)}
                        />
                    }
                />
            )}
        </div>
    )
}