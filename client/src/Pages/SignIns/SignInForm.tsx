import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import type { LoginInputs } from "../../features/AdminSessions/types"
import { Inputs } from "../../components/ui/Inputs"

// The least the form needs from a login mutation. Any react-query mutation from
// your useAdminLogin / useParkAdminLogin / useScannerLogin hooks fits this shape.
export type LoginMutation<TSession> = {
    mutate: (
        values: LoginInputs,
        options?: { onSuccess?: (session: TSession) => void }
    ) => void
    isPending: boolean
    isError: boolean
}

export type SignInFormProps<TSession> = {
    title: string
    login: LoginMutation<TSession>
    // Where to go after a successful login. Receives whatever the API returned.
    getRedirect: (session: TSession) => string
}

export function SignInForm<TSession>({ title, login, getRedirect }: SignInFormProps<TSession>) {
    const navigate = useNavigate()

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<LoginInputs>()

    const onSubmit = (values: LoginInputs) => {
        login.mutate(values, {
            onSuccess: (session) => navigate(getRedirect(session), { replace: true }),
        })
    }

    return (
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="bg-sunset text-center rounded-t-lg h-20 flex items-center justify-center uppercase text-2xl font-bold">
                {title}
            </div>

            <div className="bg-white text-coal p-6 rounded-b-lg flex flex-col">
                {login.isError && (
                    <div className="self-center mb-4 bg-red-600/80 text-white py-2 px-4 rounded-lg">
                        Incorrect Email or Password
                    </div>
                )}

                <Inputs
                    label="Please Enter Email Address:"
                    type="email"
                    placeholder="Email Address"
                    error={errors.email?.message}
                    {...register("email", { required: "Email is required" })}
                />

                <Inputs
                    label="Please Enter Password:"
                    type="password"
                    placeholder="Password"
                    error={errors.password?.message}
                    {...register("password", { required: "Password is required" })}
                />

                <button
                    type="submit"
                    disabled={login.isPending}
                    className="bg-green-800/80 text-white py-2 px-6 rounded-lg cursor-pointer h-12 w-30 text-xl disabled:opacity-60"
                >
                    {login.isPending ? "Signing in..." : "Login"}
                </button>
            </div>
        </form>
    )
}