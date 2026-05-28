'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { useState, type ReactNode } from 'react'
import { wagmiConfig } from '@/lib/wagmi-config'
import { ArcNetworkGuard } from '@/components/arc-network-guard'
import { AuthSync } from '@/components/auth-sync'
import { Toaster } from '@/components/ui/sonner'

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { staleTime: 10_000, retry: 1 },
        },
      })
  )

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
        <AuthSync />
        <ArcNetworkGuard />
        <Toaster />
      </QueryClientProvider>
    </WagmiProvider>
  )
}
