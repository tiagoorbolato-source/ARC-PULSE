import { NextRequest } from 'next/server'
import { getSupabaseAdmin, isSupabaseConfigured } from '@/src/database/supabase'
import { jsonOk } from '@/src/utils/responses'
import { withRateLimit, requireAuth } from '@/src/api/helpers'

export async function GET(request: NextRequest) {
  return withRateLimit(request, 'user:profile', async () => {
    const auth = await requireAuth(request)
    if (auth instanceof Response) return auth

    if (!isSupabaseConfigured()) {
      return jsonOk({
        profile: {
          ...auth.user,
          createdAt: new Date().toISOString(),
        },
      })
    }

    const db = getSupabaseAdmin()
    const { data } = await db
      .from('users')
      .select('*')
      .eq('id', auth.user.id)
      .single()

    return jsonOk({
      profile: data
        ? {
            id: data.id,
            walletAddress: data.wallet_address,
            username: data.username,
            avatar: data.avatar,
            createdAt: data.created_at,
          }
        : auth.user,
    })
  })
}
