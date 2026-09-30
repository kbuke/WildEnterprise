import { Navigate, Outlet } from "react-router-dom";
import { useCheckSession } from "../CustomHooks/useSession";
import { sessionConfig, type LoginType } from "../Config/sessionConfig";

type ProtectedAdminRouteType = {
    type: LoginType
}

type SessionFlagsType = {
    is_admin?: boolean
    is_hotel_admin?: boolean
    is_partner_hotel_admin?: boolean
}

const authFlag: Record<LoginType, keyof SessionFlagsType> = {
    "Admin": "is_admin",
    "Hotel": "is_hotel_admin",
    "Partner Hotel": "is_partner_hotel_admin",
}

export function ProtectedAdminRoute({
    type
}: ProtectedAdminRouteType){
    const session = useCheckSession<SessionFlagsType>(type)

    if (session.isLoading){
        return <div>Loading...</div>
    }

    const isAuthed = session.data?.[authFlag[type]]

    if (!isAuthed){
        return(
            <Navigate
                to={sessionConfig[type].loginPath}
                replace
            />
        )
    }

    return <Outlet />
}