import { NextRequest } from 'next/server'
import { getSessionFromRequest } from '@/src/middleware/auth'
import { jsonOk, jsonError } from '@/src/utils/responses'
import { withRateLimit } from '@/src/api/helpers'

export async function GET(request: NextRequest) {
  return withRateLimit(request, 'auth:session', async () => {
    const user = await getSessionFromRequest(request)
    if (!user) return jsonError('No active session', 401)
    return jsonOk({ user })
  })
}

export async function DELETE(request: NextRequest) {
  const response = jsonOk({ signedOut: true })
  response.cookies.delete('arc_pulse_session')
  return response
}
