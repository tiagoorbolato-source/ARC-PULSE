import type { RealtimeEvent } from '@/src/types/api'

type Handler = (event: RealtimeEvent) => void

class EventBus {
  private handlers = new Set<Handler>()

  subscribe(handler: Handler) {
    this.handlers.add(handler)
    return () => this.handlers.delete(handler)
  }

  publish(event: RealtimeEvent) {
    this.handlers.forEach((h) => {
      try {
        h(event)
      } catch (e) {
        console.error('[event-bus]', e)
      }
    })
  }

  get subscriberCount() {
    return this.handlers.size
  }
}

export const eventBus = new EventBus()
