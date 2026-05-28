'use client'

import { motion } from 'framer-motion'
import { useAccount } from 'wagmi'
import { reputationBadges } from '@/lib/mock-data'

export default function ReputationPage() {
  const { isConnected, address } = useAccount()

  const userStats = {
    totalScore: 847,
    rank: 1245,
    totalUsers: 28456,
    nodesOperated: 3,
    avgUptime: 99.87,
    contributionPoints: 2450,
    memberSince: 'March 2024',
  }

  const achievements = [
    { name: 'First Node', description: 'Operated your first node', earned: true, date: 'Mar 2024' },
    { name: '30 Day Streak', description: '30 days of 99%+ uptime', earned: true, date: 'Apr 2024' },
    { name: '90 Day Streak', description: '90 days of 99%+ uptime', earned: false, progress: 67 },
    { name: 'Top 1%', description: 'Reach top 1% of operators', earned: false, progress: 45 },
    { name: 'Multi-Node', description: 'Operate 5+ nodes', earned: false, progress: 60 },
  ]

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00D1FF]/20 to-[#4F46E5]/20 flex items-center justify-center mb-6">
          <svg className="w-8 h-8 text-[#00D1FF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Connect to View Reputation</h1>
        <p className="text-muted-foreground mb-6 max-w-md">
          Connect your wallet to view your reputation score, badges, and achievements.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Reputation</h1>
        <p className="text-sm text-muted-foreground">Your network contribution and standing</p>
      </div>

      {/* Score Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl border border-white/10 p-6 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#00D1FF]/10 via-transparent to-[#4F46E5]/10" />
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#00D1FF] to-[#4F46E5] flex items-center justify-center">
              <span className="text-3xl font-bold text-white">{userStats.totalScore}</span>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Reputation Score</p>
              <p className="text-4xl font-bold text-foreground">{userStats.totalScore}</p>
              <p className="text-sm text-muted-foreground">
                Rank #{userStats.rank.toLocaleString()} of {userStats.totalUsers.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{userStats.nodesOperated}</p>
              <p className="text-xs text-muted-foreground">Nodes</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-[#00D1FF]">{userStats.avgUptime}%</p>
              <p className="text-xs text-muted-foreground">Avg Uptime</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{userStats.contributionPoints.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Points</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-foreground">{userStats.memberSince}</p>
              <p className="text-xs text-muted-foreground">Member Since</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Badges */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Earned Badges</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {reputationBadges.map((badge, index) => {
            const tierColors = {
              platinum: 'from-gray-200 to-gray-400',
              gold: 'from-yellow-400 to-amber-500',
              silver: 'from-gray-300 to-gray-500',
              bronze: 'from-orange-400 to-orange-600',
            }
            return (
              <motion.div
                key={badge.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-xl border border-white/10 p-4 text-center hover:border-[#00D1FF]/30 transition-colors"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${
                    tierColors[badge.tier as keyof typeof tierColors]
                  } flex items-center justify-center mx-auto mb-3`}
                >
                  <span className="text-2xl">{badge.icon}</span>
                </div>
                <p className="font-medium text-foreground text-sm">{badge.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{badge.description}</p>
                <span className="inline-block mt-2 text-xs px-2 py-0.5 rounded bg-white/10 text-muted-foreground capitalize">
                  {badge.tier}
                </span>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Achievements */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Achievements</h2>
        <div className="space-y-3">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`glass rounded-xl border p-4 flex items-center gap-4 ${
                achievement.earned ? 'border-green-500/30 bg-green-500/5' : 'border-white/10'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  achievement.earned ? 'bg-green-500/20' : 'bg-white/5'
                }`}
              >
                {achievement.earned ? (
                  <svg className="w-6 h-6 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-foreground">{achievement.name}</p>
                  {achievement.earned && (
                    <span className="text-xs px-2 py-0.5 rounded bg-green-500/20 text-green-400 border border-green-500/30">
                      Earned
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{achievement.description}</p>
                {!achievement.earned && achievement.progress && (
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#00D1FF] to-[#4F46E5] rounded-full"
                        style={{ width: `${achievement.progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">{achievement.progress}%</span>
                  </div>
                )}
              </div>
              {achievement.earned && (
                <span className="text-xs text-muted-foreground">{achievement.date}</span>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Leaderboard Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass rounded-2xl border border-white/10 p-6"
      >
        <h2 className="text-lg font-semibold text-foreground mb-4">Top Contributors</h2>
        <div className="space-y-3">
          {[
            { rank: 1, address: '0x1234...abcd', score: 2847, uptime: 99.99 },
            { rank: 2, address: '0x5678...efgh', score: 2654, uptime: 99.98 },
            { rank: 3, address: '0x9abc...ijkl', score: 2512, uptime: 99.97 },
            { rank: 4, address: '0xdef0...mnop', score: 2489, uptime: 99.95 },
            { rank: 5, address: '0x1357...qrst', score: 2401, uptime: 99.94 },
          ].map((user) => (
            <div
              key={user.rank}
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors"
            >
              <span
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                  user.rank === 1
                    ? 'bg-yellow-500/20 text-yellow-400'
                    : user.rank === 2
                    ? 'bg-gray-400/20 text-gray-400'
                    : user.rank === 3
                    ? 'bg-orange-500/20 text-orange-400'
                    : 'bg-white/5 text-muted-foreground'
                }`}
              >
                {user.rank}
              </span>
              <span className="font-mono text-sm text-foreground flex-1">{user.address}</span>
              <span className="text-sm text-[#00D1FF] font-semibold">{user.score}</span>
              <span className="text-xs text-muted-foreground">{user.uptime}%</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
