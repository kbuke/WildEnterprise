import { Link } from "react-router-dom"

export function AdminSignInNav(){
    return(
        <div
            className="bg-coal w-full h-30 sticky top-0 z-50"
        >
            <Link
                to="/"
            >
                <img 
                    src="/NavLogo.png"
                    className="h-30"
                />
            </Link>
        </div>
    )
}