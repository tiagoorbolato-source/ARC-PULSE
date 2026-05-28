import { JsonRpcProvider, WebSocketProvider } from 'ethers'
import { ARC_RPC_URL, ARC_WS_URL, ARC_CHAIN_ID } from '@/src/config/arc'

let httpProvider: JsonRpcProvider | null = null
let wsProvider: WebSocketProvider | null = null

export function getArcHttpProvider(): JsonRpcProvider {
  if (!httpProvider) {
    httpProvider = new JsonRpcProvider(ARC_RPC_URL, ARC_CHAIN_ID, {
      staticNetwork: true,
    })
  }
  return httpProvider
}

export function getArcWsProvider(): WebSocketProvider {
  if (!wsProvider) {
    wsProvider = new WebSocketProvider(ARC_WS_URL, ARC_CHAIN_ID, {
      staticNetwork: true,
    })
  }
  return wsProvider
}

export async function destroyArcWsProvider() {
  if (wsProvider) {
    await wsProvider.destroy()
    wsProvider = null
  }
}
