import { defineChain } from 'viem'

export const arcTestnet = defineChain({
  id: 5042002,
  name: 'ARC Testnet',
  nativeCurrency: {
    name: 'USDC',
    symbol: 'USDC',
    decimals: 6,
  },
  rpcUrls: {
    default: {
      http: [process.env.NEXT_PUBLIC_ARC_RPC_URL ?? 'https://rpc.testnet.arc.network'],
      webSocket: [process.env.NEXT_PUBLIC_ARC_WS_URL ?? 'wss://rpc.testnet.arc.network'],
    },
  },
  blockExplorers: {
    default: {
      name: 'ArcScan',
      url: process.env.NEXT_PUBLIC_ARC_BLOCK_EXPLORER ?? 'https://testnet.arcscan.app',
    },
  },
  testnet: true,
})

export const ARC_CHAIN_ID = arcTestnet.id
