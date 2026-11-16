// import { LoginPg } from "../../components/LoginPg/LoginPg";
// import { SignInForm } from "../../components/LoginPg/SignInForm";
import { useAdminLogin } from "../../features/AdminSessions/api";
import { SignIn } from "../SignIns/SignIn";
import { SignInForm } from "../SignIns/SignInForm";

export function AdminSignIn(){
    const login = useAdminLogin()
    return(
        <SignIn 
            bgImg="/HeroImg1.jpg"
        >
            <SignInForm 
                title="Admin Login"
                login={login}
                getRedirect={() => "/admindashboard"}
            />
        </SignIn>
        // <SignIn 
        //     bgImg="/HeroImg1.jpg"
        //     signInType="Site Admin"
        // />
    )
}