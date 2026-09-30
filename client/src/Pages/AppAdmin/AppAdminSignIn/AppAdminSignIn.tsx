import { useNavigate } from "react-router-dom";
import { useLogin } from "../../../CustomHooks/useSession";
import type { CheckAppAdminSessionType } from "../../../Types/HotelTypes/AppAdminType";
import { AdminLoginForm } from "../../../CustomComponents/AdminLoginForm";
import { sessionConfig } from "../../../Config/sessionConfig";

export function AppAdminSignInPg(){
    const navigate = useNavigate()
    const login = useLogin<CheckAppAdminSessionType>("Admin")

    return(
        <div>
            <AdminLoginForm 
                title={sessionConfig["Admin"].title}
                isPending={login.isPending}
                serverError={login.error?.message}
                onSubmit={(values) => 
                    login.mutate(values, {
                        onSuccess: () => navigate(`/admin/dashboard`),
                    })
                }
            />
        </div>
    )
}