import { NextRequest } from 'next/server'
import { addToWatchlist } from '@/src/services/watchlist/service'
import { watchlistAddSchema } from '@/src/utils/validation'
import { jsonOk, jsonError } from '@/src/utils/responses'
import { withRateLimit, requireAuth } from '@/src/api/helpers'

export async function POST(request: NextRequest) {
  return withRateLimit(request, 'watchlist:add', async () => {
    const auth = await requireAuth(request)
    if (auth instanceof Response) return auth
    try {
      const body = watchlistAddSchema.parse(await request.json())
      await addToWatchlist(auth.user.id, body.nodeId)
      return jsonOk({ added: true, nodeId: body.nodeId })
    } catch (e) {
      return jsonError(e instanceof Error ? e.message : 'Failed to add', 400)
    }
  })
}
