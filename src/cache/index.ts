import { cacheGetOrSet, cacheGet, cacheSet, cacheDelete } from './memory'
import { distributedCacheGet, distributedCacheSet } from './redis'

export async function getCached<T>(
  key: string,
  ttlSeconds: number,
  factory: () => Promise<T>
): Promise<{ value: T; hit: boolean }> {
  const dist = await distributedCacheGet<T>(key)
  if (dist !== null) return { value: dist, hit: true }

  const { value, hit } = await cacheGetOrSet(key, ttlSeconds, factory)
  if (!hit) {
    await distributedCacheSet(key, value, ttlSeconds).catch(() => {})
  }
  return { value, hit }
}

export { cacheGet, cacheSet, cacheDelete, cacheGetOrSet }
