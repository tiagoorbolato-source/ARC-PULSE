'use client'

import { useEffect, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import type { RealtimeEvent } from '@/src/types/api'

export function useRealtimeEvents() {
  const queryClient = useQueryClient()
  const [lastEvent, setLastEvent] = useState<RealtimeEvent | null>(null)
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    const source = new EventSource('/api/events/stream')

    source.onopen = () => setConnected(true)
    source.onerror = () => setConnected(false)

    source.onmessage = (msg) => {
      try {
        const event = JSON.parse(msg.data) as RealtimeEvent
        setLastEvent(event)

        if (event.type === 'metrics') {
          queryClient.setQueryData(['network', 'metrics'], event.payload)
        }
        if (event.type === 'block' || event.type === 'node_update') {
          queryClient.invalidateQueries({ queryKey: ['network'] })
        }
        if (event.type === 'alert') {
          queryClient.invalidateQueries({ queryKey: ['alerts'] })
        }
      } catch {
        /* heartbeat or parse error */
      }
    }

    return () => source.close()
  }, [queryClient])

  return { lastEvent, connected }
}
