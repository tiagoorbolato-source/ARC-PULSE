import type { NetworkStatusResponse } from '@/src/types/api'
import { validateArcChain } from '@/src/web3/arc-viem'
import { getArcHttpClient } from '@/src/web3/arc-viem'
import { getSubscriptionStats } from '@/src/web3/subscriptions'
import { ARC_CHAIN_ID } from '@/src/config/arc'
import { getCached } from '@/src/cache'
import { getLastBlockMeta } from '@/src/services/analytics/engine'

export async function getNetworkStatus(): Promise<NetworkStatusResponse> {
  const { value } = await getCached('network:status', 10, async () => {
    const client = getArcHttpClient()
    let rpcHealthy = false
    let blockNumber = 0
    let lastBlockTime = new Date().toISOString()

    try {
      const [valid, block] = await Promise.all([
        validateArcChain(),
        client.getBlock({ blockTag: 'latest' }),
      ])
      rpcHealthy = valid
      blockNumber = Number(block.number ?? 0)
      lastBlockTime = new Date(Number(block.timestamp) * 1000).toISOString()
    } catch {
      rpcHealthy = false
    }

    const wsStats = getSubscriptionStats()
    const meta = getLastBlockMeta()

    let status: NetworkStatusResponse['status'] = 'operational'
    if (!rpcHealthy) status = 'outage'
    else if (!wsStats.wsActive && !wsStats.pollingActive) status = 'degraded'

    return {
      status,
      chainId: ARC_CHAIN_ID,
      rpcHealthy,
      wsConnected: wsStats.wsActive || wsStats.pollingActive,
      blockNumber: blockNumber || Number(meta.blockNumber),
      lastBlockTime: meta.lastBlockTime
        ? new Date(meta.lastBlockTime).toISOString()
        : lastBlockTime,
    }
  })
  return value
}
