import { NextRequest } from 'next/server'
import { getSessionFromRequest } from '@/src/middleware/auth'
import { rateLimit, getRateLimitKey } from '@/src/middleware/rate-limit'
import { jsonRateLimited, jsonUnauthorized } from '@/src/utils/responses'
import type { SessionUser } from '@/src/types/api'

export async function withRateLimit(
  request: NextRequest,
  prefix: string,
  handler: () => Promise<Response>
) {
  const key = getRateLimitKey(request, prefix)
  const { allowed } = rateLimit(key)
  if (!allowed) return jsonRateLimited()
  return handler()
}

export async function requireAuth(
  request: NextRequest
): Promise<{ user: SessionUser } | Response> {
  const user = await getSessionFromRequest(request)
  if (!user) return jsonUnauthorized()
  return { user }
}
