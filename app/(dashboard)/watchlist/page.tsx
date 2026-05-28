'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAccount } from 'wagmi'
import { nodeData } from '@/lib/mock-data'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function WatchlistPage() {
  const { isConnected } = useAccount()
  const [watchlist, setWatchlist] = useState(nodeData.slice(0, 4))

  const removeFromWatchlist = (nodeId: string) => {
    setWatchlist(watchlist.filter((node) => node.id !== nodeId))
  }

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00D1FF]/20 to-[#4F46E5]/20 flex items-center justify-center mb-6">
          <svg className="w-8 h-8 text-[#00D1FF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Connect Your Wallet</h1>
        <p className="text-muted-foreground mb-6 max-w-md">
          Connect your wallet to create and manage your personal node watchlist.
        </p>
        <Button className="bg-gradient-to-r from-[#00D1FF] to-[#4F46E5] hover:opacity-90 text-white border-0">
          Connect Wallet
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Watchlist</h1>
          <p className="text-sm text-muted-foreground">Monitor your favorite nodes</p>
        </div>
        <Button asChild variant="outline" className="glass border-white/10">
          <Link href="/nodes">
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add Nodes
          </Link>
        </Button>
      </div>

      {watchlist.length === 0 ? (
        <div className="glass rounded-2xl border border-white/10 p-12 text-center">
          <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No nodes in watchlist</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Start adding nodes to monitor their performance
          </p>
          <Button asChild className="bg-gradient-to-r from-[#00D1FF] to-[#4F46E5] hover:opacity-90 text-white border-0">
            <Link href="/nodes">Browse Nodes</Link>
          </Button>
        </div>
      ) : (
        <>
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="glass rounded-xl border border-white/10 p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Watching</p>
              <p className="text-2xl font-bold text-foreground">{watchlist.length}</p>
            </div>
            <div className="glass rounded-xl border border-white/10 p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Avg Uptime</p>
              <p className="text-2xl font-bold text-[#00D1FF]">
                {(watchlist.reduce((acc, n) => acc + n.uptime, 0) / watchlist.length).toFixed(2)}%
              </p>
            </div>
            <div className="glass rounded-xl border border-white/10 p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Online</p>
              <p className="text-2xl font-bold text-green-500">
                {watchlist.filter((n) => n.status === 'online').length}
              </p>
            </div>
          </div>

          {/* Watchlist Grid */}
          <div className="grid md:grid-cols-2 gap-4">
            {watchlist.map((node, index) => (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-xl border border-white/10 p-5 hover:border-[#00D1FF]/30 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        node.status === 'online'
                          ? 'bg-green-500/20'
                          : node.status === 'warning'
                          ? 'bg-yellow-500/20'
                          : 'bg-red-500/20'
                      }`}
                    >
                      <span
                        className={`w-3 h-3 rounded-full ${
                          node.status === 'online'
                            ? 'bg-green-500 animate-pulse'
                            : node.status === 'warning'
                            ? 'bg-yellow-500'
                            : 'bg-red-500'
                        }`}
                      />
                    </div>
                    <div>
                      <p className="font-mono text-[#00D1FF] font-medium">{node.id}</p>
                      <p className="text-xs text-muted-foreground">{node.region}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromWatchlist(node.id)}
                    className="p-2 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-red-400 transition-colors"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0">
                      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                    </svg>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Uptime</p>
                    <p className="text-lg font-semibold text-foreground">{node.uptime}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Latency</p>
                    <p className="text-lg font-semibold text-foreground">{node.latency}ms</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Throughput</p>
                    <p className="text-lg font-semibold text-foreground">{node.throughput}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Reputation</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#00D1FF] to-[#4F46E5]"
                          style={{ width: `${node.reputation}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-foreground">{node.reputation}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
