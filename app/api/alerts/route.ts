import { NextRequest } from 'next/server'
import { getUserAlerts } from '@/src/services/alerts/engine'
import { paginationSchema } from '@/src/utils/validation'
import { jsonOk } from '@/src/utils/responses'
import { withRateLimit, requireAuth } from '@/src/api/helpers'

export async function GET(request: NextRequest) {
  return withRateLimit(request, 'alerts:get', async () => {
    const auth = await requireAuth(request)
    if (auth instanceof Response) return auth
    const params = paginationSchema.parse({
      limit: request.nextUrl.searchParams.get('limit'),
      offset: request.nextUrl.searchParams.get('offset'),
    })
    const alerts = await getUserAlerts(auth.user.id, params.limit, params.offset)
    return jsonOk({ alerts })
  })
}
