import { Outlet } from "react-router-dom";
import { NavBar } from "../ui/NavBar";
import { Footer } from "../ui/Footer";

export function WebLayout(){
    return(
        <div>
            <NavBar />
            <Outlet />
            <Footer />
        </div>
    )
}