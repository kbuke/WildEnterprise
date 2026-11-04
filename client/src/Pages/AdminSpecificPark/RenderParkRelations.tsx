import type { ReactNode } from "react";
import type { AdminParkRelations } from "./types";

type RenderParkRelationProps = {
    additionalDiv: ReactNode
}& AdminParkRelations

export function RenderParkRelations({
    parkRelations,
    additionalDiv
}: RenderParkRelationProps){
    return(
        <div
            className={`${parkRelations.id%2 !== 0 && "border-r border-sunset"} justify-center grid grid-cols-[1fr_3fr] gap-10`}
        >
            <div
                className="h-70 w-60 bg-sunset rounded flex items-center justify-center"
            >
                <img 
                    src={parkRelations.img}
                    alt={`${name}-img`}
                    className="h-69 w-59 rounded"
                />
            </div>

            <div>
                <h1>
                    {parkRelations.name}
                </h1>

                <p>
                    {parkRelations.info}
                </p>

                {additionalDiv}
            </div>
        </div>
    )
}