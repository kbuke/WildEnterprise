import type { ReactNode } from "react";
import { useScrollLock } from "../CustomHooks/useScrollLock";

type PopUpPropType = {
    children: ReactNode
}

export function PopUp({
    children
}: PopUpPropType){
    useScrollLock(true)

    return(
        <div
            className="fixed flex inset-0 z-40 justify-center bg-black/40"
        >
            {children}
        </div>
    )
}