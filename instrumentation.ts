export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    try {
      const { startRealtimeBridge } = await import('@/src/subscriptions/realtime-bridge')
      startRealtimeBridge()
    } catch (err) {
      console.warn('[instrumentation] realtime bridge skipped:', err)
    }
  }
}
