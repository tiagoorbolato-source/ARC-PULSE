import { z } from 'zod'

export const walletAddressSchema = z
  .string()
  .regex(/^0x[a-fA-F0-9]{40}$/, 'Invalid wallet address')

export const nodeIdSchema = z.string().min(1).max(64)

export const watchlistAddSchema = z.object({
  nodeId: nodeIdSchema,
})

export const watchlistRemoveSchema = z.object({
  nodeId: nodeIdSchema,
})

export const paginationSchema = z.object({
  limit: z.coerce.number().min(1).max(100).default(20),
  offset: z.coerce.number().min(0).default(0),
})

export const alertTypeSchema = z.enum([
  'node_offline',
  'latency_spike',
  'suspicious_activity',
  'uptime_degradation',
  'network_instability',
])
