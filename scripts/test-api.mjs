/**
 * ARC Pulse API smoke test — run: node scripts/test-api.mjs
 */
const BASE = process.env.BASE_URL ?? 'http://localhost:3000'

async function test(name, fn) {
  try {
    const result = await fn()
    console.log(`✓ ${name}`)
    return { ok: true, result }
  } catch (e) {
    console.log(`✗ ${name}: ${e.message}`)
    return { ok: false, error: e.message }
  }
}

async function get(path) {
  const res = await fetch(`${BASE}${path}`)
  const json = await res.json()
  if (!res.ok) throw new Error(`${res.status} ${JSON.stringify(json)}`)
  if (!json.success) throw new Error(json.error ?? 'not success')
  return json.data
}

async function post(path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const json = await res.json()
  if (!res.ok && res.status !== 401) throw new Error(`${res.status} ${JSON.stringify(json)}`)
  return { status: res.status, json }
}

async function main() {
  console.log(`Testing ${BASE}\n`)
  const results = []

  results.push(await test('GET /api/network/status', () => get('/api/network/status')))
  results.push(await test('GET /api/network/metrics', () => get('/api/network/metrics')))
  results.push(await test('GET /api/network/nodes', () => get('/api/network/nodes')))
  results.push(await test('GET /api/network/analytics', () => get('/api/network/analytics')))
  results.push(await test('GET /api/reputation', () => get('/api/reputation')))

  const metrics = results.find((r) => r.ok && r.result?.chainId)?.result
  if (metrics) {
    console.log(`  → chainId=${metrics.chainId} block=${metrics.blockNumber} tps=${metrics.tps}`)
  }

  results.push(
    await test('GET /api/gas/estimate', () =>
      get('/api/gas/estimate?to=0x0000000000000000000000000000000000000001')
    )
  )

  results.push(
    await test('GET /api/auth/session (expect 401)', async () => {
      const res = await fetch(`${BASE}/api/auth/session`)
      if (res.status !== 401) throw new Error(`expected 401 got ${res.status}`)
      return true
    })
  )

  const wallet = process.env.TEST_WALLET
  if (wallet) {
    const { json } = await post('/api/auth/nonce', { walletAddress: wallet })
    if (json.success) console.log(`✓ POST /api/auth/nonce (needs signature for verify)`)
  } else {
    console.log('○ POST /api/auth/nonce skipped (set TEST_WALLET)')
  }

  results.push(
    await test('GET /api/watchlist (expect 401 without session)', async () => {
      const res = await fetch(`${BASE}/api/watchlist`)
      if (res.status !== 401) throw new Error(`expected 401 got ${res.status}`)
      return true
    })
  )

  const passed = results.filter((r) => r.ok).length
  const failed = results.filter((r) => !r.ok).length
  console.log(`\n${passed} passed, ${failed} failed`)
  process.exit(failed > 0 ? 1 : 0)
}

main()
