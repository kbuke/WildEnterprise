// import { LoginPg } from "../../components/LoginPg/LoginPg";
// import { SignInForm } from "../../components/LoginPg/SignInForm";
import { SignIn } from "../SignIns/SignIn";

export function AdminSignIn(){
    return(
        <SignIn 
            bgImg="/HeroImg1.jpg"
            signInType="Site Admin"
        />
        // <LoginPg 
        //     bgImg="/HomeImg1.jpg"
        //     form={<SignInForm 
        //         accountType="Site Admin"
        //     />}
        // />
    )
}