import { getSupabaseAdmin, isSupabaseConfigured } from '@/src/database/supabase'
import { cacheDelete } from '@/src/cache/memory'
import type { NetworkNode } from '@/src/types/api'
import { getMonitoredNodes } from '@/src/services/nodes/monitor'

export async function getWatchlist(userId: string): Promise<{ nodeId: string; createdAt: string; node?: NetworkNode }[]> {
  if (!isSupabaseConfigured()) return []

  const db = getSupabaseAdmin()
  const { data, error } = await db
    .from('watchlists')
    .select('node_id, created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)

  const nodes = await getMonitoredNodes()
  const nodeMap = new Map(nodes.map((n) => [n.id, n]))

  return (data ?? []).map((row) => ({
    nodeId: row.node_id,
    createdAt: row.created_at,
    node: nodeMap.get(row.node_id),
  }))
}

export async function addToWatchlist(userId: string, nodeId: string): Promise<void> {
  if (!isSupabaseConfigured()) throw new Error('Database not configured')

  const db = getSupabaseAdmin()
  const { error } = await db.from('watchlists').upsert(
    { user_id: userId, node_id: nodeId },
    { onConflict: 'user_id,node_id' }
  )
  if (error) throw new Error(error.message)

  await db.from('favorite_nodes').upsert(
    { user_id: userId, node_id: nodeId },
    { onConflict: 'user_id,node_id' }
  )

  cacheDelete(`watchlist:${userId}`)
}

export async function removeFromWatchlist(userId: string, nodeId: string): Promise<void> {
  if (!isSupabaseConfigured()) throw new Error('Database not configured')

  const db = getSupabaseAdmin()
  await db.from('watchlists').delete().eq('user_id', userId).eq('node_id', nodeId)
  await db.from('favorite_nodes').delete().eq('user_id', userId).eq('node_id', nodeId)
  cacheDelete(`watchlist:${userId}`)
}
