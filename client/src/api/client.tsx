import toast from "react-hot-toast"

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
    toast.error(message)

    throw new ApiError(response.status, message)
  }

  if(response.status === 204 || response.headers.get("Content-Length") === "0"){ //this is for delete fn
    return undefined as T
  }
  return (await response.json()) as T
}

export async function fetchAllInstances<T>(endpoint: string): Promise<T> {
  return parse<T>(await fetch(endpoint))
}

export async function postInstance<TInput, TReturned>(
    endpoint: string,
    newInfo: TInput,
    successMessage?: string
): Promise<TReturned> {

    const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newInfo),
    });

    const data = await parse<TReturned>(response);

    if (successMessage) {
        toast.success(successMessage);
    }

    return data;
}

export async function patchInstance<TInput, TReturned>(
  endpoint: string,
  changes: Partial<TInput>,
  successMessage?: string
): Promise<TReturned> {
  const response = await fetch(endpoint, {
    method: "PATCH",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(changes)
  })

  const data = await parse<TReturned>(response)

  if(successMessage){
    toast.success(successMessage)
  }

  return data
}

export async function deleteInstance(
  endpoint: string,
  successMessage?: string
): Promise<void>{
  const response = await fetch(endpoint, {method: "DELETE"})

  await parse<void>(response)

  if(successMessage){
    toast.success(successMessage)
  }
}

// export async function postInstance<TInput, TReturned>(endpoint: string, newInfo: TInput): Promise<TReturned> {
//   return parse<TReturned>(await fetch(endpoint, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(newInfo),
//   }))
// }