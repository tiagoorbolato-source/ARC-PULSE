'use client'

import { useEffect, useRef } from 'react'
import { useAccount, useSignMessage } from 'wagmi'
import { signInWithEthereum } from '@/lib/auth/siwe'
import { api } from '@/lib/api/client'

/** Login SIWE opcional após conectar — não bloqueia a conexão da carteira */
export function AuthSync() {
  const { address, isConnected } = useAccount()
  const { signMessageAsync } = useSignMessage()
  const attempted = useRef<string | null>(null)

  useEffect(() => {
    if (!isConnected || !address) {
      attempted.current = null
      return
    }
    if (attempted.current === address) return

    let cancelled = false

    async function sync() {
      try {
        await api.auth.session()
        attempted.current = address
      } catch {
        if (cancelled) return
        try {
          await signInWithEthereum(address as `0x${string}`, signMessageAsync)
          attempted.current = address
        } catch {
          // Usuário recusou assinatura ou backend indisponível — carteira segue conectada
          attempted.current = address
        }
      }
    }

    const t = setTimeout(sync, 800)
    return () => {
      cancelled = true
      clearTimeout(t)
    }
  }, [isConnected, address, signMessageAsync])

  return null
}
