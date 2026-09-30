// deleteInstance.ts
import type { CrudRequestMessageType } from "../Types/CrudMessageTypes";
import { apiRequest } from "./apiRequests";

export async function deleteInstance<TResponse = CrudRequestMessageType>(
    endpoint: string
): Promise<TResponse> {
    return apiRequest<TResponse>(
        endpoint,
        { method: "DELETE" }
    )
}