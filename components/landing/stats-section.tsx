'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { networkStats } from '@/lib/mock-data'
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts'

const chartData = [
  { time: '00:00', nodes: 12500, tps: 35000 },
  { time: '04:00', nodes: 12600, tps: 28000 },
  { time: '08:00', nodes: 12700, tps: 42000 },
  { time: '12:00', nodes: 12800, tps: 58000 },
  { time: '16:00', nodes: 12750, tps: 52000 },
  { time: '20:00', nodes: 12800, tps: 45000 },
  { time: 'Now', nodes: 12847, tps: 45892 },
]

export function StatsSection() {
  const [animatedStats, setAnimatedStats] = useState({
    totalNodes: 0,
    activeValidators: 0,
    tps: 0,
    uptime: 0,
  })

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const interval = duration / steps

    let step = 0
    const timer = setInterval(() => {
      step++
      const progress = step / steps
      const easeOut = 1 - Math.pow(1 - progress, 3)

      setAnimatedStats({
        totalNodes: Math.floor(networkStats.totalNodes * easeOut),
        activeValidators: Math.floor(networkStats.activeValidators * easeOut),
        tps: Math.floor(networkStats.transactionsPerSecond * easeOut),
        uptime: parseFloat((networkStats.networkUptime * easeOut).toFixed(2)),
      })

      if (step >= steps) clearInterval(timer)
    }, interval)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-24 md:py-32 relative bg-[#0B1020]/50">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00D1FF]/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-wider text-[#00D1FF] font-semibold">Network Stats</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4 mb-6 text-balance">
            Live Network Performance
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Real-time metrics from the ARC network, updated every second.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass rounded-2xl border border-white/10 p-6 text-center"
          >
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Total Nodes</p>
            <p className="text-3xl md:text-4xl font-bold text-foreground">{animatedStats.totalNodes.toLocaleString()}</p>
            <p className="text-xs text-green-500 mt-2 flex items-center justify-center gap-1">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="18 15 12 9 6 15" />
              </svg>
              +347 this week
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass rounded-2xl border border-white/10 p-6 text-center"
          >
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Active Validators</p>
            <p className="text-3xl md:text-4xl font-bold text-foreground">{animatedStats.activeValidators.toLocaleString()}</p>
            <p className="text-xs text-green-500 mt-2 flex items-center justify-center gap-1">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="18 15 12 9 6 15" />
              </svg>
              +89 this week
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass rounded-2xl border border-white/10 p-6 text-center"
          >
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Transactions/Second</p>
            <p className="text-3xl md:text-4xl font-bold text-[#00D1FF]">{animatedStats.tps.toLocaleString()}</p>
            <p className="text-xs text-green-500 mt-2 flex items-center justify-center gap-1">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="18 15 12 9 6 15" />
              </svg>
              +12.4% vs last week
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass rounded-2xl border border-white/10 p-6 text-center"
          >
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Network Uptime</p>
            <p className="text-3xl md:text-4xl font-bold text-foreground">{animatedStats.uptime}%</p>
            <p className="text-xs text-muted-foreground mt-2">Last 30 days</p>
          </motion.div>
        </div>

        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="glass rounded-2xl border border-white/10 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Network Activity</h3>
              <p className="text-sm text-muted-foreground">Transactions per second over 24 hours</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00D1FF] animate-pulse" />
              <span className="text-xs text-muted-foreground">Live</span>
            </div>
          </div>

          <div className="h-64 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorTps" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00D1FF" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#00D1FF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="time" 
                  stroke="#64748b" 
                  fontSize={12} 
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="#64748b" 
                  fontSize={12} 
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0B1020',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    padding: '12px',
                  }}
                  labelStyle={{ color: '#f8fafc', marginBottom: '4px' }}
                  itemStyle={{ color: '#00D1FF' }}
                  formatter={(value: number) => [value.toLocaleString(), 'TPS']}
                />
                <Area
                  type="monotone"
                  dataKey="tps"
                  stroke="#00D1FF"
                  strokeWidth={2}
                  fill="url(#colorTps)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
