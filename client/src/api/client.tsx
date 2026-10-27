// export async function fetchAllInstances<T>(endpoint: string): Promise<T> {
//   const response = await fetch(endpoint);

//   if (!response.ok) {
//     throw new Error(`HTTP error! Status: ${response.status}`);
//   }

//   return (await response.json()) as T;
// }

// // POST requests
// export async function postInstance<TInput, TReturned>(
//   endpoint: string,
//   newInfo: TInput
// ): Promise<TReturned> {
//   const response = await fetch(endpoint, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(newInfo),
//   });

//   if (!response.ok) {
//     throw new Error(`HTTP error! Status: ${response.status}`);
//   }

//   return (await response.json()) as TReturned;
// }

export class ApiError extends Error {
  status: number
  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}

async function parse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let message = `HTTP error! Status: ${response.status}`
    try {
      const body = await response.json()
      message = body?.error ?? body?.message ?? message
    } catch { /* body wasn't JSON */ }
    throw new ApiError(response.status, message)
  }
  return (await response.json()) as T
}

export async function fetchAllInstances<T>(endpoint: string): Promise<T> {
  return parse<T>(await fetch(endpoint))
}

export async function postInstance<TInput, TReturned>(endpoint: string, newInfo: TInput): Promise<TReturned> {
  return parse<TReturned>(await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newInfo),
  }))
}