import type { UseFormRegisterReturn, FieldError } from "react-hook-form"

type InputType = {
    textType: "text" | "password" | "email" | "date" | "time"
    label?: string
    placeholder?: string,
    extraClasses?: string,
    register: UseFormRegisterReturn,
    error?: FieldError,
    errorExtraClass?: string
}

type InputPropsType = {
    props: InputType[]
}

export function Inputs({
    props
}: InputPropsType){
    return(
        props.map((prop, index) => {
            const {
                textType, label, placeholder, extraClasses, register,
                error, errorExtraClass
            } = prop

            return(
                <div
                    key={index}
                >
                    {label &&
                        <label>
                            {label}
                        </label>
                    } 

                    <input 
                        placeholder={placeholder && placeholder}
                        className={`${extraClasses}`}
                        type={textType}
                        {...register}
                    />

                    {error &&
                        <p
                            className={`${errorExtraClass} text-red-600`}
                        >
                            {error.message}
                        </p>
                    }
                </div>
            )
        })
    )
}