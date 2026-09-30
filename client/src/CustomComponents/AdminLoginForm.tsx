import { useForm } from "react-hook-form"
import { Inputs } from "./Inputs"

type AdminLoginType = {
    email: string,
    password: string
}

type AdminLoginFormType = {
    title: string,
    onSubmit: (values: AdminLoginType) => void
    isPending?: boolean
    serverError?: string
}

export function AdminLoginForm({
    title,
    onSubmit,
    isPending,
    serverError
}: AdminLoginFormType){

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<AdminLoginType>()

    return(
        <form
            className="bg-black/80 p-10 text-white"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
        >
            <h1
                className="font-bold text-4xl mb-8 tracking-[2px]"
            >
                {title} Sign in
            </h1>

            <Inputs 
                props={
                    [
                        {
                            textType: "text",
                            label: "Email",
                            placeholder: "Please enter email",
                            register: register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Please enter a valid email address"
                                }
                            }),
                            error: errors.email,
                        },

                        {
                            textType: "password",
                            label: "Password",
                            placeholder: "Please enter password",
                            register: register("password", {
                                required: "Password is required"
                            }),
                            error: errors.password
                        }
                    ]
                }
            />

            {serverError &&
                <p
                    className="text-red-500"
                >
                    {serverError}
                </p>
            }

            <button
                type="submit"
                className="bg-green-800 p-4 rounded-xl w-40 uppercase text-xl cursor-pointer" 
            >
                {
                    isPending ? "Logging In..." : "Login"
                }
            </button>
        </form>
    )
}