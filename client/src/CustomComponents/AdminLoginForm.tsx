import { useForm } from "react-hook-form"
import { Inputs } from "./Inputs"

type AdminLoginFormType = {
    title: "WildEnterprise Hotel" | "Partner Hotel" | "WildEnterprise Admin"
}

type AdminLoginType = {
    email: string,
    password: string
}

export function AdminLoginForm({
    title
}: AdminLoginFormType){

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<AdminLoginType>()

    return(
        <form>
            <h1>
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

            <button
                type="submit"
            >
                Login
            </button>
        </form>
    )
}