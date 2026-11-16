import { Outlet } from "react-router-dom";
import { RequireSession } from "../../components/admin/RequireSession";
import { useScannerLogout, useScannerSession } from "../../features/ScannerSessions/api";

export function RequireScannerLogin(){
    const session = useScannerSession()
    const logout = useScannerLogout()

    return(
        <RequireSession
            session={session}
            redirectTo="/scannersignin"
        >
            {() => (
                <div>
                    <Outlet />
                </div>
            )}
        </RequireSession>
    )
}