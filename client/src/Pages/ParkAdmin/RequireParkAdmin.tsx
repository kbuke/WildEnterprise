import { Navigate, Outlet, useParams } from "react-router-dom"
import { useParkAdminSession, useParkAdminLogout } from "../../features/ParkSessions/api"
import { RequireSession } from "../../components/admin/RequireSession"
import { AdminNav } from "../../components/admin/AdminNav"

export function RequireParkAdmin() {
    const session = useParkAdminSession()
    const logout = useParkAdminLogout()
    const { slug } = useParams()

    return (
        <RequireSession session={session} redirectTo="/parkadminsignin">
            {(admin) => {
                // Stop a park admin viewing another park's pages
                if (slug && slug !== admin.slug) {
                    return <Navigate to={`/${admin.slug}/dashboard`} replace />
                }

                const navs = [
                    { url: `/${admin.slug}/dashboard`, title: "Home" },
                    { url: `/${admin.slug}/rooms`, title: "Rooms" },
                ]

                return (
                    <div>
                        <AdminNav navs={navs} logout={logout} />
                        <Outlet />
                    </div>
                )
            }}
        </RequireSession>
    )
}