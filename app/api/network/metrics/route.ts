import { NextRequest } from 'next/server'
import { fetchNetworkMetrics } from '@/src/services/analytics/engine'
import { jsonOk } from '@/src/utils/responses'
import { withRateLimit } from '@/src/api/helpers'
import { startRealtimeBridge } from '@/src/subscriptions/realtime-bridge'

export async function GET(request: NextRequest) {
  startRealtimeBridge()
  return withRateLimit(request, 'network:metrics', async () => {
    const metrics = await fetchNetworkMetrics()
    return jsonOk(metrics, { cached: (metrics as { cached?: boolean }).cached })
  })
}
