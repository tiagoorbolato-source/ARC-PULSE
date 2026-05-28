import { NextRequest } from 'next/server'
import { z } from 'zod'
import { verifySiweAndCreateSession } from '@/src/services/auth/siwe'
import { jsonOk, jsonError } from '@/src/utils/responses'
import { withRateLimit } from '@/src/api/helpers'
import { sessionCookieOptions } from '@/src/middleware/auth'

const bodySchema = z.object({
  message: z.string().min(1),
  signature: z.string().min(1),
})

export async function POST(request: NextRequest) {
  return withRateLimit(request, 'auth:verify', async () => {
    try {
      const body = bodySchema.parse(await request.json())
      const { token, user } = await verifySiweAndCreateSession(body)
      const response = jsonOk({ user, token })
      const cookie = sessionCookieOptions(token)
      response.cookies.set(cookie.name, cookie.value, {
        httpOnly: cookie.httpOnly,
        secure: cookie.secure,
        sameSite: cookie.sameSite,
        path: cookie.path,
        maxAge: cookie.maxAge,
      })
      return response
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Verification failed'
      return jsonError(message, 401, 'SIWE_FAILED')
    }
  })
}
