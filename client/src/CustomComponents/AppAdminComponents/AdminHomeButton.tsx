import { Link } from "react-router-dom";

export function AdminHomeButton(){
    return(
        <button
            className="mt-4 ml-6 bg-purple-600 text-white rounded px-4 h-10 cursor-pointer"
        >
            <Link
                to={"/admin/dashboard"}
            >
                Admin Home
            </Link>
        </button>
    )
}