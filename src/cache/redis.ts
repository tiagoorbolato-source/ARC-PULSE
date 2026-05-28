import { env } from '@/src/config/env'

type RedisLike = {
  get: (key: string) => Promise<string | null>
  set: (key: string, value: string, ex?: number) => Promise<void>
  del: (key: string) => Promise<void>
}

let client: RedisLike | null = null

export async function getRedis(): Promise<RedisLike | null> {
  if (!env.REDIS_URL) return null
  if (client) return client

  try {
    const { default: Redis } = await import('ioredis')
    const redis = new Redis(env.REDIS_URL, {
      maxRetriesPerRequest: 2,
      lazyConnect: true,
    })
    await redis.connect()
    client = {
      get: (k) => redis.get(k),
      set: async (k, v, ex) => {
        if (ex) await redis.set(k, v, 'EX', ex)
        else await redis.set(k, v)
      },
      del: (k) => redis.del(k).then(() => undefined),
    }
    return client
  } catch (e) {
    console.warn('[redis] unavailable, using memory cache only', e)
    return null
  }
}

export async function distributedCacheGet<T>(key: string): Promise<T | null> {
  const redis = await getRedis()
  if (!redis) return null
  const raw = await redis.get(key)
  if (!raw) return null
  try {
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}

export async function distributedCacheSet<T>(key: string, value: T, ttlSeconds: number) {
  const redis = await getRedis()
  if (!redis) return
  await redis.set(key, JSON.stringify(value), ttlSeconds)
}
