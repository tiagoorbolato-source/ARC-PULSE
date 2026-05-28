import type { NetworkNode, NodeStatus } from '@/src/types/api'
import { getCached } from '@/src/cache'
import { getArcHttpClient } from '@/src/web3/arc-viem'
import { getSupabaseAdmin, isSupabaseConfigured } from '@/src/database/supabase'

const SEED_NODES: Omit<NetworkNode, 'lastChecked'>[] = [
  { id: 'ARC-001', status: 'online', region: 'US-East', uptime: 99.99, latency: 12, throughput: '1.2 GB/s', reputation: 98 },
  { id: 'ARC-002', status: 'online', region: 'EU-West', uptime: 99.95, latency: 18, throughput: '980 MB/s', reputation: 96 },
  { id: 'ARC-003', status: 'warning', region: 'Asia-Pacific', uptime: 98.5, latency: 45, throughput: '750 MB/s', reputation: 89 },
  { id: 'ARC-004', status: 'online', region: 'US-West', uptime: 99.98, latency: 15, throughput: '1.1 GB/s', reputation: 97 },
  { id: 'ARC-005', status: 'offline', region: 'EU-Central', uptime: 0, latency: 0, throughput: '0 MB/s', reputation: 72 },
  { id: 'ARC-006', status: 'online', region: 'South-America', uptime: 99.87, latency: 28, throughput: '890 MB/s', reputation: 94 },
  { id: 'ARC-007', status: 'online', region: 'Africa', uptime: 99.76, latency: 35, throughput: '650 MB/s', reputation: 91 },
  { id: 'ARC-008', status: 'online', region: 'US-Central', uptime: 99.92, latency: 14, throughput: '1.05 GB/s', reputation: 95 },
]

const healthState = new Map<string, { failures: number; lastLatency: number }>()

async function measureRpcLatency(): Promise<number> {
  const start = Date.now()
  const client = getArcHttpClient()
  await client.getBlockNumber()
  return Date.now() - start
}

function deriveStatus(latency: number, failures: number): NodeStatus {
  if (failures >= 3) return 'offline'
  if (latency > 80) return 'warning'
  return 'online'
}

export async function runNodeHealthChecks(): Promise<NetworkNode[]> {
  const baseLatency = await measureRpcLatency().catch(() => 999)
  const now = new Date().toISOString()

  return SEED_NODES.map((node, index) => {
    const jitter = (index % 5) * 3
    const latency = node.status === 'offline' ? 0 : baseLatency + jitter
    const state = healthState.get(node.id) ?? { failures: 0, lastLatency: latency }

    if (latency > 200) state.failures++
    else state.failures = Math.max(0, state.failures - 1)

    state.lastLatency = latency
    healthState.set(node.id, state)

    const status =
      node.id === 'ARC-005' && state.failures < 2
        ? 'offline'
        : deriveStatus(latency, state.failures)

    return {
      ...node,
      status,
      latency: status === 'offline' ? 0 : latency,
      lastChecked: now,
    }
  })
}

export async function getMonitoredNodes(): Promise<NetworkNode[]> {
  const { value } = await getCached('nodes:all', 20, runNodeHealthChecks)
  return value
}

export async function getNodeById(nodeId: string): Promise<NetworkNode | null> {
  const nodes = await getMonitoredNodes()
  return nodes.find((n) => n.id === nodeId) ?? null
}

export async function persistReputationFromNodes(nodes: NetworkNode[]) {
  if (!isSupabaseConfigured()) return
  const db = getSupabaseAdmin()
  for (const node of nodes) {
    await db.from('reputation_scores').upsert(
      {
        node_id: node.id,
        uptime_score: node.uptime,
        reliability_score: node.reputation * 0.4,
        latency_score: Math.max(0, 100 - node.latency),
        community_score: node.reputation * 0.3,
        updated_at: new Date().toISOString(),
      } as never,
      { onConflict: 'node_id' }
    )
  }
}
