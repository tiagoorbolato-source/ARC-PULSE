import { NextRequest } from 'next/server'
import { removeFromWatchlist } from '@/src/services/watchlist/service'
import { watchlistRemoveSchema } from '@/src/utils/validation'
import { jsonOk, jsonError } from '@/src/utils/responses'
import { withRateLimit, requireAuth } from '@/src/api/helpers'

export async function DELETE(request: NextRequest) {
  return withRateLimit(request, 'watchlist:remove', async () => {
    const auth = await requireAuth(request)
    if (auth instanceof Response) return auth
    try {
      const body = watchlistRemoveSchema.parse(await request.json())
      await removeFromWatchlist(auth.user.id, body.nodeId)
      return jsonOk({ removed: true, nodeId: body.nodeId })
    } catch (e) {
      return jsonError(e instanceof Error ? e.message : 'Failed to remove', 400)
    }
  })
}
