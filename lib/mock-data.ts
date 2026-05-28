// Mock data for ARC Pulse dashboard

export const networkStats = {
  totalNodes: 12847,
  activeValidators: 3421,
  networkThroughput: '2.4 TB/s',
  transactionsPerSecond: 45892,
  smartContracts: 28456,
  weeklyActivity: '+12.4%',
  networkUptime: 99.97,
  avgLatency: 23,
  regionalActivity: [
    { region: 'North America', percentage: 34 },
    { region: 'Europe', percentage: 28 },
    { region: 'Asia Pacific', percentage: 25 },
    { region: 'South America', percentage: 8 },
    { region: 'Africa', percentage: 5 },
  ],
  bandwidthUsage: 87,
}

export const nodeData = [
  { id: 'ARC-001', status: 'online', region: 'US-East', uptime: 99.99, latency: 12, throughput: '1.2 GB/s', reputation: 98 },
  { id: 'ARC-002', status: 'online', region: 'EU-West', uptime: 99.95, latency: 18, throughput: '980 MB/s', reputation: 96 },
  { id: 'ARC-003', status: 'warning', region: 'Asia-Pacific', uptime: 98.50, latency: 45, throughput: '750 MB/s', reputation: 89 },
  { id: 'ARC-004', status: 'online', region: 'US-West', uptime: 99.98, latency: 15, throughput: '1.1 GB/s', reputation: 97 },
  { id: 'ARC-005', status: 'offline', region: 'EU-Central', uptime: 0, latency: 0, throughput: '0 MB/s', reputation: 72 },
  { id: 'ARC-006', status: 'online', region: 'South America', uptime: 99.87, latency: 28, throughput: '890 MB/s', reputation: 94 },
  { id: 'ARC-007', status: 'online', region: 'Africa', uptime: 99.76, latency: 35, throughput: '650 MB/s', reputation: 91 },
  { id: 'ARC-008', status: 'online', region: 'US-Central', uptime: 99.92, latency: 14, throughput: '1.05 GB/s', reputation: 95 },
  { id: 'ARC-009', status: 'warning', region: 'Asia-East', uptime: 97.80, latency: 52, throughput: '580 MB/s', reputation: 85 },
  { id: 'ARC-010', status: 'online', region: 'EU-North', uptime: 99.94, latency: 20, throughput: '920 MB/s', reputation: 96 },
  { id: 'ARC-011', status: 'online', region: 'Oceania', uptime: 99.89, latency: 42, throughput: '780 MB/s', reputation: 93 },
  { id: 'ARC-012', status: 'online', region: 'Middle East', uptime: 99.85, latency: 32, throughput: '820 MB/s', reputation: 92 },
]

export const chartData = {
  throughput: [
    { time: '00:00', value: 2100 },
    { time: '04:00', value: 1800 },
    { time: '08:00', value: 2400 },
    { time: '12:00', value: 3200 },
    { time: '16:00', value: 2900 },
    { time: '20:00', value: 2600 },
    { time: '24:00', value: 2300 },
  ],
  transactions: [
    { time: '00:00', value: 35000 },
    { time: '04:00', value: 28000 },
    { time: '08:00', value: 42000 },
    { time: '12:00', value: 58000 },
    { time: '16:00', value: 52000 },
    { time: '20:00', value: 45000 },
    { time: '24:00', value: 38000 },
  ],
  nodeActivity: [
    { day: 'Mon', online: 12500, warning: 280, offline: 67 },
    { day: 'Tue', online: 12600, warning: 195, offline: 52 },
    { day: 'Wed', online: 12700, warning: 105, offline: 42 },
    { day: 'Thu', online: 12650, warning: 145, offline: 52 },
    { day: 'Fri', online: 12800, warning: 32, offline: 15 },
    { day: 'Sat', online: 12750, warning: 67, offline: 30 },
    { day: 'Sun', online: 12847, warning: 47, offline: 18 },
  ],
}

