'use client'

import { SiweMessage } from 'siwe'
import { ARC_CHAIN_ID } from '@/lib/chains/arc'
import { api } from '@/lib/api/client'

const DOMAIN =
  typeof window !== 'undefined' ? window.location.host : 'localhost:3000'

const STATEMENT =
  'Sign in to ARC Pulse — Web3 infrastructure intelligence for the ARC network.'

export async function signInWithEthereum(
  address: `0x${string}`,
  signMessageAsync: (args: { message: string }) => Promise<string>
) {
  const { nonce } = await api.auth.nonce(address)

  const message = new SiweMessage({
    domain: DOMAIN,
    address,
    statement: STATEMENT,
    uri: typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000',
    version: '1',
    chainId: ARC_CHAIN_ID,
    nonce,
  }).prepareMessage()

  const signature = await signMessageAsync({ message })
  return api.auth.verify(message, signature)
}
