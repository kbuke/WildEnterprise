// import { LoginPg } from "../../components/LoginPg/LoginPg";
// import { SignInForm } from "../../components/LoginPg/SignInForm";
import { SignIn } from "../SignIns/SignIn";


export function ParkSignIn(){
    return(
        <SignIn 
            bgImg="/HomeImg2.jpg"
            signInType="Park Admin"
        />
    )
}