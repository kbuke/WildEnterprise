import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "./ReactQuery/queryClient"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { HomePg } from "./Pages/HomePg/HomePg"
import { Outlet } from "react-router-dom"

function App() {
  return(
    <QueryClientProvider
      client={queryClient}
    >
      <Outlet />
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default App
