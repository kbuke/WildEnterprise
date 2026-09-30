// fetchInstance.ts
import { apiRequest } from "./apiRequests";

export async function fetchInstance<TResponse>(
    endpoint: string
): Promise<TResponse> {
    return apiRequest<TResponse>(endpoint)
}