import { NextRequest } from 'next/server'
import { z } from 'zod'
import { createNonce } from '@/src/services/auth/siwe'
import { walletAddressSchema } from '@/src/utils/validation'
import { jsonOk, jsonError } from '@/src/utils/responses'
import { withRateLimit } from '@/src/api/helpers'

const bodySchema = z.object({
  walletAddress: walletAddressSchema,
})

export async function POST(request: NextRequest) {
  return withRateLimit(request, 'auth:nonce', async () => {
    try {
      const body = bodySchema.parse(await request.json())
      const nonce = await createNonce(body.walletAddress)
      return jsonOk({ nonce })
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Invalid request'
      return jsonError(message, 400)
    }
  })
}
