import { apiRequest } from "./apiRequests";

export async function postInstance<TRequest, TResponse>(
    endpoint: string,
    values: TRequest
): Promise<TResponse> {

    return apiRequest<TResponse>(
        endpoint,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(values)
        }
    );
}