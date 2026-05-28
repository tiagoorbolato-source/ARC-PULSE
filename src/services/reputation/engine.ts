import { getSupabaseAdmin, isSupabaseConfigured } from '@/src/database/supabase'
import { getMonitoredNodes } from '@/src/services/nodes/monitor'
import { getCached } from '@/src/cache'

export type ReputationResult = {
  nodeId: string
  overallScore: number
  uptimeScore: number
  reliabilityScore: number
  latencyScore: number
  communityScore: number
  rank: number
  badges: string[]
}

function computeOverall(r: {
  uptime: number
  reliability: number
  latency: number
  community: number
}): number {
  return Math.round(
    r.uptime * 0.35 + r.reliability * 0.3 + r.latency * 0.2 + r.community * 0.15
  )
}

function badgesForScore(score: number, uptime: number): string[] {
  const badges: string[] = []
  if (score >= 95) badges.push('Network Pioneer')
  if (uptime >= 99.9) badges.push('Reliability Master')
  if (score >= 90) badges.push('High Performer')
  if (score >= 80) badges.push('Community Builder')
  return badges
}

export async function getReputationScores(): Promise<ReputationResult[]> {
  const { value } = await getCached('reputation:all', 60, async () => {
    const nodes = await getMonitoredNodes()

    if (isSupabaseConfigured()) {
      const db = getSupabaseAdmin()
      const { data: rows } = await db.from('reputation_scores').select('*')
      if (rows && rows.length > 0) {
        const results = rows.map((row) => {
          const uptime = Number(row.uptime_score)
          const reliability = Number(row.reliability_score)
          const latency = Number(row.latency_score)
          const community = Number(row.community_score)
          const overall = computeOverall({
            uptime,
            reliability,
            latency,
            community,
          })
          return {
            nodeId: row.node_id,
            overallScore: overall,
            uptimeScore: uptime,
            reliabilityScore: reliability,
            latencyScore: latency,
            communityScore: community,
            rank: 0,
            badges: badgesForScore(overall, uptime),
          }
        })
        results.sort((a, b) => b.overallScore - a.overallScore)
        results.forEach((r, i) => {
          r.rank = i + 1
        })
        return results
      }
    }

    const results = nodes.map((node) => {
      const latencyScore = Math.max(0, 100 - node.latency * 1.2)
      const reliabilityScore = node.reputation * 0.95
      const communityScore = node.reputation * 0.85
      const overall = computeOverall({
        uptime: node.uptime,
        reliability: reliabilityScore,
        latency: latencyScore,
        community: communityScore,
      })
      return {
        nodeId: node.id,
        overallScore: overall,
        uptimeScore: node.uptime,
        reliabilityScore,
        latencyScore,
        communityScore,
        rank: 0,
        badges: badgesForScore(overall, node.uptime),
      }
    })

    results.sort((a, b) => b.overallScore - a.overallScore)
    results.forEach((r, i) => {
      r.rank = i + 1
    })
    return results
  })

  return value
}

export async function getNodeReputation(nodeId: string): Promise<ReputationResult | null> {
  const all = await getReputationScores()
  return all.find((r) => r.nodeId === nodeId) ?? null
}
