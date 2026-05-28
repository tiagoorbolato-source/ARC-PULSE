import { jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import type { SessionUser } from '@/src/types/api'
import { requireJwtSecret } from '@/src/config/env'

const COOKIE_NAME = 'arc_pulse_session'

export type JwtPayload = {
  sub: string
  wallet: string
  username?: string | null
}

export async function signSessionToken(payload: JwtPayload): Promise<string> {
  const { SignJWT } = await import('jose')
  const secret = new TextEncoder().encode(requireJwtSecret())
  return new SignJWT({ wallet: payload.wallet, username: payload.username ?? null })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret)
}

export async function verifySessionToken(token: string): Promise<JwtPayload | null> {
  try {
    const secret = new TextEncoder().encode(requireJwtSecret())
    const { payload } = await jwtVerify(token, secret)
    return {
      sub: payload.sub as string,
      wallet: payload.wallet as string,
      username: (payload.username as string | null) ?? null,
    }
  } catch {
    return null
  }
}

export async function getSessionFromRequest(request: Request): Promise<SessionUser | null> {
  const authHeader = request.headers.get('authorization')
  let token: string | undefined

  if (authHeader?.startsWith('Bearer ')) {
    token = authHeader.slice(7)
  } else {
    const cookieStore = await cookies()
    token = cookieStore.get(COOKIE_NAME)?.value
  }

  if (!token) return null
  const payload = await verifySessionToken(token)
  if (!payload) return null

  return {
    id: payload.sub,
    walletAddress: payload.wallet,
    username: payload.username ?? null,
    avatar: null,
  }
}

export function sessionCookieOptions(token: string) {
  return {
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  }
}

export { COOKIE_NAME }
