import { Outlet } from "react-router-dom"
import { useAdminSession, useAdminLogout } from "../../features/AdminSessions/api"
import { RequireSession } from "../../components/admin/RequireSession"
import { AdminNav } from "../../components/admin/AdminNav"
import type { NavItem } from "../../components/admin/types"

const navs: NavItem[] = [
    { url: "/admindashboard", title: "Home" },
    { url: "/adminparks", title: "Parks" },
    { url: "/adminevents", title: "Events" },
]

export function RequireAdmin() {
    const session = useAdminSession()
    const logout = useAdminLogout()

    return (
        <RequireSession session={session} redirectTo="/adminsignin">
            {() => (
                <div>
                    <AdminNav navs={navs} logout={logout} />
                    <Outlet />
                </div>
            )}
        </RequireSession>
    )
}