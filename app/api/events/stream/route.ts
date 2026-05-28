import { eventBus } from '@/src/subscriptions/event-bus'
import { startRealtimeBridge } from '@/src/subscriptions/realtime-bridge'
import type { RealtimeEvent } from '@/src/types/api'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET() {
  startRealtimeBridge()

  const encoder = new TextEncoder()
  let unsubscribe: (() => void) | undefined
  let heartbeat: ReturnType<typeof setInterval> | undefined
  let closed = false

  const stream = new ReadableStream({
    start(controller) {
      const safeEnqueue = (chunk: Uint8Array) => {
        if (closed) return
        try {
          controller.enqueue(chunk)
        } catch {
          closed = true
        }
      }

      const send = (event: RealtimeEvent) => {
        const data = JSON.stringify(event, (_, v) =>
          typeof v === 'bigint' ? v.toString() : v
        )
        safeEnqueue(encoder.encode(`data: ${data}\n\n`))
      }

      unsubscribe = eventBus.subscribe(send)

      heartbeat = setInterval(() => {
        safeEnqueue(encoder.encode(': heartbeat\n\n'))
      }, 15_000)
    },
    cancel() {
      closed = true
      unsubscribe?.()
      if (heartbeat) clearInterval(heartbeat)
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  })
}
