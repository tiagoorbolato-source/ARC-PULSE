import { NextRequest } from 'next/server'
import { z } from 'zod'
import { estimateGasUsdc } from '@/src/web3/gas'
import { walletAddressSchema } from '@/src/utils/validation'
import { jsonOk, jsonError } from '@/src/utils/responses'
import { withRateLimit } from '@/src/api/helpers'

const querySchema = z.object({
  to: walletAddressSchema,
  data: z.string().optional(),
})

export async function GET(request: NextRequest) {
  return withRateLimit(request, 'gas:estimate', async () => {
    try {
      const params = querySchema.parse({
        to: request.nextUrl.searchParams.get('to'),
        data: request.nextUrl.searchParams.get('data') ?? undefined,
      })
      const estimate = await estimateGasUsdc(
        params.to as `0x${string}`,
        params.data as `0x${string}` | undefined
      )
      return jsonOk({
        gasToken: 'USDC',
        gasLimit: estimate.gasLimit.toString(),
        maxFeePerGas: estimate.maxFeePerGas.toString(),
        estimatedUsdc: estimate.estimatedUsdc,
      })
    } catch (e) {
      return jsonError(e instanceof Error ? e.message : 'Estimation failed', 400)
    }
  })
}
