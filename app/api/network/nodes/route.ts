import { NextRequest } from 'next/server'
import { getMonitoredNodes } from '@/src/services/nodes/monitor'
import { jsonOk } from '@/src/utils/responses'
import { withRateLimit } from '@/src/api/helpers'

export async function GET(request: NextRequest) {
  return withRateLimit(request, 'network:nodes', async () => {
    const nodes = await getMonitoredNodes()
    return jsonOk({ nodes })
  })
}
