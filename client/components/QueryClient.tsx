import { QueryClient, QueryClientProvider } from 'react-query'

export default function QueryClient({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
