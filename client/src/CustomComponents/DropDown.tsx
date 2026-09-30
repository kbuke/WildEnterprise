import type { FieldError, UseFormRegisterReturn } from "react-hook-form"

type DropDownPropType<T extends { id: number; name: string }> = {
    label: string
    propArray: T[]
    disabledOption: string
    register: UseFormRegisterReturn
    error?: FieldError
}

export function DropDown<T extends { id: number; name: string }>({
    propArray,
    label,
    disabledOption,
    register,
    error
}: DropDownPropType<T>) {
    return (
        <div className="mb-10">
            <div className="flex gap-10">
                <label className="font-bold">{label}</label>

                <select
                    className="border-b"
                    defaultValue=""
                    {...register}
                >
                    <option value="" disabled>
                        {disabledOption}
                    </option>

                    {propArray.map((instance) => (
                        <option key={instance.id} value={instance.id}>
                            {instance.name}
                        </option>
                    ))}
                </select>
            </div>

            {error && <p className="text-red-600">{error.message}</p>}
        </div>
    )
}