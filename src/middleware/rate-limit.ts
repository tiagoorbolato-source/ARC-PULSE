const buckets = new Map<string, { count: number; resetAt: number }>()

const DEFAULT_LIMIT =
  process.env.NODE_ENV === 'development' ? 300 : 60

export function rateLimit(
  key: string,
  limit = DEFAULT_LIMIT,
  windowMs = 60_000
): { allowed: boolean; remaining: number } {
  const now = Date.now()
  let bucket = buckets.get(key)
  if (!bucket || now > bucket.resetAt) {
    bucket = { count: 0, resetAt: now + windowMs }
    buckets.set(key, bucket)
  }
  bucket.count++
  const allowed = bucket.count <= limit
  return { allowed, remaining: Math.max(0, limit - bucket.count) }
}

export function getRateLimitKey(request: Request, prefix: string): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const ip = forwarded?.split(',')[0]?.trim() ?? 'unknown'
  return `${prefix}:${ip}`
}
