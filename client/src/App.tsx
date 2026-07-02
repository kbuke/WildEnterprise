import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "./ReactQuery/queryClient"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { HomePg } from "./Pages/HomePg/HomePg"

function App() {
  return(
    <QueryClientProvider
      client={queryClient}
    >
      <HomePg />
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default App
