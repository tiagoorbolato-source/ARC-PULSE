import type {
  AnalyticsResponse,
  ApiResponse,
  NetworkMetricsResponse,
  NetworkNode,
  NetworkStatusResponse,
  SessionUser,
} from '@/src/types/api'

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
    credentials: 'include',
  })

  const json = (await res.json()) as ApiResponse<T>
  if (!json.success) {
    throw new Error('error' in json ? json.error : 'Request failed')
  }
  return json.data
}

export const api = {
  network: {
    metrics: () => request<NetworkMetricsResponse>('/api/network/metrics'),
    nodes: () => request<{ nodes: NetworkNode[] }>('/api/network/nodes'),
    analytics: () => request<AnalyticsResponse>('/api/network/analytics'),
    status: () => request<NetworkStatusResponse>('/api/network/status'),
  },
  auth: {
    nonce: (walletAddress: string) =>
      request<{ nonce: string }>('/api/auth/nonce', {
        method: 'POST',
        body: JSON.stringify({ walletAddress }),
      }),
    verify: (message: string, signature: string) =>
      request<{ user: { id: string; walletAddress: string }; token: string }>(
        '/api/auth/verify',
        { method: 'POST', body: JSON.stringify({ message, signature }) }
      ),
    session: () => request<{ user: SessionUser }>('/api/auth/session'),
    signOut: () =>
      request<{ signedOut: boolean }>('/api/auth/session', { method: 'DELETE' }),
  },
  watchlist: {
    list: () =>
      request<{
        items: { nodeId: string; createdAt: string; node?: NetworkNode }[]
      }>('/api/watchlist'),
    add: (nodeId: string) =>
      request<{ added: boolean }>('/api/watchlist/add', {
        method: 'POST',
        body: JSON.stringify({ nodeId }),
      }),
    remove: (nodeId: string) =>
      request<{ removed: boolean }>('/api/watchlist/remove', {
        method: 'DELETE',
        body: JSON.stringify({ nodeId }),
      }),
  },
  alerts: {
    list: (limit = 20) =>
      request<{ alerts: unknown[] }>(`/api/alerts?limit=${limit}`),
  },
  reputation: {
    list: () =>
      request<{
        scores: {
          nodeId: string
          overallScore: number
          badges: string[]
          rank: number
        }[]
      }>('/api/reputation'),
  },
  user: {
    profile: () => request<{ profile: SessionUser }>('/api/user/profile'),
    dashboard: () => request<Record<string, unknown>>('/api/user/dashboard'),
  },
}
