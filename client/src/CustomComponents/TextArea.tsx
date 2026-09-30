import type { UseFormRegisterReturn, FieldError } from "react-hook-form";

interface TextAreaType{
    placeholder: string,
    extraClasses?: string,
    register: UseFormRegisterReturn
    error?: FieldError
    label?: string
}

export function TextArea({
    placeholder,
    extraClasses,
    register,
    error,
    label
}: TextAreaType){
    return(
        <div
            className="mb-5 flex flex-col"
        >
            {label &&
                <label
                    className="font-bold mb-1"
                >
                    {label}
                </label>
            }

            <textarea 
                placeholder={placeholder && placeholder}
                className={`${extraClasses} border rounded p-2`}
                {...register}
            />
            {error &&
                <p
                    className="text-red-600 mb-4"
                >
                    {error.message}
                </p>
            }
        </div>
    )
}