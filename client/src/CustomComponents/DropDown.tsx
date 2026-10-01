import type { FieldError, UseFormRegisterReturn } from "react-hook-form"

type DropDownOptionType = string | { id: number; name: string }

type DropDownPropType = {
    label: string
    propArray: DropDownOptionType[]
    disabledOption: string
    register: UseFormRegisterReturn
    error?: FieldError
}

export function DropDown({
    propArray,
    label,
    disabledOption,
    register,
    error
}: DropDownPropType) {

    const options = propArray.map((option) =>
        typeof option === "string"
            ? { value: option, label: option }
            : { value: option.id, label: option.name }
    )

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

                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>

            {error && <p className="text-red-600">{error.message}</p>}
        </div>
    )
}