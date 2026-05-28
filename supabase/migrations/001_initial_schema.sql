-- ARC Pulse — initial schema
-- Run in Supabase SQL editor or via supabase db push

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  wallet_address TEXT NOT NULL UNIQUE,
  username TEXT,
  avatar TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_users_wallet ON users (wallet_address);

CREATE TABLE IF NOT EXISTS watchlists (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  node_id TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, node_id)
);

CREATE INDEX IF NOT EXISTS idx_watchlists_user ON watchlists (user_id);
CREATE INDEX IF NOT EXISTS idx_watchlists_node ON watchlists (node_id);

CREATE TABLE IF NOT EXISTS favorite_nodes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  node_id TEXT NOT NULL,
  UNIQUE (user_id, node_id)
);

CREATE INDEX IF NOT EXISTS idx_favorite_nodes_user ON favorite_nodes (user_id);

CREATE TABLE IF NOT EXISTS alerts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  alert_type TEXT NOT NULL,
  node_id TEXT,
  triggered_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  is_read BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE INDEX IF NOT EXISTS idx_alerts_user ON alerts (user_id);
CREATE INDEX IF NOT EXISTS idx_alerts_triggered ON alerts (triggered_at DESC);
CREATE INDEX IF NOT EXISTS idx_alerts_unread ON alerts (user_id) WHERE is_read = FALSE;

CREATE TABLE IF NOT EXISTS reputation_scores (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  node_id TEXT NOT NULL UNIQUE,
  uptime_score NUMERIC(5, 2) NOT NULL DEFAULT 0,
  reliability_score NUMERIC(5, 2) NOT NULL DEFAULT 0,
  latency_score NUMERIC(5, 2) NOT NULL DEFAULT 0,
  community_score NUMERIC(5, 2) NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- upsert support for reputation_scores.updated_at

CREATE INDEX IF NOT EXISTS idx_reputation_node ON reputation_scores (node_id);

CREATE TABLE IF NOT EXISTS network_metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  total_nodes INTEGER NOT NULL DEFAULT 0,
  active_nodes INTEGER NOT NULL DEFAULT 0,
  tps NUMERIC(12, 2) NOT NULL DEFAULT 0,
  throughput NUMERIC(14, 2) NOT NULL DEFAULT 0,
  latency NUMERIC(8, 2) NOT NULL DEFAULT 0,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_network_metrics_ts ON network_metrics (timestamp DESC);

-- SIWE nonces (optional persistent store)
CREATE TABLE IF NOT EXISTS auth_nonces (
  wallet_address TEXT PRIMARY KEY,
  nonce TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_auth_nonces_expires ON auth_nonces (expires_at);

-- RLS: service role bypasses; enable for anon if using client-side Supabase
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE watchlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;
