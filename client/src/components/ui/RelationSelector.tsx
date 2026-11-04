import { LocalCheckbox } from "../ui/Checkbox"
import { ToggleList } from "../ui/ToggleList"
import type { AllEvents } from "../../features/Events/types"
import type { AllProjects } from "../../features/Projects/types"
import type { AllParks } from "../../features/Parks/types"

type RelationItems = AllEvents[] | AllProjects[] | AllParks[]

type RelationSelectorProps = {
    variableName: string
    label: string
    checked: boolean
    onCheckedChange: (checked: boolean) => void
    items: RelationItems
    selected: number[]
    onToggle: (id: number) => void
    emptyText: string
}

export function RelationSelector({
    variableName,
    label,
    checked,
    onCheckedChange,
    items,
    selected,
    onToggle,
    emptyText
}: RelationSelectorProps) {

    return (
        <>
            <LocalCheckbox
                variableName={variableName}
                label={label}
                checked={checked}
                onChange={onCheckedChange}
            />

            {checked && (
                <ToggleList
                    items={items}
                    selected={selected}
                    onToggle={onToggle}
                    emptyText={emptyText}
                />
            )}
        </>
    )
}