import type { RealtimeEvent } from '@/src/types/api'
import { getArcHttpClient, getArcWsClient } from './arc-viem'

type BlockHandler = (event: Extract<RealtimeEvent, { type: 'block' }>) => void

let blockUnwatch: (() => void) | null = null
let reconnectAttempts = 0
const MAX_RECONNECT = 10
const listeners = new Set<BlockHandler>()

export function onArcBlock(handler: BlockHandler) {
  listeners.add(handler)
  ensureBlockSubscription()
  return () => {
    listeners.delete(handler)
    if (listeners.size === 0) stopBlockSubscription()
  }
}

function emitBlock(event: Extract<RealtimeEvent, { type: 'block' }>) {
  listeners.forEach((h) => {
    try {
      h(event)
    } catch (e) {
      console.error('[arc-subscriptions] block handler error', e)
    }
  })
}

function ensureBlockSubscription() {
  if (blockUnwatch) return

  try {
    const client = getArcWsClient()
    blockUnwatch = client.watchBlocks({
      onBlock: (block) => {
        reconnectAttempts = 0
        emitBlock({
          type: 'block',
          payload: {
            number: block.number ?? 0n,
            hash: block.hash ?? '0x',
            timestamp: Number(block.timestamp),
          },
        })
      },
      onError: (err) => {
        console.error('[arc-subscriptions] ws error', err)
        scheduleReconnect()
      },
    })
  } catch (err) {
    console.error('[arc-subscriptions] failed to start ws, falling back to poll', err)
    startPollingFallback()
  }
}

function scheduleReconnect() {
  stopBlockSubscription()
  if (reconnectAttempts >= MAX_RECONNECT) {
    startPollingFallback()
    return
  }
  reconnectAttempts++
  const delay = Math.min(1000 * 2 ** reconnectAttempts, 30_000)
  setTimeout(() => {
    if (listeners.size > 0) ensureBlockSubscription()
  }, delay)
}

let pollInterval: ReturnType<typeof setInterval> | null = null
let lastBlock = 0n

function startPollingFallback() {
  if (pollInterval) return
  const client = getArcHttpClient()
  pollInterval = setInterval(async () => {
    try {
      const block = await client.getBlock({ blockTag: 'latest' })
      if (block.number && block.number > lastBlock) {
        lastBlock = block.number
        emitBlock({
          type: 'block',
          payload: {
            number: block.number,
            hash: block.hash ?? '0x',
            timestamp: Number(block.timestamp),
          },
        })
      }
    } catch (e) {
      console.error('[arc-subscriptions] poll error', e)
    }
  }, 4_000)
}

function stopBlockSubscription() {
  if (blockUnwatch) {
    blockUnwatch()
    blockUnwatch = null
  }
  if (pollInterval) {
    clearInterval(pollInterval)
    pollInterval = null
  }
}

export function getSubscriptionStats() {
  return {
    blockListeners: listeners.size,
    wsActive: blockUnwatch !== null,
    pollingActive: pollInterval !== null,
    reconnectAttempts,
  }
}
