import { SiweMessage } from 'siwe'
import { getAddress } from 'viem'
import { ARC_CHAIN_ID, ARC_SIWE_DOMAIN, ARC_SIWE_STATEMENT } from '@/src/config/arc'
import { cacheGet, cacheSet, cacheDelete } from '@/src/cache/memory'
import { getSupabaseAdmin, isSupabaseConfigured } from '@/src/database/supabase'
import { signSessionToken } from '@/src/middleware/auth'

const NONCE_TTL = 300 // 5 min

function nonceKey(wallet: string) {
  return `siwe:nonce:${wallet.toLowerCase()}`
}

export async function createNonce(walletAddress: string): Promise<string> {
  const wallet = getAddress(walletAddress)
  const nonce = crypto.randomUUID().replace(/-/g, '')

  if (isSupabaseConfigured()) {
    const db = getSupabaseAdmin()
    const expires = new Date(Date.now() + NONCE_TTL * 1000).toISOString()
    await db.from('auth_nonces' as never).upsert({
      wallet_address: wallet.toLowerCase(),
      nonce,
      expires_at: expires,
    } as never)
  } else {
    cacheSet(nonceKey(wallet), nonce, NONCE_TTL)
  }

  return nonce
}

async function consumeNonce(wallet: string, nonce: string): Promise<boolean> {
  if (isSupabaseConfigured()) {
    const db = getSupabaseAdmin()
    const { data } = await db
      .from('auth_nonces' as never)
      .select('nonce, expires_at')
      .eq('wallet_address', wallet.toLowerCase())
      .single()

    if (!data) return false
    const row = data as { nonce: string; expires_at: string }
    if (row.nonce !== nonce) return false
    if (new Date(row.expires_at) < new Date()) return false
    await db.from('auth_nonces' as never).delete().eq('wallet_address', wallet.toLowerCase())
    return true
  }

  const stored = cacheGet<string>(nonceKey(wallet))
  if (!stored || stored !== nonce) return false
  cacheDelete(nonceKey(wallet))
  return true
}

export async function verifySiweAndCreateSession(params: {
  message: string
  signature: string
}): Promise<{ token: string; user: { id: string; walletAddress: string } }> {
  const siweMessage = new SiweMessage(params.message)
  const fields = await siweMessage.verify({
    signature: params.signature,
  })

  if (fields.data.chainId !== ARC_CHAIN_ID) {
    throw new Error(`Invalid chain. Expected ARC Testnet (${ARC_CHAIN_ID}).`)
  }

  const wallet = getAddress(fields.data.address)
  const validNonce = await consumeNonce(wallet, fields.data.nonce)
  if (!validNonce) throw new Error('Invalid or expired nonce.')

  let userId: string

  if (isSupabaseConfigured()) {
    const db = getSupabaseAdmin()
    const { data: existing } = await db
      .from('users')
      .select('id')
      .eq('wallet_address', wallet.toLowerCase())
      .maybeSingle()

    if (existing) {
      userId = existing.id
    } else {
      const { data: created, error } = await db
        .from('users')
        .insert({ wallet_address: wallet.toLowerCase() })
        .select('id')
        .single()
      if (error || !created) throw new Error('Failed to create user profile.')
      userId = created.id
    }
  } else {
    userId = `local-${wallet.toLowerCase()}`
  }

  const token = await signSessionToken({
    sub: userId,
    wallet: wallet.toLowerCase(),
  })

  return { token, user: { id: userId, walletAddress: wallet.toLowerCase() } }
}

export function buildSiweMessage(walletAddress: string, nonce: string): string {
  const wallet = getAddress(walletAddress)
  const message = new SiweMessage({
    domain: ARC_SIWE_DOMAIN,
    address: wallet,
    statement: ARC_SIWE_STATEMENT,
    uri: process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
    version: '1',
    chainId: ARC_CHAIN_ID,
    nonce,
  })
  return message.prepareMessage()
}
