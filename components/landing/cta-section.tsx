'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function CTASection() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050816] via-[#0B1020] to-[#050816]" />
      <div className="absolute inset-0 bg-grid opacity-30" />
      
      {/* Gradient orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00D1FF]/10 rounded-full blur-[128px]" />
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#4F46E5]/10 rounded-full blur-[128px]" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass rounded-3xl border border-white/10 p-8 md:p-12 text-center"
        >
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-[#00D1FF]/10 via-transparent to-[#4F46E5]/10 pointer-events-none" />

          <div className="relative">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
              Ready to Build on{' '}
              <span className="text-gradient">ARC?</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
              Join thousands of developers monitoring and building on the ARC network. 
              Get started with our free tier today.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="bg-gradient-to-r from-[#00D1FF] to-[#4F46E5] hover:opacity-90 text-white border-0 px-8 h-12 text-base">
                <Link href="/dashboard">
                  Get Started Free
                  <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="glass border-white/20 hover:border-[#00D1FF]/50 px-8 h-12 text-base">
                <Link href="/api-docs">
                  View Documentation
                </Link>
              </Button>
            </div>

            {/* Trust badges */}
            <div className="flex items-center justify-center gap-8 mt-12 pt-8 border-t border-white/10">
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">12K+</p>
                <p className="text-xs text-muted-foreground">Active Nodes</p>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">99.97%</p>
                <p className="text-xs text-muted-foreground">Uptime</p>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">45K+</p>
                <p className="text-xs text-muted-foreground">TPS</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
