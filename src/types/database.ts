export type User = {
  id: string
  wallet_address: string
  username: string | null
  avatar: string | null
  created_at: string
}

export type Watchlist = {
  id: string
  user_id: string
  node_id: string
  created_at: string
}

export type FavoriteNode = {
  id: string
  user_id: string
  node_id: string
}

export type AlertRow = {
  id: string
  user_id: string
  alert_type: string
  node_id: string | null
  triggered_at: string
  is_read: boolean
}

export type ReputationScore = {
  id: string
  node_id: string
  uptime_score: number
  reliability_score: number
  latency_score: number
  community_score: number
}

export type NetworkMetric = {
  id: string
  total_nodes: number
  active_nodes: number
  tps: number
  throughput: number
  latency: number
  timestamp: string
}

export type Database = {
  public: {
    Tables: {
      users: { Row: User; Insert: Omit<User, 'id' | 'created_at'> & { id?: string; created_at?: string }; Update: Partial<User> }
      watchlists: { Row: Watchlist; Insert: Omit<Watchlist, 'id' | 'created_at'> & { id?: string; created_at?: string }; Update: Partial<Watchlist> }
      favorite_nodes: { Row: FavoriteNode; Insert: Omit<FavoriteNode, 'id'> & { id?: string }; Update: Partial<FavoriteNode> }
      alerts: { Row: AlertRow; Insert: Omit<AlertRow, 'id' | 'triggered_at' | 'is_read'> & { id?: string; triggered_at?: string; is_read?: boolean }; Update: Partial<AlertRow> }
      reputation_scores: { Row: ReputationScore; Insert: Omit<ReputationScore, 'id'> & { id?: string }; Update: Partial<ReputationScore> }
      network_metrics: { Row: NetworkMetric; Insert: Omit<NetworkMetric, 'id' | 'timestamp'> & { id?: string; timestamp?: string }; Update: Partial<NetworkMetric> }
    }
  }
}
