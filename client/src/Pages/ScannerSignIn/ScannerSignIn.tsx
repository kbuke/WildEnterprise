// import { SignIn } from "./SignIn"
// import { SignInForm } from "./SignInForm"
import { SignIn } from "../SignIns/SignIn"
import { SignInForm } from "../SignIns/SignInForm"
import { useScannerLogin } from "../../features/ScannerSessions/api"

export function ScannerSignIn() {
    const login = useScannerLogin()

    return (
        <SignIn bgImg="Later">
            <SignInForm
                title="Event Scanner Sign In"
                login={login}
                getRedirect={() => "/scannerlogin"} // adjust to your scanner route
            />
        </SignIn>
    )
}