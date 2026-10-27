import type { ReactNode } from "react"
import type { UseQueryResult } from "@tanstack/react-query"
import { Navigate } from "react-router-dom"

type RequireSessionProps<TSession> = {
    session: UseQueryResult<TSession | null, Error>
    redirectTo: string
    children: (session: TSession) => ReactNode
}

export function RequireSession<TSession>({
    session,
    redirectTo,
    children,
}: RequireSessionProps<TSession>) {
    const { data, isPending } = session

    if (isPending) return <div>Loading...</div>
    if (!data) return <Navigate to={redirectTo} replace />

    return <>
        {children(data)}
    </>
}