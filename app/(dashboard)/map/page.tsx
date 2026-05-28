'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'
import { globalNodes } from '@/lib/mock-data'

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

export default function MapPage() {
  const [selectedNode, setSelectedNode] = useState<typeof globalNodes[0] | null>(null)
  const [hoveredNode, setHoveredNode] = useState<typeof globalNodes[0] | null>(null)

  const totalNodes = globalNodes.reduce((acc, node) => acc + node.nodes, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Global Network</h1>
          <p className="text-sm text-muted-foreground">
            {totalNodes.toLocaleString()} nodes across {globalNodes.length} regions
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#00D1FF]" />
            <span className="text-xs text-muted-foreground">Healthy</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="text-xs text-muted-foreground">Warning</span>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl border border-white/10 p-6 relative overflow-hidden"
      >
        {/* Map */}
        <div className="h-[500px] md:h-[600px]">
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              scale: 150,
              center: [0, 30],
            }}
            style={{ width: '100%', height: '100%' }}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#1e293b"
                    stroke="#334155"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: 'none' },
                      hover: { fill: '#334155', outline: 'none' },
                      pressed: { outline: 'none' },
                    }}
                  />
                ))
              }
            </Geographies>

            {/* Network Lines */}
            {globalNodes.map((node, i) =>
              globalNodes.slice(i + 1).map((targetNode, j) => {
                if (Math.random() > 0.7) return null
                return (
                  <line
                    key={`${node.id}-${targetNode.id}-${j}`}
                    x1={`${((node.lng + 180) / 360) * 100}%`}
                    y1={`${((90 - node.lat) / 180) * 100}%`}
                    x2={`${((targetNode.lng + 180) / 360) * 100}%`}
                    y2={`${((90 - targetNode.lat) / 180) * 100}%`}
                    stroke="rgba(0, 209, 255, 0.1)"
                    strokeWidth={0.5}
                  />
                )
              })
            )}

            {/* Node Markers */}
            {globalNodes.map((node) => (
              <Marker
                key={node.id}
                coordinates={[node.lng, node.lat]}
                onMouseEnter={() => setHoveredNode(node)}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => setSelectedNode(node)}
              >
                <g style={{ cursor: 'pointer' }}>
                  {/* Pulse ring */}
                  <circle
                    r={12}
                    fill={node.status === 'healthy' ? 'rgba(0, 209, 255, 0.2)' : 'rgba(234, 179, 8, 0.2)'}
                    className="animate-ping"
                  />
                  {/* Inner dot */}
                  <circle
                    r={6}
                    fill={node.status === 'healthy' ? '#00D1FF' : '#eab308'}
                    stroke="#0B1020"
                    strokeWidth={2}
                  />
                  {/* Node count indicator */}
                  <circle
                    r={3}
                    fill="#ffffff"
                    opacity={node.nodes > 500 ? 1 : 0.5}
                  />
                </g>
              </Marker>
            ))}
          </ComposableMap>
        </div>

        {/* Hover Tooltip */}
        {hoveredNode && (
          <div className="absolute top-4 right-4 glass rounded-xl border border-white/10 p-4 min-w-[200px]">
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`w-2 h-2 rounded-full ${
                  hoveredNode.status === 'healthy' ? 'bg-[#00D1FF]' : 'bg-yellow-500'
                }`}
              />
              <span className="font-semibold text-foreground">{hoveredNode.city}</span>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">
                Nodes: <span className="text-foreground">{hoveredNode.nodes.toLocaleString()}</span>
              </p>
              <p className="text-sm text-muted-foreground">
                Status:{' '}
                <span className={hoveredNode.status === 'healthy' ? 'text-green-400' : 'text-yellow-400'}>
                  {hoveredNode.status.charAt(0).toUpperCase() + hoveredNode.status.slice(1)}
                </span>
              </p>
            </div>
          </div>
        )}
      </motion.div>

      {/* Region Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {globalNodes
          .sort((a, b) => b.nodes - a.nodes)
          .slice(0, 5)
          .map((node, index) => (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`glass rounded-xl border p-4 cursor-pointer transition-all ${
                selectedNode?.id === node.id
                  ? 'border-[#00D1FF]/50 bg-[#00D1FF]/5'
                  : 'border-white/10 hover:border-white/20'
              }`}
              onClick={() => setSelectedNode(node)}
            >
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    node.status === 'healthy' ? 'bg-[#00D1FF]' : 'bg-yellow-500'
                  }`}
                />
                <span className="text-sm font-medium text-foreground">{node.city}</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{node.nodes.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">nodes</p>
            </motion.div>
          ))}
      </div>

      {/* All Regions Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass rounded-2xl border border-white/10 overflow-hidden"
      >
        <div className="p-4 border-b border-white/10">
          <h3 className="text-lg font-semibold text-foreground">All Regions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  City
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Nodes
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Coordinates
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Share
                </th>
              </tr>
            </thead>
            <tbody>
              {globalNodes.map((node) => (
                <tr
                  key={node.id}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
                  onClick={() => setSelectedNode(node)}
                >
                  <td className="px-4 py-3 text-sm text-foreground font-medium">{node.city}</td>
                  <td className="px-4 py-3 text-sm text-foreground">{node.nodes.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium border ${
                        node.status === 'healthy'
                          ? 'bg-green-500/20 text-green-400 border-green-500/30'
                          : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          node.status === 'healthy' ? 'bg-green-500' : 'bg-yellow-500'
                        }`}
                      />
                      {node.status.charAt(0).toUpperCase() + node.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground font-mono">
                    {node.lat.toFixed(2)}, {node.lng.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground">
                    {((node.nodes / totalNodes) * 100).toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}
