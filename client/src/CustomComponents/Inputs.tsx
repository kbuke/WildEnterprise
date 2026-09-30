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
    console.log(props)
    return(
        props.map((prop, index) => {
            const {
                textType, label, placeholder, extraClasses, register,
                error, errorExtraClass
            } = prop

            return(
                <div
                    key={index}
                    className="mb-5"
                >
                    <div
                        className="flex flex-col"
                    >
                        {label &&
                            <label
                                className="font-bold mb-1"
                            >
                                {label}
                            </label>
                        } 

                        <input 
                            placeholder={placeholder && placeholder}
                            className={`${extraClasses} border rounded p-2`}
                            type={textType}
                            {...register}
                        />
                    </div>

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