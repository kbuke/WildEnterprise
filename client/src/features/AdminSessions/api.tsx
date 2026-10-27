import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { LoginInputs, WEAdminSession } from "./types";
import { queryClient } from "../../ReactQuery/queryClient";

type LoginCreds = {
    url: string,
    creds: LoginInputs
}

export async function fetchAdminSession(
    url: string
): Promise<WEAdminSession | null> {
    const res = await fetch(url, {
        credentials: "include"
    })
    if(res.status === 401) return null;
    if(!res.ok) throw new Error("Could not check session")
    return res.json()
}

export async function adminLogin({
    url,
    creds
}: LoginCreds): Promise<WEAdminSession> {
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

export async function adminLogout(
    url: string
): Promise<void> {
  await fetch(url, {
    method: "DELETE",
    credentials: "include",
  });
}

export const ADMIN_SESSION_KEY = ["admin", "session"]

export function useAdminSession(){
    return useQuery({
        queryKey: ADMIN_SESSION_KEY,
        queryFn: () => fetchAdminSession("api/admin/checksession"),
        retry: false,
        staleTime: 1_000 * 60 * 5
    })
}

export function useAdminLogin(){
    return useMutation({
        mutationFn: (creds: LoginInputs) => 
            adminLogin({
                url: "api/admin/login",
                creds
            }
        ),
        onSuccess: (session) => {
            queryClient.setQueryData(ADMIN_SESSION_KEY, session)
        }
    })
}

export function useAdminLogout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => adminLogout("api/admin/logout"),
    onSuccess: () => {
      queryClient.setQueryData(ADMIN_SESSION_KEY, null);
    },
  });
}