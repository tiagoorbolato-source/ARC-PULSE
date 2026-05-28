import { getSupabaseAdmin, isSupabaseConfigured } from '@/src/database/supabase'
import type { AlertRow } from '@/src/types/database'
import type { NetworkNode } from '@/src/types/api'
import { getMonitoredNodes } from '@/src/services/nodes/monitor'
import { eventBus } from '@/src/subscriptions/event-bus'

const previousStatus = new Map<string, NodeStatus>()

type NodeStatus = NetworkNode['status']

export async function processNodeAlerts(nodes: NetworkNode[], userId?: string) {
  for (const node of nodes) {
    const prev = previousStatus.get(node.id)
    previousStatus.set(node.id, node.status)

    if (prev === node.status) continue

    let alertType: string | null = null
    let message = ''

    if (node.status === 'offline') {
      alertType = 'node_offline'
      message = `Node ${node.id} is offline`
    } else if (node.status === 'warning' && node.latency > 50) {
      alertType = 'latency_spike'
      message = `High latency on ${node.id} (${node.latency}ms)`
    } else if (prev === 'online' && node.status === 'warning') {
      alertType = 'uptime_degradation'
      message = `Uptime degradation detected on ${node.id}`
    }

    if (!alertType) continue

    if (isSupabaseConfigured() && userId) {
      const db = getSupabaseAdmin()
      const { data } = await db
        .from('alerts')
        .insert({
          user_id: userId,
          alert_type: alertType,
          node_id: node.id,
        })
        .select('id')
        .single()

      eventBus.publish({
        type: 'alert',
        payload: {
          id: data?.id ?? crypto.randomUUID(),
          alertType,
          nodeId: node.id,
          message,
        },
      })
    } else {
      eventBus.publish({
        type: 'alert',
        payload: {
          id: crypto.randomUUID(),
          alertType,
          nodeId: node.id,
          message,
        },
      })
    }
  }
}

export async function runGlobalAlertScan() {
  const nodes = await getMonitoredNodes()
  await processNodeAlerts(nodes)
}

export async function getUserAlerts(
  userId: string,
  limit = 20,
  offset = 0
): Promise<AlertRow[]> {
  if (!isSupabaseConfigured()) return []

  const db = getSupabaseAdmin()
  const { data, error } = await db
    .from('alerts')
    .select('*')
    .eq('user_id', userId)
    .order('triggered_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) throw new Error(error.message)
  return data ?? []
}

export async function markAlertRead(userId: string, alertId: string) {
  if (!isSupabaseConfigured()) return
  const db = getSupabaseAdmin()
  await db.from('alerts').update({ is_read: true }).eq('id', alertId).eq('user_id', userId)
}
