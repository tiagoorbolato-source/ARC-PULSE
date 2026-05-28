import { NextRequest } from 'next/server'
import { fetchNetworkMetrics, fetchAnalytics } from '@/src/services/analytics/engine'
import { getWatchlist } from '@/src/services/watchlist/service'
import { getUserAlerts } from '@/src/services/alerts/engine'
import { getReputationScores } from '@/src/services/reputation/engine'
import { jsonOk } from '@/src/utils/responses'
import { withRateLimit, requireAuth } from '@/src/api/helpers'

export async function GET(request: NextRequest) {
  return withRateLimit(request, 'user:dashboard', async () => {
    const auth = await requireAuth(request)
    if (auth instanceof Response) return auth

    const [metrics, analytics, watchlist, alerts, reputation] = await Promise.all([
      fetchNetworkMetrics(),
      fetchAnalytics(),
      getWatchlist(auth.user.id).catch(() => []),
      getUserAlerts(auth.user.id, 10).catch(() => []),
      getReputationScores(),
    ])

    return jsonOk({
      user: auth.user,
      metrics,
      analytics,
      watchlist,
      alerts,
      topReputation: reputation.slice(0, 5),
    })
  })
}
