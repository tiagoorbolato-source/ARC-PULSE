'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { apiEndpoints } from '@/lib/mock-data'
import { Button } from '@/components/ui/button'

const codeExamples = {
  rest: `// Fetch all nodes
const response = await fetch('https://api.arcpulse.network/v1/nodes', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});

const nodes = await response.json();
console.log(nodes);`,
  graphql: `# Query node details
query GetNode($id: ID!) {
  node(id: $id) {
    id
    status
    region
    uptime
    latency
    throughput
    reputation {
      score
      badges
    }
  }
}

# Variables
{
  "id": "ARC-001"
}`,
  websocket: `// Connect to real-time updates
const ws = new WebSocket('wss://api.arcpulse.network/ws/live');

ws.onopen = () => {
  // Subscribe to node updates
  ws.send(JSON.stringify({
    type: 'subscribe',
    channel: 'nodes',
    filters: { region: 'US-East' }
  }));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Node update:', data);
};`,
  sdk: `import { ArcPulse } from '@arcpulse/sdk';

// Initialize client
const client = new ArcPulse({
  apiKey: process.env.ARCPULSE_API_KEY
});

// Get network stats
const stats = await client.network.getStats();

// Subscribe to alerts
client.alerts.subscribe({
  types: ['node_offline', 'high_latency'],
  callback: (alert) => {
    console.log('Alert received:', alert);
  }
});`,
}

export default function ApiDocsPage() {
  const [activeTab, setActiveTab] = useState<'rest' | 'graphql' | 'websocket' | 'sdk'>('rest')
  const [copiedEndpoint, setCopiedEndpoint] = useState<string | null>(null)

  const copyToClipboard = (text: string, endpoint?: string) => {
    navigator.clipboard.writeText(text)
    if (endpoint) {
      setCopiedEndpoint(endpoint)
      setTimeout(() => setCopiedEndpoint(null), 2000)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">API Documentation</h1>
          <p className="text-sm text-muted-foreground">Build integrations with the ARC Pulse API</p>
        </div>
        <Button className="bg-gradient-to-r from-[#00D1FF] to-[#4F46E5] hover:opacity-90 text-white border-0">
          Get API Key
        </Button>
      </div>

      {/* Quick Start */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl border border-white/10 p-6"
      >
        <h2 className="text-lg font-semibold text-foreground mb-4">Quick Start</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="glass rounded-xl border border-white/10 p-4">
            <div className="w-10 h-10 rounded-lg bg-[#00D1FF]/20 flex items-center justify-center mb-3">
              <span className="text-lg font-bold text-[#00D1FF]">1</span>
            </div>
            <h3 className="font-medium text-foreground mb-1">Get API Key</h3>
            <p className="text-sm text-muted-foreground">Create an account and generate your API key</p>
          </div>
          <div className="glass rounded-xl border border-white/10 p-4">
            <div className="w-10 h-10 rounded-lg bg-[#00D1FF]/20 flex items-center justify-center mb-3">
              <span className="text-lg font-bold text-[#00D1FF]">2</span>
            </div>
            <h3 className="font-medium text-foreground mb-1">Install SDK</h3>
            <p className="text-sm text-muted-foreground">npm install @arcpulse/sdk</p>
          </div>
          <div className="glass rounded-xl border border-white/10 p-4">
            <div className="w-10 h-10 rounded-lg bg-[#00D1FF]/20 flex items-center justify-center mb-3">
              <span className="text-lg font-bold text-[#00D1FF]">3</span>
            </div>
            <h3 className="font-medium text-foreground mb-1">Start Building</h3>
            <p className="text-sm text-muted-foreground">Use the examples below to get started</p>
          </div>
        </div>
      </motion.div>

      {/* Code Examples */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass rounded-2xl border border-white/10 overflow-hidden"
      >
        {/* Tabs */}
        <div className="flex border-b border-white/10">
          {(['rest', 'graphql', 'websocket', 'sdk'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'text-[#00D1FF] border-b-2 border-[#00D1FF]'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Code Block */}
        <div className="p-6 relative">
          <button
            onClick={() => copyToClipboard(codeExamples[activeTab])}
            className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          </button>
          <pre className="text-sm font-mono text-foreground overflow-x-auto">
            <code>{codeExamples[activeTab]}</code>
          </pre>
        </div>
      </motion.div>

      {/* Endpoints */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass rounded-2xl border border-white/10 overflow-hidden"
      >
        <div className="p-4 border-b border-white/10">
          <h2 className="text-lg font-semibold text-foreground">API Endpoints</h2>
        </div>
        <div className="divide-y divide-white/5">
          {apiEndpoints.map((endpoint, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 hover:bg-white/5 transition-colors"
            >
              <span
                className={`px-2 py-1 rounded text-xs font-bold ${
                  endpoint.method === 'GET'
                    ? 'bg-green-500/20 text-green-400'
                    : endpoint.method === 'POST'
                    ? 'bg-blue-500/20 text-blue-400'
                    : 'bg-purple-500/20 text-purple-400'
                }`}
              >
                {endpoint.method}
              </span>
              <code className="font-mono text-sm text-[#00D1FF] flex-1">{endpoint.endpoint}</code>
              <span className="text-sm text-muted-foreground hidden md:block">{endpoint.description}</span>
              <button
                onClick={() => copyToClipboard(endpoint.endpoint, endpoint.endpoint)}
                className="p-2 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
              >
                {copiedEndpoint === endpoint.endpoint ? (
                  <svg className="w-4 h-4 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                )}
              </button>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Rate Limits */}
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-2xl border border-white/10 p-6"
        >
          <h2 className="text-lg font-semibold text-foreground mb-4">Rate Limits</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Free Tier</span>
              <span className="text-sm text-foreground">1,000 requests/day</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Pro Tier</span>
              <span className="text-sm text-foreground">100,000 requests/day</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Enterprise</span>
              <span className="text-sm text-foreground">Unlimited</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-2xl border border-white/10 p-6"
        >
          <h2 className="text-lg font-semibold text-foreground mb-4">Authentication</h2>
          <p className="text-sm text-muted-foreground mb-4">
            All API requests require an API key passed via the Authorization header.
          </p>
          <div className="glass rounded-lg p-3 font-mono text-sm text-foreground border border-white/10">
            Authorization: Bearer YOUR_API_KEY
          </div>
        </motion.div>
      </div>
    </div>
  )
}
