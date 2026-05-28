# ARC Pulse — Deployment Guide

## Prerequisites

- Node.js 20+
- Supabase project (PostgreSQL)
- WalletConnect Cloud project ID
- ARC Testnet RPC access (public endpoints included)

## 1. Environment

Copy `.env.example` to `.env.local` and fill in:

| Variable | Required | Description |
|----------|----------|-------------|
| `JWT_SECRET` | Yes | Min 32 chars for SIWE sessions |
| `SUPABASE_URL` | Yes (prod) | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes (prod) | Server-side DB access |
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | Yes | WalletConnect / RainbowKit |
| `REDIS_URL` | No | Distributed cache (Railway/Upstash) |
| `CRON_SECRET` | Yes (Vercel cron) | Bearer token for `/api/cron/monitor` |

## 2. Database

Run `supabase/migrations/001_initial_schema.sql` in the Supabase SQL editor.

## 3. Install & build

```bash
npm install --legacy-peer-deps
npm run build
npm start
```

## 4. Vercel

1. Import repository
2. Add all env vars from `.env.example`
3. Set `CRON_SECRET` and add header `Authorization: Bearer <CRON_SECRET>` in Vercel cron config (or use Vercel's built-in cron auth)
4. Deploy — `vercel.json` runs node monitor every 5 minutes

**Note:** Long-lived WebSockets use SSE at `/api/events/stream` (Vercel-compatible). ARC block subscriptions run on the server when APIs or SSE are hit.

## 5. Railway / Render

- Same env vars as Vercel
- Optional: dedicated worker process calling `GET /api/cron/monitor` on interval
- Add `REDIS_URL` for multi-instance cache consistency

## 6. Scaling

- **RPC:** Cache TTLs (15–60s) reduce ARC RPC load
- **DB:** Index on `watchlists(user_id)`, `alerts(user_id, triggered_at)`
- **Realtime:** One SSE connection per dashboard tab; use Redis pub/sub for multi-instance event broadcast (extend `event-bus`)

## 7. Security checklist

- Never commit `.env.local`
- Rotate `JWT_SECRET` and `SUPABASE_SERVICE_ROLE_KEY` periodically
- Enable RLS policies on Supabase for any client-side access
- Set `CRON_SECRET` on production cron routes

## 8. ARC network

Users must connect to **ARC Testnet** (Chain ID `5042002`). Gas is **USDC**. The app prompts network switch via `ArcNetworkGuard`.

Explorer: https://testnet.arcscan.app
