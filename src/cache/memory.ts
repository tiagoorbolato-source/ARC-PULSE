type CacheEntry<T> = { value: T; expiresAt: number }

const store = new Map<string, CacheEntry<unknown>>()

export function cacheGet<T>(key: string): T | null {
  const entry = store.get(key) as CacheEntry<T> | undefined
  if (!entry) return null
  if (Date.now() > entry.expiresAt) {
    store.delete(key)
    return null
  }
  return entry.value
}

export function cacheSet<T>(key: string, value: T, ttlSeconds: number) {
  store.set(key, {
    value,
    expiresAt: Date.now() + ttlSeconds * 1000,
  })
}

export async function cacheGetOrSet<T>(
  key: string,
  ttlSeconds: number,
  factory: () => Promise<T>
): Promise<{ value: T; hit: boolean }> {
  const cached = cacheGet<T>(key)
  if (cached !== null) return { value: cached, hit: true }
  const value = await factory()
  cacheSet(key, value, ttlSeconds)
  return { value, hit: false }
}

export function cacheDelete(key: string) {
  store.delete(key)
}

export function cacheClearPrefix(prefix: string) {
  for (const key of store.keys()) {
    if (key.startsWith(prefix)) store.delete(key)
  }
}
