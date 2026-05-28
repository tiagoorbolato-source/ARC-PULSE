'use client'

import Link from 'next/link'
import { WalletConnectButton } from '@/components/wallet-connect'

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-32 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#00D1FF] to-[#4F46E5] flex items-center justify-center">
            <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>
          <span className="text-4xl font-semibold text-foreground">ARC Pulse</span>
        </Link>

        <nav className="hidden md:flex items-center gap-16">
          <Link href="/dashboard" className="text-2xl text-muted-foreground hover:text-foreground transition-colors">
            Dashboard
          </Link>
          <Link href="/nodes" className="text-2xl text-muted-foreground hover:text-foreground transition-colors">
            Nodes
          </Link>
          <Link href="/analytics" className="text-2xl text-muted-foreground hover:text-foreground transition-colors">
            Analytics
          </Link>
          <Link href="/api-docs" className="text-2xl text-muted-foreground hover:text-foreground transition-colors">
            API
          </Link>
        </nav>

        <WalletConnectButton />
      </div>
    </header>
  )
}
