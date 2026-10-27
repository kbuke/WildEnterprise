import type { ComponentProps } from "react";

type InputType = ComponentProps<"input"> & {
    label: string,
    error?: string
}

export function Inputs({ label, error, className, ...rest }: InputType) {
    return (
        <div className="flex flex-col mb-8">
            <label className="font-bold">{label}</label>
            <input className={`mt-4 border-b ${className ?? ""}`} {...rest} />
            {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        </div>
    )
}