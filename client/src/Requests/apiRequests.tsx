import type { CrudRequestErrorType } from "../Types/CrudMessageTypes";

export async function apiRequest<TResponse>(
    endpoint: string,
    options?: RequestInit
): Promise<TResponse> {

    const response = await fetch(`/api/${endpoint}`, {
        credentials: "include",
        ...options
    });

    console.log("STATUS:", response.status);

    const responseText = await response.text();

    console.log("RAW RESPONSE:", responseText);

    if (!response.ok) {

        let errorBody: CrudRequestErrorType;

        try {
            errorBody = JSON.parse(responseText);
        } catch {
            errorBody = {
                error: "Something went wrong, please try again"
            };
        }

        console.log("ERROR BODY:", errorBody);

        throw new Error(errorBody.error);
    }

    if (response.status === 204 || responseText === ""){
        return undefined as TResponse
    }

    return JSON.parse(responseText);
}