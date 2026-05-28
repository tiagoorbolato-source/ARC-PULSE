'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAccount } from 'wagmi'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function SettingsPage() {
  const { isConnected, address } = useAccount()
  const [notifications, setNotifications] = useState({
    nodeOffline: true,
    highLatency: true,
    networkUpdates: false,
    weeklyReport: true,
  })

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00D1FF]/20 to-[#4F46E5]/20 flex items-center justify-center mb-6">
          <svg className="w-8 h-8 text-[#00D1FF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Connect to Access Settings</h1>
        <p className="text-muted-foreground mb-6 max-w-md">
          Connect your wallet to manage your account settings and preferences.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your account and preferences</p>
      </div>

      {/* Profile */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl border border-white/10 p-6"
      >
        <h2 className="text-lg font-semibold text-foreground mb-4">Profile</h2>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00D1FF] to-[#4F46E5] flex items-center justify-center">
            <span className="text-2xl font-bold text-white">
              {address?.slice(2, 4).toUpperCase()}
            </span>
          </div>
          <div>
            <p className="font-mono text-foreground">{address}</p>
            <p className="text-sm text-muted-foreground">Connected via MetaMask</p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">Display Name</label>
            <Input
              placeholder="Enter display name"
              className="glass border-white/10 focus:border-[#00D1FF]/50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">Email (optional)</label>
            <Input
              type="email"
              placeholder="Enter email for notifications"
              className="glass border-white/10 focus:border-[#00D1FF]/50"
            />
          </div>
        </div>
      </motion.div>

      {/* Notifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass rounded-2xl border border-white/10 p-6"
      >
        <h2 className="text-lg font-semibold text-foreground mb-4">Notifications</h2>
        <div className="space-y-4">
          {[
            { key: 'nodeOffline', label: 'Node Offline Alerts', description: 'Get notified when a watched node goes offline' },
            { key: 'highLatency', label: 'High Latency Alerts', description: 'Get notified when latency exceeds threshold' },
            { key: 'networkUpdates', label: 'Network Updates', description: 'Receive network upgrade announcements' },
            { key: 'weeklyReport', label: 'Weekly Report', description: 'Receive a weekly summary of your nodes' },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">{item.label}</p>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
              <button
                onClick={() =>
                  setNotifications({
                    ...notifications,
                    [item.key]: !notifications[item.key as keyof typeof notifications],
                  })
                }
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  notifications[item.key as keyof typeof notifications]
                    ? 'bg-[#00D1FF]'
                    : 'bg-white/10'
                }`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                    notifications[item.key as keyof typeof notifications]
                      ? 'left-7'
                      : 'left-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </motion.div>

      {/* API Keys */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass rounded-2xl border border-white/10 p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">API Keys</h2>
          <Button variant="outline" size="sm" className="glass border-white/10">
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Generate New Key
          </Button>
        </div>
        <div className="glass rounded-xl border border-white/10 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Production Key</p>
              <p className="text-sm text-muted-foreground font-mono">arc_live_****************************</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
              </button>
              <button className="p-2 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-red-400 transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Theme */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass rounded-2xl border border-white/10 p-6"
      >
        <h2 className="text-lg font-semibold text-foreground mb-4">Appearance</h2>
        <div className="flex items-center gap-4">
          <button className="flex-1 glass rounded-xl border border-[#00D1FF]/50 p-4 text-center">
            <div className="w-8 h-8 rounded-lg bg-[#050816] mx-auto mb-2 border border-white/20" />
            <p className="text-sm font-medium text-foreground">Dark</p>
          </button>
          <button className="flex-1 glass rounded-xl border border-white/10 p-4 text-center opacity-50 cursor-not-allowed">
            <div className="w-8 h-8 rounded-lg bg-white mx-auto mb-2 border border-gray-200" />
            <p className="text-sm font-medium text-foreground">Light</p>
            <p className="text-xs text-muted-foreground">Coming soon</p>
          </button>
        </div>
      </motion.div>

      {/* Danger Zone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass rounded-2xl border border-red-500/30 p-6"
      >
        <h2 className="text-lg font-semibold text-red-400 mb-4">Danger Zone</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Once you delete your account, there is no going back. Please be certain.
        </p>
        <Button variant="outline" className="border-red-500/50 text-red-400 hover:bg-red-500/10">
          Delete Account
        </Button>
      </motion.div>
    </div>
  )
}
