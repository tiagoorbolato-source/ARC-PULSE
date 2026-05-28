'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { WalletConnectButton } from '@/components/wallet-connect'
import { useAccount } from 'wagmi'

export function HeroSection() {
  const { isConnected } = useAccount()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid opacity-50" />
      
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00D1FF]/20 rounded-full blur-[128px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#4F46E5]/20 rounded-full blur-[128px] animate-pulse-slow" style={{ animationDelay: '1.5s' }} />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#00D1FF]/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[#00D1FF]/20 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-[#00D1FF] animate-pulse" />
          <span className="text-sm text-muted-foreground">Network Status: <span className="text-[#00D1FF]">Operational</span></span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 text-balance"
        >
          Real-Time Intelligence for the{' '}
          <span className="text-gradient">ARC Network</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed text-balance"
        >
          Advanced analytics, infrastructure monitoring, and decentralized network intelligence 
          for the next generation of Web3 builders.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button asChild size="lg" className="bg-gradient-to-r from-[#00D1FF] to-[#4F46E5] hover:opacity-90 text-white border-0 px-8 h-12 text-base">
            <Link href="/dashboard">
              Launch Dashboard
              <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </Button>
          {!isConnected && (
            <WalletConnectButton
              size="lg"
              className="glass border border-white/20 hover:border-[#00D1FF]/50 !bg-transparent !from-transparent !to-transparent text-foreground"
              label="Connect Wallet"
            />
          )}
        </motion.div>

        {/* Stats Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
        >
          <StatCard label="Total Nodes" value="12,847" trend="+2.4%" />
          <StatCard label="Active Validators" value="3,421" trend="+5.1%" />
          <StatCard label="Throughput" value="2.4 TB/s" trend="+12%" />
          <StatCard label="Network Uptime" value="99.97%" />
        </motion.div>

        {/* Analytics Preview */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-16 relative"
        >
          <div className="glass rounded-2xl border border-white/10 p-6 md:p-8 overflow-hidden">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#00D1FF]/5 to-transparent pointer-events-none" />
            
            {/* Mock Dashboard */}
            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <span className="text-xs text-muted-foreground font-mono">arc-pulse.network/dashboard</span>
              </div>

              {/* Chart Visualization */}
              <div className="h-48 md:h-64 flex items-end justify-between gap-2 px-4">
                {[65, 45, 75, 55, 85, 60, 90, 70, 95, 80, 88, 72].map((height, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 rounded-t-sm bg-gradient-to-t from-[#00D1FF] to-[#4F46E5]"
                    style={{ height: `${height}%` }}
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ duration: 0.5, delay: 0.8 + i * 0.05 }}
                  />
                ))}
              </div>

              {/* Time labels */}
              <div className="flex justify-between px-4 mt-4">
                {['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'].map((time) => (
                  <span key={time} className="text-xs text-muted-foreground font-mono">{time}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Floating metric cards */}
          <motion.div 
            className="absolute -left-4 md:-left-8 top-1/4 glass rounded-xl border border-white/10 p-4 animate-float"
            style={{ animationDelay: '0s' }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                  <polyline points="16 7 22 7 22 13" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">TPS</p>
                <p className="text-lg font-semibold text-foreground">45,892</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="absolute -right-4 md:-right-8 top-1/3 glass rounded-xl border border-white/10 p-4 animate-float"
            style={{ animationDelay: '2s' }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#00D1FF]/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-[#00D1FF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Latency</p>
                <p className="text-lg font-semibold text-foreground">23ms</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function StatCard({ label, value, trend }: { label: string; value: string; trend?: string }) {
  return (
    <div className="glass rounded-xl border border-white/10 p-4 md:p-6 text-left hover:border-[#00D1FF]/30 transition-colors">
      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">{label}</p>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl md:text-3xl font-bold text-foreground">{value}</span>
        {trend && (
          <span className="text-xs text-green-500 flex items-center">
            <svg className="w-3 h-3 mr-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="18 15 12 9 6 15" />
            </svg>
            {trend}
          </span>
        )}
      </div>
    </div>
  )
}
