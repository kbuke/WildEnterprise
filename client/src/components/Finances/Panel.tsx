import type React from "react"

type PanelProps = {
    title: string,
    children: React.ReactNode,
    className?: string
}

export function Panel({
    title,
    children,
    className
}: PanelProps){
    return(
        <div className={`rounded border border-white/30 p-6 ${className}`}>
            <h3 className="text-xl font-bold mb-4">{title}</h3>
            {children}
        </div>
    )
}