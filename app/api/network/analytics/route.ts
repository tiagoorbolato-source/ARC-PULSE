import { NextRequest } from 'next/server'
import { fetchAnalytics } from '@/src/services/analytics/engine'
import { jsonOk } from '@/src/utils/responses'
import { withRateLimit } from '@/src/api/helpers'

export async function GET(request: NextRequest) {
  return withRateLimit(request, 'network:analytics', async () => {
    const analytics = await fetchAnalytics()
    return jsonOk(analytics)
  })
}
