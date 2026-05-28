import { defineChain } from 'viem'
import { env } from './env'

export const ARC_CHAIN_ID = env.ARC_CHAIN_ID
export const ARC_RPC_URL = env.ARC_RPC_URL
export const ARC_WS_URL = env.ARC_WS_URL
export const ARC_BLOCK_EXPLORER = env.ARC_BLOCK_EXPLORER

/** Official ARC Testnet — EVM-compatible, USDC native gas */
export const arcTestnet = defineChain({
  id: ARC_CHAIN_ID,
  name: 'ARC Testnet',
  nativeCurrency: {
    name: 'USDC',
    symbol: 'USDC',
    decimals: 6,
  },
  rpcUrls: {
    default: {
      http: [ARC_RPC_URL],
      webSocket: [ARC_WS_URL],
    },
  },
  blockExplorers: {
    default: {
      name: 'ArcScan',
      url: ARC_BLOCK_EXPLORER,
    },
  },
  testnet: true,
})

export const ARC_SIWE_DOMAIN =
  process.env.NEXT_PUBLIC_APP_URL?.replace(/^https?:\/\//, '') ?? 'localhost:3000'

export const ARC_SIWE_STATEMENT =
  'Sign in to ARC Pulse — Web3 infrastructure intelligence for the ARC network.'
