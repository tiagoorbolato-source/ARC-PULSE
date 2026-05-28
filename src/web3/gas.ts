import { formatUnits } from 'viem'
import { getArcHttpClient } from './arc-viem'

/** ARC Testnet uses USDC (6 decimals) as native gas token */
export async function estimateGasUsdc(
  to: `0x${string}`,
  data?: `0x${string}`
): Promise<{ gasLimit: bigint; maxFeePerGas: bigint; estimatedUsdc: string }> {
  const client = getArcHttpClient()
  const [gasPrice, gasLimit] = await Promise.all([
    client.getGasPrice(),
    client.estimateGas({
      account: '0x0000000000000000000000000000000000000000',
      to,
      data: data ?? '0x',
    }).catch(() => 21_000n),
  ])

  const maxFee = gasPrice
  const totalWei = gasLimit * maxFee
  const estimatedUsdc = formatUnits(totalWei, 6)

  return {
    gasLimit,
    maxFeePerGas: maxFee,
    estimatedUsdc,
  }
}

export async function getCurrentGasPriceUsdc(): Promise<string> {
  const client = getArcHttpClient()
  const gasPrice = await client.getGasPrice()
  return formatUnits(gasPrice, 6)
}
