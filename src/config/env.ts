import { z } from 'zod'

const envSchema = z.object({
  ARC_RPC_URL: z.string().url().default('https://rpc.testnet.arc.network'),
  ARC_WS_URL: z.string().url().default('wss://rpc.testnet.arc.network'),
  ARC_CHAIN_ID: z.coerce.number().default(5042002),
  ARC_BLOCK_EXPLORER: z.string().url().default('https://testnet.arcscan.app'),
  NEXT_PUBLIC_ARC_CHAIN_ID: z.coerce.number().optional(),
  NEXT_PUBLIC_ARC_RPC_URL: z.string().url().optional(),
  NEXT_PUBLIC_ARC_WS_URL: z.string().url().optional(),
  NEXT_PUBLIC_ARC_BLOCK_EXPLORER: z.string().url().optional(),
  NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID: z.string().optional(),
  SUPABASE_URL: z.string().url().optional(),
  SUPABASE_ANON_KEY: z.string().optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),
  JWT_SECRET: z.string().min(16).optional(),
  REDIS_URL: z.string().url().optional(),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
})

export type Env = z.infer<typeof envSchema>

function parseEnv(): Env {
  const parsed = envSchema.safeParse(process.env)
  if (!parsed.success) {
    console.warn('[env] validation warnings:', parsed.error.flatten().fieldErrors)
    return envSchema.parse({ ...process.env, JWT_SECRET: process.env.JWT_SECRET ?? 'dev-only-change-in-production-min-32-chars!!' })
  }
  return parsed.data
}

export const env = parseEnv()

export function requireSupabase() {
  if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('Supabase is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.')
  }
  return { url: env.SUPABASE_URL, serviceKey: env.SUPABASE_SERVICE_ROLE_KEY }
}

export function requireJwtSecret(): string {
  const secret = env.JWT_SECRET
  if (!secret || secret.length < 16) {
    throw new Error('JWT_SECRET must be set (min 16 characters) for authentication.')
  }
  return secret
}
