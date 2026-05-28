import { runNodeHealthChecks, persistReputationFromNodes } from '@/src/services/nodes/monitor'
import { fetchNetworkMetrics } from '@/src/services/analytics/engine'
import { runGlobalAlertScan } from '@/src/services/alerts/engine'
import { cacheClearPrefix } from '@/src/cache/memory'

export async function runNodeMonitorJob() {
  const nodes = await runNodeHealthChecks()
  await persistReputationFromNodes(nodes)
  cacheClearPrefix('nodes:')
  cacheClearPrefix('network:')
  await fetchNetworkMetrics()
  await runGlobalAlertScan()
  return { nodesChecked: nodes.length, at: new Date().toISOString() }
}
