import './index.css'
import { Outlet } from 'react-router-dom'

import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { queryClient } from './ReactQuery/queryClient'
import { Loading } from './components/layout/loading'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Loading />
      <Outlet />
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default App
