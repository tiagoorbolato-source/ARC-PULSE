import { NextRequest } from 'next/server'
import { getWatchlist } from '@/src/services/watchlist/service'
import { jsonOk } from '@/src/utils/responses'
import { withRateLimit, requireAuth } from '@/src/api/helpers'

export async function GET(request: NextRequest) {
  return withRateLimit(request, 'watchlist:get', async () => {
    const auth = await requireAuth(request)
    if (auth instanceof Response) return auth
    const items = await getWatchlist(auth.user.id)
    return jsonOk({ items })
  })
}
