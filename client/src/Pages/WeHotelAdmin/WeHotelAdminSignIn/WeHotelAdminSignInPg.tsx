import { useNavigate } from "react-router-dom";
import { sessionConfig } from "../../../Config/sessionConfig";
import { AdminLoginForm } from "../../../CustomComponents/AdminLoginForm";
import type { CheckWeHotelAdminSessionType } from "../../../Types/HotelTypes/WeHotelTypes/WeHotelTypes";
import { useLogin } from "../../../CustomHooks/useSession";

export function WeHotelAdminSignInPg(){
    const navigate = useNavigate()
    const login = useLogin<CheckWeHotelAdminSessionType>("Hotel")

    return(
        <div>
            <AdminLoginForm 
                title={sessionConfig["Hotel"].title}
                isPending={login.isPending}
                serverError={login.error?.message}
                onSubmit={(values) => 
                    login.mutate(values, {
                        onSuccess: (hotel) => navigate(`/${hotel.slug}/admin/dashboard`),
                    })
                }
            />
        </div>
    )
}