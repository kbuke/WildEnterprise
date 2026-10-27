import type { ReactNode } from "react"

type PopUpChild = {
    child: ReactNode
}

export function PopUp({ child }: PopUpChild){
    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            {child}
        </div>
    )
}