import { http, createConfig } from 'wagmi'
import { injected, walletConnect } from 'wagmi/connectors'
import { arcTestnet } from '@/lib/chains/arc'

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? ''

export const wagmiConfig = createConfig({
  chains: [arcTestnet],
  connectors: [
    injected(),
    ...(projectId.length > 8
      ? [walletConnect({ projectId, showQrModal: true })]
      : []),
  ],
  transports: {
    [arcTestnet.id]: http(
      process.env.NEXT_PUBLIC_ARC_RPC_URL ?? 'https://rpc.testnet.arc.network'
    ),
  },
  ssr: true,
})

declare module 'wagmi' {
  interface Register {
    config: typeof wagmiConfig
  }
}

// Legacy export
export const config = wagmiConfig
