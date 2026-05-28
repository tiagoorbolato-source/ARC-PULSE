import { NextRequest } from 'next/server'
import { getNetworkStatus } from '@/src/services/network/status'
import { jsonOk } from '@/src/utils/responses'
import { withRateLimit } from '@/src/api/helpers'
import { startRealtimeBridge } from '@/src/subscriptions/realtime-bridge'

export async function GET(request: NextRequest) {
  startRealtimeBridge()
  return withRateLimit(request, 'network:status', async () => {
    const status = await getNetworkStatus()
    return jsonOk(status)
  })
}
