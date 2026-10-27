// import { useForm } from "react-hook-form";
// import { Inputs } from "../../components/ui/Inputs";
// import type { LoginInputs } from "../../features/AdminSessions/types";
// import { useAdminLogin } from "../../features/AdminSessions/api";
// import { useNavigate } from "react-router-dom";

// export function SignInForm(){

//     const login = useAdminLogin()
//     const navigate = useNavigate()

//     const {
//         register,
//         formState: {errors},
//         handleSubmit
//     } = useForm<LoginInputs>()

//     const onSubmit = (values: LoginInputs) => {
//         login.mutate(values, {
//             onSuccess: () => navigate("/admindashboard", {replace: true})
//         })
//     }

//     console.log(login.isError)


//     return(
//         <form
//             className="w-full"
//             onSubmit={handleSubmit(onSubmit)}
//         >
//             <div
//                 className="bg-sunset text-center rounded-t-lg h-20 flex items-center justify-center uppercase text-2xl font-bold"
//             >
//                 Admin Sign In
//             </div>

//             <div
//                 className="bg-white text-coal p-6 rounded-b-lg flex flex-col"
//             >
//                 {login.isError &&
//                     <div
//                         className="self-center mb-4 bg-red-600/80 text-white py-2 px-4 rounded-lg"
//                     >
//                         Incorrect Email or Password
//                     </div>
//                 }
//                 <Inputs 
//                     label="Please Enter Email Address:"
//                     type="email"
//                     placeholder="Email Address"
//                     error={errors.email?.message}
//                     {...register("email", {
//                         required: "Email is required"
//                     })}
//                 />

//                 <Inputs 
//                     label="Please Enter Password:"
//                     type="password"
//                     placeholder="Password"
//                     error={errors.password?.message}
//                     {...register("password", {
//                         required: "Password is required"
//                     })}
//                 />


//                 <button
//                     className="bg-green-800/80 text-white py-2 px-6 rounded-lg cursor-pointer h-12 w-30 text-xl"
//                 >
//                     Login
//                 </button>
//             </div>
//         </form>
//     )
// }