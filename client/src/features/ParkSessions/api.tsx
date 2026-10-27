import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { LoginInputs } from "../AdminSessions/types"
import type { ParkAdminSession } from "./types"
import { queryClient } from "../../ReactQuery/queryClient"

type LoginCreds = {
    url: string,
    creds: LoginInputs
}

export async function fetchParkSession(url:string): Promise<ParkAdminSession | null> {
    const res = await fetch(url, {
        credentials: "include"
    })
    if(res.status === 401) return null 
    if(!res.ok) throw new Error("Could not check session")
    return res.json()
}

export async function parkAdminLogin({
    url,
    creds
}: LoginCreds): Promise<ParkAdminSession> {
    const res = await fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify(creds)
    })
    const data = await res.json()
    if(!res.ok) throw new Error(data.console.error ?? "Login Failed");
    return data
}

export async function parkAdminLogout(
    url: string
): Promise<void> {
  await fetch(url, {
    method: "DELETE",
    credentials: "include",
  });
}

export const ADMIN_SESSION_KEY = ["park_admin", "session"]

export function useParkAdminSession(){
    return useQuery({
        queryKey: ADMIN_SESSION_KEY,
        queryFn: () => fetchParkSession("api/parks/checksession"),
        retry: false,
        staleTime: 1_000 * 60 * 5
    })
}

export function useParkAdminLogin(){
    return useMutation({
        mutationFn: (creds: LoginInputs) => 
            parkAdminLogin({
                url: "api/parks/login",
                creds
            }
        ),
        onSuccess: (session) => {
            queryClient.setQueryData(ADMIN_SESSION_KEY, session)
        }
    })
}

export function useParkAdminLogout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => parkAdminLogout("api/admin/logout"),
    onSuccess: () => {
      queryClient.setQueryData(ADMIN_SESSION_KEY, null);
    },
  });
}