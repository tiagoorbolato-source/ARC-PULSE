import { z } from 'zod'

export const apiErrorSchema = z.object({
  error: z.string(),
  code: z.string().optional(),
  details: z.unknown().optional(),
})

export type ApiError = z.infer<typeof apiErrorSchema>

export type ApiResponse<T> =
  | { success: true; data: T; cached?: boolean }
  | { success: false; error: string; code?: string }

export type NetworkMetricsResponse = {
  chainId: number
  blockNumber: number
  totalNodes: number
  activeNodes: number
  tps: number
  throughput: number
  latency: number
  networkUptime: number
  gasToken: 'USDC'
  estimatedGasUsdc: string | null
  timestamp: string
}

export type NodeStatus = 'online' | 'warning' | 'offline'

export type NetworkNode = {
  id: string
  status: NodeStatus
  region: string
  uptime: number
  latency: number
  throughput: string
  reputation: number
  lastChecked: string
}

export type AnalyticsResponse = {
  throughput: { time: string; value: number }[]
  transactions: { time: string; value: number }[]
  nodeActivity: { day: string; online: number; warning: number; offline: number }[]
  regionalActivity: { region: string; percentage: number }[]
}

export type NetworkStatusResponse = {
  status: 'operational' | 'degraded' | 'outage'
  chainId: number
  rpcHealthy: boolean
  wsConnected: boolean
  blockNumber: number
  lastBlockTime: string
}

export type SessionUser = {
  id: string
  walletAddress: string
  username: string | null
  avatar: string | null
}

export type RealtimeEvent =
  | { type: 'block'; payload: { number: bigint; hash: string; timestamp: number } }
  | { type: 'metrics'; payload: NetworkMetricsResponse }
  | { type: 'alert'; payload: { id: string; alertType: string; nodeId: string | null; message: string } }
  | { type: 'node_update'; payload: NetworkNode }
