import { NextRequest } from 'next/server'
import { getReputationScores, getNodeReputation } from '@/src/services/reputation/engine'
import { jsonOk } from '@/src/utils/responses'
import { withRateLimit } from '@/src/api/helpers'

export async function GET(request: NextRequest) {
  return withRateLimit(request, 'reputation:get', async () => {
    const nodeId = request.nextUrl.searchParams.get('nodeId')
    if (nodeId) {
      const node = await getNodeReputation(nodeId)
      return jsonOk({ reputation: node })
    }
    const scores = await getReputationScores()
    return jsonOk({ scores })
  })
}
