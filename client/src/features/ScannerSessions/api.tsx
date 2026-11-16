import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { LoginInputs } from "../AdminSessions/types"
import type { ScannerSession } from "./types"
import { queryClient } from "../../ReactQuery/queryClient"

type LoginCreds = {
    url: string,
    creds: LoginInputs
}

export async function fetchScannerSession(
    url:string
): Promise<ScannerSession | null> {
    const res = await fetch(url, {
        credentials: "include"
    })
    if(res.status === 401) return null;
    if(!res.ok) throw new Error("Could not check session")
    return res.json()
}

export async function scannerLogin({
    url,
    creds
}: LoginCreds): Promise<ScannerSession> {
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

export async function scannerLogout(
    url: string
): Promise<void> {
  await fetch(url, {
    method: "DELETE",
    credentials: "include",
  });
}

export const SCANNER_SESSION_KEY = ["scanner", "session"]

export function useScannerSession(){
    return useQuery({
        queryKey: SCANNER_SESSION_KEY,
        queryFn: () => fetchScannerSession("api/scanner/checksession"),
        retry: false,
        staleTime: 1_000 * 60 * 5
    })
}

export function useScannerLogin(){
    return useMutation({
        mutationFn: (creds: LoginInputs) => 
            scannerLogin({
                url: "api/scanner/login",
                creds
            }
        ),
        onSuccess: (session) => {
            queryClient.setQueryData(SCANNER_SESSION_KEY, session)
        }
    })
}

export function useScannerLogout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => scannerLogout("api/scanner/logout"),
    onSuccess: () => {
      queryClient.setQueryData(SCANNER_SESSION_KEY, null);
    },
  });
}