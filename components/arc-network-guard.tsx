'use client'

import { useEffect, useState } from 'react'
import { useAccount, useChainId, useSwitchChain } from 'wagmi'
import { arcTestnet, ARC_CHAIN_ID } from '@/lib/chains/arc'
import { Button } from '@/components/ui/button'

export function ArcNetworkGuard() {
  const { isConnected } = useAccount()
  const chainId = useChainId()
  const { switchChain, isPending } = useSwitchChain()
  const [dismissed, setDismissed] = useState(false)

  const wrongNetwork = isConnected && chainId !== ARC_CHAIN_ID

  useEffect(() => {
    if (!wrongNetwork) setDismissed(false)
  }, [wrongNetwork])

  if (!wrongNetwork || dismissed) return null

  return (
    <div className="fixed bottom-6 left-1/2 z-[90] w-full max-w-lg -translate-x-1/2 px-4">
      <div className="glass flex flex-col gap-3 rounded-xl border border-yellow-500/30 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-medium text-foreground">Wrong network</p>
          <p className="text-sm text-muted-foreground">
            Switch to <strong>ARC Testnet</strong> (Chain ID {ARC_CHAIN_ID}). Gas is paid in USDC.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            className="bg-gradient-to-r from-[#00D1FF] to-[#4F46E5] text-white"
            disabled={isPending}
            onClick={() => switchChain({ chainId: arcTestnet.id })}
          >
            {isPending ? 'Switching…' : 'Switch to ARC'}
          </Button>
          <Button size="sm" variant="ghost" onClick={() => setDismissed(true)}>
            Dismiss
          </Button>
        </div>
      </div>
    </div>
  )
}
