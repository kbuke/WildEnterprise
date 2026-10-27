import { Outlet } from "react-router-dom";
import { AdminSignInNav } from "../ui/AdminSignInNav";

export function AdminSignInLayout(){
    return(
        <div
            className="h-screen overflow-hidden"
        >
            <AdminSignInNav />
            <Outlet />
        </div>
    )
}