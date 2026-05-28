import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#050816]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00D1FF] to-[#4F46E5] flex items-center justify-center">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </div>
              <span className="text-lg font-semibold text-foreground">ARC Pulse</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Real-time intelligence for the ARC network. Monitor, analyze, and build on next-gen Web3 infrastructure.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">Platform</h4>
            <ul className="space-y-3">
              <li><Link href="/dashboard" className="text-sm text-foreground/70 hover:text-[#00D1FF] transition-colors">Dashboard</Link></li>
              <li><Link href="/nodes" className="text-sm text-foreground/70 hover:text-[#00D1FF] transition-colors">Node Explorer</Link></li>
              <li><Link href="/analytics" className="text-sm text-foreground/70 hover:text-[#00D1FF] transition-colors">Analytics</Link></li>
              <li><Link href="/map" className="text-sm text-foreground/70 hover:text-[#00D1FF] transition-colors">Global Map</Link></li>
            </ul>
          </div>

          {/* Developers */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">Developers</h4>
            <ul className="space-y-3">
              <li><Link href="/api-docs" className="text-sm text-foreground/70 hover:text-[#00D1FF] transition-colors">API Docs</Link></li>
              <li><Link href="/api-docs#graphql" className="text-sm text-foreground/70 hover:text-[#00D1FF] transition-colors">GraphQL</Link></li>
              <li><Link href="/api-docs#websocket" className="text-sm text-foreground/70 hover:text-[#00D1FF] transition-colors">WebSocket</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">Resources</h4>
            <ul className="space-y-3">
              <li><Link href="/docs" className="text-sm text-foreground/70 hover:text-[#00D1FF] transition-colors">Documentation</Link></li>
              <li><Link href="/blog" className="text-sm text-foreground/70 hover:text-[#00D1FF] transition-colors">Blog</Link></li>
              <li><Link href="/community" className="text-sm text-foreground/70 hover:text-[#00D1FF] transition-colors">Community</Link></li>
              <li><Link href="/support" className="text-sm text-foreground/70 hover:text-[#00D1FF] transition-colors">Support</Link></li>
            </ul>
          </div>

          {/* Status */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">Status</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/status" className="flex items-center gap-2 text-sm text-foreground/70 hover:text-[#00D1FF] transition-colors">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  Network Status
                </Link>
              </li>
              <li>
                <Link href="/status/api" className="flex items-center gap-2 text-sm text-foreground/70 hover:text-[#00D1FF] transition-colors">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  API Status
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-16 pt-8 border-t border-white/5">
          <p className="text-xs text-muted-foreground">
            © 2026 ARC Pulse. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-[#00D1FF] transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-[#00D1FF] transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
