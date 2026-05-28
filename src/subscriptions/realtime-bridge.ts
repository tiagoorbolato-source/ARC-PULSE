import { onArcBlock } from '@/src/web3/subscriptions'
import { eventBus } from './event-bus'
import { fetchNetworkMetrics } from '@/src/services/analytics/engine'
import { getMonitoredNodes } from '@/src/services/nodes/monitor'
import { runGlobalAlertScan } from '@/src/services/alerts/engine'

let started = false

export function startRealtimeBridge() {
  if (started) return
  started = true

  onArcBlock(async (event) => {
    eventBus.publish(event)

    try {
      const metrics = await fetchNetworkMetrics()
      eventBus.publish({ type: 'metrics', payload: metrics })

      const nodes = await getMonitoredNodes()
      for (const node of nodes.slice(0, 3)) {
        eventBus.publish({ type: 'node_update', payload: node })
      }

      await runGlobalAlertScan()
    } catch (e) {
      console.error('[realtime-bridge]', e)
    }
  })
}
