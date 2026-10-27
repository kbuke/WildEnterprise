import type { ComponentProps } from "react";

type TextAreaType = ComponentProps<"textarea"> & {
    label: string,
    error?: string
}

export function TextAreas({
    label, 
    error,
    className,
    ...rest
}: TextAreaType){
    return(
        <div
            className="flex flex-col mb-8"
        >
            <label
                className="font-bold"
            >
                {label}
            </label>

            <textarea 
                className={`mt-4 border-b ${className ?? ""}`} {...rest}
            />
            {error &&
                <p
                    className="text-red-600 text-sm mt-2"
                >
                    {error}
                </p>
            }
        </div>
    )
}