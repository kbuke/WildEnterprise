import type { ReactNode } from "react"

type SignInProps = {
    bgImg: string
    children: ReactNode // the <SignInForm /> for this login type
}

export function SignIn({ bgImg, children }: SignInProps) {
    return (
        <div
            style={{ backgroundImage: `url(${bgImg})` }}
            className="bg-center bg-no-repeat bg-cover w-full h-screen flex items-center justify-center"
        >
            <div className="bg-black/60 w-[90%] h-[90%] text-white flex flex-col lg:grid lg:grid-cols-2 place-items-center px-4 items-center justify-center rounded">
                <img src="/HeroLogo.png" alt="Wild Enterprise" className="h-60" />

                {children}
            </div>
        </div>
    )
}