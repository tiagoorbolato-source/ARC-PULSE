'use client'

import { motion } from 'framer-motion'
import { networkStats } from '@/lib/mock-data'
import { useNetworkMetrics, useNetworkAnalytics } from '@/hooks/use-network-data'
import { useRealtimeEvents } from '@/hooks/use-realtime'
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Bar, BarChart } from 'recharts'

export default function DashboardPage() {
  const { data: metrics } = useNetworkMetrics()
  const { data: chartData } = useNetworkAnalytics()
  useRealtimeEvents()

  const stats = metrics ?? {
    totalNodes: networkStats.totalNodes,
    activeValidators: networkStats.activeValidators,
    networkThroughput: networkStats.networkThroughput,
    transactionsPerSecond: networkStats.transactionsPerSecond,
    smartContracts: networkStats.smartContracts,
    weeklyActivity: networkStats.weeklyActivity,
    networkUptime: networkStats.networkUptime,
    avgLatency: networkStats.avgLatency,
    regionalActivity: networkStats.regionalActivity,
    bandwidthUsage: networkStats.bandwidthUsage,
  }

  const charts = chartData ?? {
    throughput: [],
    transactions: [],
    nodeActivity: [],
    regionalActivity: networkStats.regionalActivity,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Real-time network overview and analytics</p>
        </div>
        <div className="flex items-center gap-2 glass rounded-lg px-3 py-2 border border-white/10">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-sm text-muted-foreground">Live</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Nodes"
          value={(stats.totalNodes ?? networkStats.totalNodes).toLocaleString()}
          change="+2.4%"
          trend="up"
          icon={
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
          }
        />
        <StatCard
          label="Active Validators"
          value={('activeNodes' in stats ? stats.activeNodes : networkStats.activeValidators).toLocaleString()}
          change="+5.1%"
          trend="up"
          icon={
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          }
        />
        <StatCard
          label="Network Throughput"
          value={'throughput' in stats ? `${stats.throughput} MB/s` : networkStats.networkThroughput}
          change="+12%"
          trend="up"
          icon={
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
          }
        />
        <StatCard
          label="Avg Latency"
          value={`${'latency' in stats ? stats.latency : networkStats.avgLatency}ms`}
          change="-8%"
          trend="down"
          icon={
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          }
        />
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Throughput Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-2xl border border-white/10 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Network Throughput</h3>
              <p className="text-sm text-muted-foreground">Data transfer over 24 hours</p>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={charts.throughput}>
                <defs>
                  <linearGradient id="throughputGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00D1FF" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#00D1FF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0B1020',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: '#f8fafc' }}
                  itemStyle={{ color: '#00D1FF' }}
                />
                <Area type="monotone" dataKey="value" stroke="#00D1FF" strokeWidth={2} fill="url(#throughputGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Transactions Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl border border-white/10 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Transactions Per Second</h3>
              <p className="text-sm text-muted-foreground">Current: {('tps' in stats ? stats.tps : networkStats.transactionsPerSecond).toLocaleString()} TPS</p>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={charts.transactions}>
                <defs>
                  <linearGradient id="tpsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${v / 1000}k`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0B1020',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: '#f8fafc' }}
                  itemStyle={{ color: '#4F46E5' }}
                  formatter={(value: number) => [value.toLocaleString(), 'TPS']}
                />
                <Area type="monotone" dataKey="value" stroke="#4F46E5" strokeWidth={2} fill="url(#tpsGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Node Activity & Regional Distribution */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Node Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-2xl border border-white/10 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Node Activity</h3>
              <p className="text-sm text-muted-foreground">Weekly node status breakdown</p>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={charts.nodeActivity}>
                <XAxis dataKey="day" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0B1020',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: '#f8fafc' }}
                />
                <Bar dataKey="online" stackId="a" fill="#22c55e" radius={[0, 0, 0, 0]} />
                <Bar dataKey="warning" stackId="a" fill="#eab308" radius={[0, 0, 0, 0]} />
                <Bar dataKey="offline" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-green-500" />
              <span className="text-xs text-muted-foreground">Online</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-yellow-500" />
              <span className="text-xs text-muted-foreground">Warning</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-red-500" />
              <span className="text-xs text-muted-foreground">Offline</span>
            </div>
          </div>
        </motion.div>

        {/* Regional Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-2xl border border-white/10 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Regional Distribution</h3>
              <p className="text-sm text-muted-foreground">Node distribution by region</p>
            </div>
          </div>
          <div className="space-y-4">
            {(charts.regionalActivity ?? networkStats.regionalActivity).map((region, index) => (
              <div key={region.region}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-foreground">{region.region}</span>
                  <span className="text-sm text-muted-foreground">{region.percentage}%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${region.percentage}%` }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                    className="h-full rounded-full"
                    style={{
                      background: `linear-gradient(90deg, #00D1FF ${100 - region.percentage}%, #4F46E5 100%)`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <QuickStat label="Block" value={String('blockNumber' in stats ? stats.blockNumber : '—')} />
        <QuickStat label="Network Uptime" value={`${('networkUptime' in stats ? stats.networkUptime : networkStats.networkUptime).toFixed(2)}%`} />
        <QuickStat label="Gas (USDC)" value={('estimatedGasUsdc' in stats && stats.estimatedGasUsdc) ? stats.estimatedGasUsdc : '—'} highlight />
        <QuickStat label="Chain ID" value={String('chainId' in stats ? stats.chainId : 5042002)} />
      </div>
    </div>
  )
}

function StatCard({
  label,
  value,
  change,
  trend,
  icon,
}: {
  label: string
  value: string
  change: string
  trend: 'up' | 'down'
  icon: React.ReactNode
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-xl border border-white/10 p-4 hover:border-[#00D1FF]/30 transition-colors"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00D1FF]/20 to-[#4F46E5]/20 flex items-center justify-center text-[#00D1FF]">
          {icon}
        </div>
        <span
          className={`text-xs flex items-center gap-0.5 ${
            trend === 'up' ? 'text-green-500' : 'text-red-500'
          }`}
        >
          <svg
            className={`w-3 h-3 ${trend === 'down' && 'rotate-180'}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="18 15 12 9 6 15" />
          </svg>
          {change}
        </span>
      </div>
      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">{label}</p>
      <p className="text-2xl font-bold text-foreground">{value}</p>
    </motion.div>
  )
}

function QuickStat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="glass rounded-xl border border-white/10 p-4 text-center">
      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">{label}</p>
      <p className={`text-xl font-bold ${highlight ? 'text-[#00D1FF]' : 'text-foreground'}`}>{value}</p>
    </div>
  )
}
