'use client'

import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api/client'
import { networkStats, chartData, nodeData } from '@/lib/mock-data'

export function useNetworkMetrics() {
  return useQuery({
    queryKey: ['network', 'metrics'],
    queryFn: () => api.network.metrics(),
    refetchInterval: 30_000,
    placeholderData: {
      chainId: 5042002,
      blockNumber: 0,
      totalNodes: networkStats.totalNodes,
      activeNodes: networkStats.activeValidators,
      tps: networkStats.transactionsPerSecond,
      throughput: 2400,
      latency: networkStats.avgLatency,
      networkUptime: networkStats.networkUptime,
      gasToken: 'USDC' as const,
      estimatedGasUsdc: null,
      timestamp: new Date().toISOString(),
    },
  })
}

export function useNetworkNodes() {
  return useQuery({
    queryKey: ['network', 'nodes'],
    queryFn: async () => {
      const { nodes } = await api.network.nodes()
      return nodes
    },
    refetchInterval: 20_000,
    placeholderData: nodeData,
  })
}

export function useNetworkAnalytics() {
  return useQuery({
    queryKey: ['network', 'analytics'],
    queryFn: () => api.network.analytics(),
    refetchInterval: 60_000,
    placeholderData: chartData,
  })
}

export function useNetworkStatus() {
  return useQuery({
    queryKey: ['network', 'status'],
    queryFn: () => api.network.status(),
    refetchInterval: 15_000,
  })
}
