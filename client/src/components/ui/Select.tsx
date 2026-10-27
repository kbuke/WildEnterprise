import { forwardRef, type ComponentProps } from "react"

type SelectType = ComponentProps<"select"> & {
    label: string,
    error?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectType>(
    ({ label, error, className, children, ...rest }, ref) => (
        <div className="flex flex-col mb-8">
            <label className="font-bold">{label}</label>
            <select ref={ref} className={`mt-4 border-b ${className ?? ""}`} {...rest}>
                {children}
            </select>
            {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        </div>
    )
)