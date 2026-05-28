# Como testar o ARC Pulse (carteira + funcionalidades)

## Carteira de teste

Não é possível conectar a MetaMask automaticamente pelo Cursor — você precisa importar a carteira no navegador.

1. Gere (ou use) a carteira local:
   ```bash
   node scripts/generate-test-wallet.mjs
   ```
2. Abra o arquivo **`test-wallet.local.json`** na raiz do projeto (não commite no Git).
3. No **MetaMask**:
   - Rede customizada **ARC Testnet**
     - RPC: `https://rpc.testnet.arc.network`
     - Chain ID: `5042002`
     - Moeda: USDC (6 decimais)
     - Explorer: `https://testnet.arcscan.app`
   - **Importar conta** → colar a `privateKey` ou a frase `mnemonic` do JSON.

4. No app: **Connect Wallet** (RainbowKit) → escolha MetaMask → aceite trocar para ARC Testnet → assine o login (SIWE).

## Testar APIs

Com o servidor rodando (`npm run dev`):

```bash
node scripts/test-api.mjs
```

## O que funciona em tempo real

| Recurso | Fonte de dados |
|--------|----------------|
| Block / chainId | ARC RPC (viem) |
| Métricas (TPS, latência RPC) | Blocos + nós monitorados |
| Lista de nós | Health checks + seed nodes |
| Gráficos analytics | Agregação + cache (30s) |
| SSE `/api/events/stream` | Novos blocos ARC |
| Watchlist / alertas | Supabase + login SIWE |
| Reputação | Scores calculados / DB |

Sem **Supabase** configurado: APIs públicas funcionam; watchlist e alertas personalizados exigem `.env.local` com Supabase + `JWT_SECRET`.

## Faucet USDC (testnet)

Consulte a documentação oficial da ARC para obter USDC de teste na ARC Testnet, se necessário para transações.
