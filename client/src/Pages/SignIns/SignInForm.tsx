import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import type { LoginInputs } from "../../features/AdminSessions/types"
import type { SignInProps } from "./SignIn"
import { useAdminLogin } from "../../features/AdminSessions/api"
import { useParkAdminLogin } from "../../features/ParkSessions/api"
import { Inputs } from "../../components/ui/Inputs"

type SignInFormProps = Omit<SignInProps, "bgImg">

export function SignInForm({ signInType }: SignInFormProps) {
    const navigate = useNavigate()

    // Hooks must always be called, so both stay here
    const adminLogin = useAdminLogin()
    const parkAdminLogin = useParkAdminLogin()

    const {
        register,
        formState: { errors },
        handleSubmit
    } = useForm<LoginInputs>()

    const isSiteAdmin = signInType === "Site Admin"
    const activeLogin = isSiteAdmin ? adminLogin : parkAdminLogin

    const onSubmit = (values: LoginInputs) => {
        if (isSiteAdmin) {
            adminLogin.mutate(values, {
                onSuccess: () => navigate("/admindashboard", { replace: true })
            })
        } else {
            parkAdminLogin.mutate(values, {
                onSuccess: (session) =>
                    navigate(`/dashboard/${session.slug}/${session.id}`, { replace: true })
            })
        }
    }

    return (
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="bg-sunset text-center rounded-t-lg h-20 flex items-center justify-center uppercase text-2xl font-bold">
                {isSiteAdmin ? "Admin Sign In" : "Park Admin Sign In"}
            </div>

            <div className="bg-white text-coal p-6 rounded-b-lg flex flex-col">
                {activeLogin.isError && (
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
                    disabled={activeLogin.isPending}
                    className="bg-green-800/80 text-white py-2 px-6 rounded-lg cursor-pointer h-12 w-30 text-xl disabled:opacity-60"
                >
                    {activeLogin.isPending ? "Signing in..." : "Login"}
                </button>
            </div>
        </form>
    )
}