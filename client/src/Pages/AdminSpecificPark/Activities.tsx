import type { AllActivities } from "../../features/Activities/types"
import { MONTHS } from "../../components/dates/Months"

type AdminActivitiesProps = {
    activities: AllActivities[]
    setAddActivity: () => void
}

export function AdminParkActivities({
    activities,
    setAddActivity
}: AdminActivitiesProps){
    return(
        <>
            <div
                className="flex gap-4 items-center"
            >
                <h1
                    className="text-sunset uppercase text-xl"
                >
                    Activities
                </h1>

                <button
                    className="bg-green-800 px-10 py-2 cursor-pointer rounded"
                    onClick={setAddActivity}
                >
                    Add Activity
                </button>
            </div>

            <div
                className="grid grid-cols-2 py-4 gap-4"
            >
                {activities.map((activity, index) => {
                    const {
                        all_year_round,
                        available_months,
                        discount_with_stay,
                        free_with_stay,
                        id,
                        img,
                        info,
                        name,
                        stay_discount
                    } = activity

                    return(
                        <div
                            className={`${id%2 !== 0 && "border-r border-sunset"} justify-center grid grid-cols-[1fr_3fr] gap-10`}
                            key={index}
                        >
                            <div
                                className="h-70 w-60 bg-sunset rounded flex items-center justify-center"
                            >
                                <img 
                                    src={img}
                                    alt={`${name}-img`}
                                    className="h-69 w-59 rounded"
                                />
                            </div>

                            <div>
                                <h1>
                                    {name}
                                </h1>

                                <p>
                                    {info}
                                </p>

                                {all_year_round ? (
                                    <p>Available All Year</p>
                                ) : (
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {MONTHS.map((month, index) => {
                                            console.log(available_months)
                                            const isAvailable = available_months.includes(index + 1)

                                            return (
                                                <span
                                                    key={month}
                                                    className={`px-2 py-1 rounded text-sm ${
                                                        isAvailable
                                                            ? "bg-sunset text-white"
                                                            : "border border-white/30 text-white/40"
                                                    }`}
                                                >
                                                    {month}
                                                </span>
                                            )
                                        })}
                                    </div>
                                )}

                                {free_with_stay &&
                                    <p>Free if staying</p>
                                }

                                {discount_with_stay && stay_discount&&
                                    <p>{stay_discount*100}% off if staying</p>
                                }

                                {!free_with_stay && !discount_with_stay &&
                                    <p>No deal if staying</p>
                                }
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}