export const globalNodes = [
  { id: 1, lat: 40.7128, lng: -74.0060, city: 'New York', nodes: 1245, status: 'healthy' },
  { id: 2, lat: 51.5074, lng: -0.1278, city: 'London', nodes: 1089, status: 'healthy' },
  { id: 3, lat: 35.6762, lng: 139.6503, city: 'Tokyo', nodes: 987, status: 'healthy' },
  { id: 4, lat: 52.5200, lng: 13.4050, city: 'Berlin', nodes: 756, status: 'healthy' },
  { id: 5, lat: 1.3521, lng: 103.8198, city: 'Singapore', nodes: 892, status: 'warning' },
  { id: 6, lat: -33.8688, lng: 151.2093, city: 'Sydney', nodes: 543, status: 'healthy' },
  { id: 7, lat: 37.7749, lng: -122.4194, city: 'San Francisco', nodes: 1156, status: 'healthy' },
  { id: 8, lat: 48.8566, lng: 2.3522, city: 'Paris', nodes: 678, status: 'healthy' },
  { id: 9, lat: -23.5505, lng: -46.6333, city: 'São Paulo', nodes: 432, status: 'healthy' },
  { id: 10, lat: 25.2048, lng: 55.2708, city: 'Dubai', nodes: 389, status: 'healthy' },
  { id: 11, lat: 55.7558, lng: 37.6173, city: 'Moscow', nodes: 567, status: 'warning' },
  { id: 12, lat: 19.4326, lng: -99.1332, city: 'Mexico City', nodes: 298, status: 'healthy' },
  { id: 13, lat: 31.2304, lng: 121.4737, city: 'Shanghai', nodes: 834, status: 'healthy' },
  { id: 14, lat: 28.6139, lng: 77.2090, city: 'New Delhi', nodes: 445, status: 'healthy' },
  { id: 15, lat: -26.2041, lng: 28.0473, city: 'Johannesburg', nodes: 187, status: 'healthy' },
]

export const alerts = [
  { id: 1, type: 'warning', title: 'High Latency Detected', description: 'Node ARC-003 experiencing elevated latency', time: '2 min ago', node: 'ARC-003' },
  { id: 2, type: 'info', title: 'New Node Online', description: 'Node ARC-847 has joined the network', time: '15 min ago', node: 'ARC-847' },
  { id: 3, type: 'error', title: 'Node Offline', description: 'Node ARC-005 has gone offline', time: '32 min ago', node: 'ARC-005' },
  { id: 4, type: 'success', title: 'Network Upgrade Complete', description: 'Protocol v2.4.1 deployed successfully', time: '1 hour ago', node: null },
  { id: 5, type: 'warning', title: 'Throughput Spike', description: 'Unusual traffic detected in EU-West region', time: '2 hours ago', node: null },
]

export const apiEndpoints = [
  { method: 'GET', endpoint: '/api/v1/nodes', description: 'List all network nodes' },
  { method: 'GET', endpoint: '/api/v1/nodes/:id', description: 'Get specific node details' },
  { method: 'GET', endpoint: '/api/v1/stats', description: 'Get network statistics' },
  { method: 'GET', endpoint: '/api/v1/analytics', description: 'Get analytics data' },
  { method: 'WS', endpoint: '/ws/live', description: 'Real-time node updates' },
  { method: 'POST', endpoint: '/api/v1/alerts/subscribe', description: 'Subscribe to alerts' },
]

export const reputationBadges = [
  { name: 'Network Pioneer', description: 'Early network participant', icon: '🏆', tier: 'gold' },
  { name: 'Reliability Master', description: '99.9% uptime for 30 days', icon: '⭐', tier: 'platinum' },
  { name: 'High Performer', description: 'Top 10% throughput', icon: '🚀', tier: 'silver' },
  { name: 'Community Builder', description: 'Referred 10+ nodes', icon: '🤝', tier: 'bronze' },
]
