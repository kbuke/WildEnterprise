import type { AllActivities } from "../../features/Activities/types"
import type { AllEvents } from "../../features/Events/types"

export type AdminParkRelations = {
    parkRelations: AllEvents | AllActivities
}