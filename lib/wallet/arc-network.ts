import { ARC_CHAIN_ID } from '@/lib/chains/arc'

const ARC_CHAIN_ID_HEX = `0x${ARC_CHAIN_ID.toString(16)}` as const

type EthereumProvider = {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>
}

/** Adiciona e/ou troca para ARC Testnet no MetaMask */
export async function ensureArcTestnetInWallet(
  provider?: EthereumProvider | null
): Promise<void> {
  const eth =
    provider ??
    (typeof window !== 'undefined'
      ? (window as Window & { ethereum?: EthereumProvider }).ethereum
      : undefined)

  if (!eth?.request) {
    throw new Error('Nenhuma carteira detectada. Instale a extensão MetaMask.')
  }

  try {
    await eth.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: ARC_CHAIN_ID_HEX }],
    })
  } catch (err: unknown) {
    const code = (err as { code?: number })?.code
    if (code === 4902) {
      await eth.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: ARC_CHAIN_ID_HEX,
            chainName: 'ARC Testnet',
            nativeCurrency: {
              name: 'USDC',
              symbol: 'USDC',
              decimals: 6,
            },
            rpcUrls: ['https://rpc.testnet.arc.network'],
            blockExplorerUrls: ['https://testnet.arcscan.app'],
          },
        ],
      })
      return
    }
    throw err
  }
}
