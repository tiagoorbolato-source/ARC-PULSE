/**
 * Generates a NEW test wallet for ARC Testnet only.
 * Run: node scripts/generate-test-wallet.mjs
 * Output is saved to test-wallet.local.json (gitignored) — NEVER use on mainnet.
 */
import { Wallet } from 'ethers'
import { writeFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outPath = join(__dirname, '..', 'test-wallet.local.json')

if (existsSync(outPath)) {
  console.log('Wallet file already exists:', outPath)
  console.log('Delete it first if you want a new wallet.')
  process.exit(0)
}

const wallet = Wallet.createRandom()

const data = {
  warning: 'TESTNET ONLY — Do not fund on mainnet. Do not commit this file.',
  network: 'ARC Testnet',
  chainId: 5042002,
  address: wallet.address,
  mnemonic: wallet.mnemonic.phrase,
  privateKey: wallet.privateKey,
  metaMaskImport: 'Use MetaMask → Import account → Private key (or Secret recovery phrase)',
  arcRpc: 'https://rpc.testnet.arc.network',
  explorer: 'https://testnet.arcscan.app',
}

writeFileSync(outPath, JSON.stringify(data, null, 2), 'utf8')

console.log('\n=== ARC Pulse — Test Wallet Created ===\n')
console.log('Address:    ', wallet.address)
console.log('Saved to:   ', outPath)
console.log('\nImport in MetaMask:')
console.log('1. Add network ARC Testnet (Chain ID 5042002)')
console.log('2. Import account → paste private key from test-wallet.local.json')
console.log('3. Get test USDC from ARC testnet faucet if available')
console.log('\n⚠️  Never share this wallet on mainnet or commit the JSON file.\n')
