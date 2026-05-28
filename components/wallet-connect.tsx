'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ensureArcTestnetInWallet } from '@/lib/wallet/arc-network'
import { cn } from '@/lib/utils'

type WalletConnectButtonProps = {
  className?: string
  size?: 'default' | 'lg'
  label?: string
}

export function WalletConnectButton({
  className,
  size = 'default',
  label = 'Connect Wallet',
}: WalletConnectButtonProps) {
  const { address, isConnected } = useAccount()
  const { connect, connectors, isPending, error: connectError } = useConnect()
  const { disconnect } = useDisconnect()
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [localError, setLocalError] = useState<string | null>(null)

  useEffect(() => setMounted(true), [])

  const shorten = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`

  async function handleConnect(connectorId: string) {
    setLocalError(null)
    const connector = connectors.find((c) => c.id === connectorId || c.uid === connectorId)
    if (!connector) {
      setLocalError('Carteira não disponível.')
      return
    }

    connect(
      { connector },
      {
        onSuccess: async () => {
          try {
            await ensureArcTestnetInWallet()
            setOpen(false)
          } catch (e) {
            setLocalError(
              e instanceof Error ? e.message : 'Conectado — aceite trocar para ARC Testnet no MetaMask.'
            )
          }
        },
        onError: (e) => {
          setLocalError(e.message || 'Falha ao conectar. Verifique se o MetaMask está desbloqueado.')
        },
      }
    )
  }

  if (isConnected && address) {
    return (
      <Button
        variant="outline"
        size={size === 'lg' ? 'lg' : 'default'}
        className={cn(
          'glass border-[#00D1FF]/30 hover:border-[#00D1FF]/50 font-mono',
          size === 'lg' && 'h-12 px-8 text-base',
          className
        )}
        onClick={() => disconnect()}
      >
        <span className="mr-2 inline-block h-2 w-2 rounded-full bg-green-500" />
        {shorten(address)}
      </Button>
    )
  }

  return (
    <>
      <Button
        type="button"
        size={size === 'lg' ? 'lg' : 'default'}
        className={cn(
          'bg-gradient-to-r from-[#00D1FF] to-[#4F46E5] text-white border-0 hover:opacity-90',
          size === 'lg' && 'h-12 px-8 text-base',
          size === 'default' && 'h-20 px-10 text-2xl rounded-xl',
          className
        )}
        disabled={isPending}
        onClick={() => setOpen(true)}
      >
        {isPending ? 'Conectando…' : label}
      </Button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[200] flex min-h-screen items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
                onClick={() => setOpen(false)}
              >
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  className="glass w-full max-w-md rounded-2xl border border-white/10 p-6"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-foreground">Conectar carteira</h2>
                    <button
                      type="button"
                      className="text-muted-foreground hover:text-foreground"
                      onClick={() => setOpen(false)}
                    >
                      ✕
                    </button>
                  </div>

                  <p className="mb-4 text-sm text-muted-foreground">
                    Rede: <strong className="text-foreground">ARC Testnet</strong> (Chain ID 5042002) · Gas em USDC
                  </p>

                  <div className="space-y-3">
                    {connectors.length === 0 && (
                      <p className="text-sm text-yellow-400">
                        Nenhuma carteira detectada. Instale{' '}
                        <a
                          href="https://metamask.io"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline"
                        >
                          MetaMask
                        </a>{' '}
                        e recarregue a página.
                      </p>
                    )}
                    {connectors.map((connector) => (
                      <button
                        key={connector.uid}
                        type="button"
                        disabled={isPending}
                        onClick={() => handleConnect(connector.uid)}
                        className="flex w-full items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 transition-all hover:border-[#00D1FF]/30 hover:bg-white/10 disabled:opacity-50"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#00D1FF]/20 to-[#4F46E5]/20 text-[#00D1FF]">
                          ◈
                        </div>
                        <span className="font-medium text-foreground">{connector.name}</span>
                      </button>
                    ))}
                  </div>

                  {(localError || connectError) && (
                    <p className="mt-4 text-sm text-red-400">
                      {localError ?? connectError?.message}
                    </p>
                  )}

                  <p className="mt-6 text-center text-xs text-muted-foreground">
                    Após conectar, aceite adicionar/trocar para ARC Testnet se o MetaMask pedir.
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  )
}
