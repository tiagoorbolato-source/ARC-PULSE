'use client'

import { motion } from 'framer-motion'
import { networkStats, chartData } from '@/lib/mock-data'
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  RadialBarChart,
  RadialBar,
} from 'recharts'

const pieColors = ['#00D1FF', '#38BDF8', '#4F46E5', '#7C3AED', '#22d3ee']

export default function AnalyticsPage() {
  const pieData = networkStats.regionalActivity.map((item, index) => ({
    name: item.region,
    value: item.percentage,
    color: pieColors[index],
  }))

  const uptimeData = [
    { name: 'Uptime', value: networkStats.networkUptime, fill: '#00D1FF' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
          <p className="text-sm text-muted-foreground">Detailed network performance metrics</p>
        </div>
        <select className="glass rounded-lg px-3 py-2 border border-white/10 text-sm bg-transparent text-foreground">
          <option value="24h">Last 24 Hours</option>
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
          <option value="90d">Last 90 Days</option>
        </select>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <KPICard
          label="Total Nodes"
          value={networkStats.totalNodes.toLocaleString()}
          change="+347"
          changeLabel="this week"
        />
        <KPICard
          label="Validators"
          value={networkStats.activeValidators.toLocaleString()}
          change="+89"
          changeLabel="this week"
        />
        <KPICard
          label="TPS Peak"
          value="58,294"
          change="+12.4%"
          changeLabel="vs last week"
          highlight
        />
        <KPICard
          label="Contracts"
          value={networkStats.smartContracts.toLocaleString()}
          change="+1,245"
          changeLabel="this week"
        />
        <KPICard
          label="Avg Latency"
          value={`${networkStats.avgLatency}ms`}
          change="-8%"
          changeLabel="improvement"
          positive={false}
        />
      </div>

      {/* Main Charts */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Network Activity - Large */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 glass rounded-2xl border border-white/10 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Network Activity</h3>
              <p className="text-sm text-muted-foreground">Transactions per second over time</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00D1FF] animate-pulse" />
              <span className="text-xs text-muted-foreground">Live</span>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData.transactions}>
                <defs>
                  <linearGradient id="analyticsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00D1FF" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#00D1FF" stopOpacity={0} />
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
                  formatter={(value: number) => [value.toLocaleString(), 'TPS']}
                />
                <Area type="monotone" dataKey="value" stroke="#00D1FF" strokeWidth={2} fill="url(#analyticsGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Uptime Gauge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-2xl border border-white/10 p-6"
        >
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-foreground">Network Uptime</h3>
            <p className="text-sm text-muted-foreground">Last 30 days</p>
          </div>
          <div className="h-48 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius="60%"
                outerRadius="80%"
                data={uptimeData}
                startAngle={90}
                endAngle={-270}
              >
                <RadialBar
                  dataKey="value"
                  cornerRadius={10}
                  background={{ fill: 'rgba(255,255,255,0.05)' }}
                />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center -mt-8">
            <p className="text-4xl font-bold text-foreground">{networkStats.networkUptime}%</p>
            <p className="text-sm text-muted-foreground">Uptime Score</p>
          </div>
        </motion.div>
      </div>

      {/* Secondary Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Regional Distribution Pie */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl border border-white/10 p-6"
        >
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-foreground">Regional Distribution</h3>
            <p className="text-sm text-muted-foreground">Node distribution by geography</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="w-48 h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-3">
              {pieData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-foreground">{item.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Performance Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-2xl border border-white/10 p-6"
        >
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-foreground">Performance Metrics</h3>
            <p className="text-sm text-muted-foreground">Key infrastructure indicators</p>
          </div>
          <div className="space-y-6">
            <MetricBar label="CPU Utilization" value={72} />
            <MetricBar label="Memory Usage" value={65} />
            <MetricBar label="Network Bandwidth" value={87} />
            <MetricBar label="Storage Capacity" value={45} />
            <MetricBar label="Request Queue" value={23} />
          </div>
        </motion.div>
      </div>

      {/* Activity Log */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass rounded-2xl border border-white/10 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
            <p className="text-sm text-muted-foreground">Latest network events</p>
          </div>
        </div>
        <div className="space-y-4">
          {[
            { type: 'node', action: 'Node ARC-847 joined the network', time: '2 minutes ago', status: 'success' },
            { type: 'alert', action: 'High latency detected in EU-West region', time: '15 minutes ago', status: 'warning' },
            { type: 'upgrade', action: 'Protocol v2.4.1 deployed successfully', time: '1 hour ago', status: 'success' },
            { type: 'node', action: 'Node ARC-005 went offline', time: '2 hours ago', status: 'error' },
            { type: 'metric', action: 'TPS reached new peak: 58,294', time: '4 hours ago', status: 'success' },
          ].map((event, index) => (
            <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  event.status === 'success'
                    ? 'bg-green-500/20 text-green-400'
                    : event.status === 'warning'
                    ? 'bg-yellow-500/20 text-yellow-400'
                    : 'bg-red-500/20 text-red-400'
                }`}
              >
                {event.type === 'node' ? (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="3" width="20" height="14" rx="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                ) : event.type === 'alert' ? (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm text-foreground">{event.action}</p>
                <p className="text-xs text-muted-foreground">{event.time}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

function KPICard({
  label,
  value,
  change,
  changeLabel,
  highlight,
  positive = true,
}: {
  label: string
  value: string
  change: string
  changeLabel: string
  highlight?: boolean
  positive?: boolean
}) {
  return (
    <div className="glass rounded-xl border border-white/10 p-4">
      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">{label}</p>
      <p className={`text-2xl font-bold ${highlight ? 'text-[#00D1FF]' : 'text-foreground'}`}>{value}</p>
      <p className={`text-xs mt-1 ${positive ? 'text-green-500' : 'text-green-500'}`}>
        {change} <span className="text-muted-foreground">{changeLabel}</span>
      </p>
    </div>
  )
}

function MetricBar({ label, value }: { label: string; value: number }) {
  const getColor = (val: number) => {
    if (val < 50) return 'from-green-500 to-green-400'
    if (val < 75) return 'from-[#00D1FF] to-[#38BDF8]'
    return 'from-yellow-500 to-orange-500'
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-foreground">{label}</span>
        <span className="text-sm text-muted-foreground">{value}%</span>
      </div>
      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={`h-full rounded-full bg-gradient-to-r ${getColor(value)}`}
        />
      </div>
    </div>
  )
}
