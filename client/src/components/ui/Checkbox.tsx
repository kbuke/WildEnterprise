
import type { FieldValues, Path, UseFormRegister } from "react-hook-form"

type CheckboxProps<T extends FieldValues> = {
    variableName: Path<T>
    register: UseFormRegister<T>
    label: string
}

type LocalCheckboxProps = {
    variableName: string
    label: string
    checked: boolean
    onChange: (checked: boolean) => void
}

export function Checkbox<T extends FieldValues>({
    variableName,
    register,
    label
}: CheckboxProps<T>) {
    return (
        <div className="flex items-center gap-2 mb-8">
            <input
                type="checkbox"
                id={variableName}
                {...register(variableName)}
            />
            <label htmlFor={variableName} className="font-bold">
                {label}
            </label>
        </div>
    )
}

export function LocalCheckbox({
    variableName,
    label,
    checked,
    onChange
}: LocalCheckboxProps) {
    return (
        <div className="flex items-center gap-2 mb-8">
            <input
                type="checkbox"
                id={variableName}
                checked={checked}
                onChange={(event) => onChange(event.target.checked)}
            />
            <label htmlFor={variableName} className="font-bold">
                {label}
            </label>
        </div>
    )
}

