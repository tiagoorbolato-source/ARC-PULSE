'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { alerts } from '@/lib/mock-data'
import { Button } from '@/components/ui/button'
import { useAccount } from 'wagmi'

export default function AlertsPage() {
  const { isConnected } = useAccount()
  const [filter, setFilter] = useState<string | null>(null)

  const filteredAlerts = filter
    ? alerts.filter((alert) => alert.type === filter)
    : alerts

  const getAlertStyles = (type: string) => {
    switch (type) {
      case 'error':
        return { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30', icon: 'bg-red-500' }
      case 'warning':
        return { bg: 'bg-yellow-500/20', text: 'text-yellow-400', border: 'border-yellow-500/30', icon: 'bg-yellow-500' }
      case 'success':
        return { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30', icon: 'bg-green-500' }
      default:
        return { bg: 'bg-[#00D1FF]/20', text: 'text-[#00D1FF]', border: 'border-[#00D1FF]/30', icon: 'bg-[#00D1FF]' }
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Alerts</h1>
          <p className="text-sm text-muted-foreground">Monitor network events and notifications</p>
        </div>
        {isConnected && (
          <Button variant="outline" className="glass border-white/10">
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
            Configure Alerts
          </Button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="glass rounded-xl border border-white/10 p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span className="text-xs text-muted-foreground">Critical</span>
          </div>
          <p className="text-2xl font-bold text-foreground">
            {alerts.filter((a) => a.type === 'error').length}
          </p>
        </div>
        <div className="glass rounded-xl border border-white/10 p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="text-xs text-muted-foreground">Warnings</span>
          </div>
          <p className="text-2xl font-bold text-foreground">
            {alerts.filter((a) => a.type === 'warning').length}
          </p>
        </div>
        <div className="glass rounded-xl border border-white/10 p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-3 h-3 rounded-full bg-[#00D1FF]" />
            <span className="text-xs text-muted-foreground">Info</span>
          </div>
          <p className="text-2xl font-bold text-foreground">
            {alerts.filter((a) => a.type === 'info').length}
          </p>
        </div>
        <div className="glass rounded-xl border border-white/10 p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-xs text-muted-foreground">Resolved</span>
          </div>
          <p className="text-2xl font-bold text-foreground">
            {alerts.filter((a) => a.type === 'success').length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Filter:</span>
        {[null, 'error', 'warning', 'info', 'success'].map((type) => (
          <Button
            key={type || 'all'}
            variant="outline"
            size="sm"
            onClick={() => setFilter(type)}
            className={
              filter === type
                ? 'bg-[#00D1FF]/20 text-[#00D1FF] border-[#00D1FF]/30'
                : 'glass border-white/10'
            }
          >
            {type ? type.charAt(0).toUpperCase() + type.slice(1) : 'All'}
          </Button>
        ))}
      </div>

      {/* Alerts List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl border border-white/10 divide-y divide-white/5"
      >
        {filteredAlerts.map((alert, index) => {
          const styles = getAlertStyles(alert.type)
          return (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-start gap-4 p-4 hover:bg-white/5 transition-colors"
            >
              <div className={`w-10 h-10 rounded-lg ${styles.bg} flex items-center justify-center flex-shrink-0`}>
                {alert.type === 'error' ? (
                  <svg className={`w-5 h-5 ${styles.text}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                    <line x1="9" y1="9" x2="15" y2="15" />
                  </svg>
                ) : alert.type === 'warning' ? (
                  <svg className={`w-5 h-5 ${styles.text}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                ) : alert.type === 'success' ? (
                  <svg className={`w-5 h-5 ${styles.text}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                ) : (
                  <svg className={`w-5 h-5 ${styles.text}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="16" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12.01" y2="8" />
                  </svg>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-foreground">{alert.title}</h4>
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${styles.bg} ${styles.text} border ${styles.border}`}>
                    {alert.type.charAt(0).toUpperCase() + alert.type.slice(1)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{alert.description}</p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-xs text-muted-foreground">{alert.time}</span>
                  {alert.node && (
                    <span className="text-xs font-mono text-[#00D1FF]">{alert.node}</span>
                  )}
                </div>
              </div>
              <button className="p-2 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="19" cy="12" r="1" />
                  <circle cx="5" cy="12" r="1" />
                </svg>
              </button>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}
