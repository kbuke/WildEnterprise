import { SignInForm } from "./SignInForm"

export type SignInProps = {
    bgImg: string
    signInType: "Site Admin" | "Park Admin" | "Partner Hotel Admin"
}

export function SignIn({
    bgImg,
    signInType
}: SignInProps){
    return(
        <div
            className=""
        >
            <div
                style={{backgroundImage: `url(${bgImg})`}}
                className="bg-center bg-no-repeat bg-cover w-full h-screen flex items-center justify-center"
            >
                <div
                    className="bg-black/60 w-[90%] h-[90%] text-white flex flex-col lg:grid lg:grid-cols-2 place-items-center px-4 items-center justify-center rounded"
                >
                    <img 
                        src="/HeroLogo.png"
                        className="h-60"
                    />

                    <SignInForm 
                        signInType={signInType}
                    />
                </div>
            </div>
        </div>
    )
}