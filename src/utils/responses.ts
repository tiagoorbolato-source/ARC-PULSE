import { NextResponse } from 'next/server'
import type { ApiResponse } from '@/src/types/api'

export function jsonOk<T>(data: T, init?: { status?: number; headers?: HeadersInit; cached?: boolean }) {
  const body: ApiResponse<T> = { success: true, data, cached: init?.cached }
  return NextResponse.json(body, {
    status: init?.status ?? 200,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.cached ? { 'X-Cache': 'HIT' } : {}),
      ...init?.headers,
    },
  })
}

export function jsonError(
  message: string,
  status = 400,
  code?: string
) {
  const body: ApiResponse<never> = { success: false, error: message, code }
  return NextResponse.json(body, { status })
}

export function jsonUnauthorized(message = 'Unauthorized') {
  return jsonError(message, 401, 'UNAUTHORIZED')
}

export function jsonRateLimited() {
  return jsonError('Too many requests', 429, 'RATE_LIMITED')
}
