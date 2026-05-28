'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNetworkNodes } from '@/hooks/use-network-data'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type SortKey = 'id' | 'status' | 'region' | 'uptime' | 'latency' | 'throughput' | 'reputation'
type SortDirection = 'asc' | 'desc'

export default function NodesPage() {
  const { data: nodeData = [] } = useNetworkNodes()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [sortKey, setSortKey] = useState<SortKey>('reputation')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const filteredNodes = nodeData
    .filter((node) => {
      const matchesSearch = node.id.toLowerCase().includes(search.toLowerCase()) ||
        node.region.toLowerCase().includes(search.toLowerCase())
      const matchesStatus = !statusFilter || node.status === statusFilter
      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      const aVal = a[sortKey]
      const bVal = b[sortKey]
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal
      }
      return sortDirection === 'asc'
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal))
    })

  const totalPages = Math.ceil(filteredNodes.length / itemsPerPage)
  const paginatedNodes = filteredNodes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDirection('desc')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-500'
      case 'warning':
        return 'bg-yellow-500'
      case 'offline':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getStatusBadge = (status: string) => {
    const colors = {
      online: 'bg-green-500/20 text-green-400 border-green-500/30',
      warning: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      offline: 'bg-red-500/20 text-red-400 border-red-500/30',
    }
    return colors[status as keyof typeof colors] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Node Explorer</h1>
          <p className="text-sm text-muted-foreground">Browse and monitor network nodes</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <Input
              placeholder="Search nodes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 w-64 glass border-white/10 focus:border-[#00D1FF]/50"
            />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="glass rounded-xl border border-white/10 p-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <div>
              <p className="text-xs text-muted-foreground">Online</p>
              <p className="text-xl font-bold text-foreground">{nodeData.filter(n => n.status === 'online').length}</p>
            </div>
          </div>
        </div>
        <div className="glass rounded-xl border border-white/10 p-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div>
              <p className="text-xs text-muted-foreground">Warning</p>
              <p className="text-xl font-bold text-foreground">{nodeData.filter(n => n.status === 'warning').length}</p>
            </div>
          </div>
        </div>
        <div className="glass rounded-xl border border-white/10 p-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div>
              <p className="text-xs text-muted-foreground">Offline</p>
              <p className="text-xl font-bold text-foreground">{nodeData.filter(n => n.status === 'offline').length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Filter:</span>
        <Button
          variant={statusFilter === null ? 'default' : 'outline'}
          size="sm"
          onClick={() => setStatusFilter(null)}
          className={statusFilter === null ? 'bg-[#00D1FF]/20 text-[#00D1FF] border-[#00D1FF]/30' : 'glass border-white/10'}
        >
          All
        </Button>
        <Button
          variant={statusFilter === 'online' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setStatusFilter('online')}
          className={statusFilter === 'online' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'glass border-white/10'}
        >
          Online
        </Button>
        <Button
          variant={statusFilter === 'warning' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setStatusFilter('warning')}
          className={statusFilter === 'warning' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' : 'glass border-white/10'}
        >
          Warning
        </Button>
        <Button
          variant={statusFilter === 'offline' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setStatusFilter('offline')}
          className={statusFilter === 'offline' ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'glass border-white/10'}
        >
          Offline
        </Button>
      </div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl border border-white/10 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                {[
                  { key: 'id', label: 'Node ID' },
                  { key: 'status', label: 'Status' },
                  { key: 'region', label: 'Region' },
                  { key: 'uptime', label: 'Uptime' },
                  { key: 'latency', label: 'Latency' },
                  { key: 'throughput', label: 'Throughput' },
                  { key: 'reputation', label: 'Reputation' },
                ].map((col) => (
                  <th
                    key={col.key}
                    onClick={() => handleSort(col.key as SortKey)}
                    className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                  >
                    <div className="flex items-center gap-1">
                      {col.label}
                      {sortKey === col.key && (
                        <svg
                          className={`w-3 h-3 ${sortDirection === 'asc' && 'rotate-180'}`}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      )}
                    </div>
                  </th>
                ))}
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedNodes.map((node, index) => (
                <motion.tr
                  key={node.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="px-4 py-4">
                    <span className="font-mono text-sm text-[#00D1FF]">{node.id}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium border ${getStatusBadge(node.status)}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${getStatusColor(node.status)} ${node.status === 'online' && 'animate-pulse'}`} />
                      {node.status.charAt(0).toUpperCase() + node.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-foreground">{node.region}</td>
                  <td className="px-4 py-4 text-sm text-foreground">{node.uptime}%</td>
                  <td className="px-4 py-4 text-sm text-foreground">{node.latency}ms</td>
                  <td className="px-4 py-4 text-sm text-foreground">{node.throughput}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#00D1FF] to-[#4F46E5]"
                          style={{ width: `${node.reputation}%` }}
                        />
                      </div>
                      <span className="text-sm text-foreground">{node.reputation}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-[#00D1FF] transition-colors">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                        </svg>
                      </button>
                      <button className="p-2 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="1" />
                          <circle cx="19" cy="12" r="1" />
                          <circle cx="5" cy="12" r="1" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-white/10">
          <p className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
            {Math.min(currentPage * itemsPerPage, filteredNodes.length)} of {filteredNodes.length} nodes
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="glass border-white/10"
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="glass border-white/10"
            >
              Next
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
