import type { AllActivities } from "../../features/Activities/types";

type ParkActivityProp = {
    activity: AllActivities
}

export function ParkActivityRelations({
    activity
}: ParkActivityProp){
    console.log(activity)
    const {
        free_with_stay,
        discount_with_stay,
        available_months,
        stay_discount,
        price
    } = activity
    return(
        <>
            <p>ZAR {price} {free_with_stay || discount_with_stay ? `or ${free_with_stay ? "Free if staying on site" : `${stay_discount&& stay_discount*100}% off, if staying on site`}`: ""}</p>
        </>
    )
}