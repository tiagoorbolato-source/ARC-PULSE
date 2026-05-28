import {
  createPublicClient,
  http,
  webSocket,
  type PublicClient,
  type WebSocketTransport,
  type HttpTransport,
} from 'viem'
import { arcTestnet, ARC_RPC_URL, ARC_WS_URL } from '@/src/config/arc'

let httpClient: PublicClient<HttpTransport, typeof arcTestnet> | null = null
let wsClient: PublicClient<WebSocketTransport, typeof arcTestnet> | null = null

export function getArcHttpClient() {
  if (!httpClient) {
    httpClient = createPublicClient({
      chain: arcTestnet,
      transport: http(ARC_RPC_URL, {
        batch: { wait: 50 },
        retryCount: 3,
        timeout: 30_000,
      }),
    })
  }
  return httpClient
}

export function getArcWsClient() {
  if (!wsClient) {
    wsClient = createPublicClient({
      chain: arcTestnet,
      transport: webSocket(ARC_WS_URL, {
        reconnect: true,
        retryCount: 5,
        timeout: 30_000,
      }),
    })
  }
  return wsClient
}

export async function validateArcChain(): Promise<boolean> {
  try {
    const client = getArcHttpClient()
    const id = await client.getChainId()
    return id === arcTestnet.id
  } catch {
    return false
  }
}
