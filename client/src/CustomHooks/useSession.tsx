import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { fetchInstance } from "../Requests/fetchInstance"
import { postInstance } from "../Requests/postInstance"
import { deleteInstance } from "../Requests/deleteInstance"
import { sessionConfig, type LoginType } from "../Config/sessionConfig"

export type LoginValuesType = { email: string; password: string }

export function useCheckSession<T>(type: LoginType, enabled = true) {
    return useQuery<T, Error>({
        queryKey: ["session", type],
        queryFn: () => fetchInstance<T>(sessionConfig[type].check),
        enabled,
        retry: false,
        staleTime: 5 * 60 * 1000,
    })
}

export function useLogin<T>(type: LoginType) {
    const queryClient = useQueryClient()

    return useMutation<T, Error, LoginValuesType>({
        mutationFn: (values) =>
            postInstance<LoginValuesType, T>(sessionConfig[type].login, values),
        onSuccess: (data) => {
            queryClient.setQueryData(["session", type], data)
        },
    })
}

export function useLogout(type: LoginType) {
    const queryClient = useQueryClient()

    return useMutation<void, Error>({
        mutationFn: () => deleteInstance<void>(sessionConfig[type].logout),
        onSuccess: () => {
            queryClient.removeQueries({ queryKey: ["session", type] })
        },
    })
}