# ARC Pulse — Backend Architecture

## Overview

ARC Pulse uses **Next.js App Router API routes** with a modular **`src/`** backend layer integrated with **ARC Testnet** (EVM, Chain ID `5042002`, USDC gas).

```
Frontend (Next.js + wagmi + RainbowKit)
        │
        ▼
app/api/*  ──►  src/services/*  ──►  ARC RPC/WS (viem + ethers)
        │              │
        │              ├── Supabase PostgreSQL
        │              ├── Memory / Redis cache
        │              └── Event bus → SSE (/api/events/stream)
```

## Directory map

| Path | Role |
|------|------|
| `src/config/` | ARC chain + env validation |
| `src/web3/` | viem/ethers clients, gas (USDC), block subscriptions |
| `src/services/` | Analytics, nodes, SIWE auth, watchlist, alerts, reputation |
| `src/database/` | Supabase admin client |
| `src/middleware/` | JWT sessions, rate limiting |
| `src/cache/` | In-memory + optional Redis |
| `src/subscriptions/` | Event bus + realtime bridge |
| `src/jobs/` | Cron: node health + metrics |
| `app/api/` | REST + SSE endpoints |
| `lib/api/client.ts` | Typed frontend API client |
| `supabase/migrations/` | PostgreSQL schema |

## Authentication

**SIWE only** — no email/password.

1. `POST /api/auth/nonce` — issue nonce  
2. User signs with MetaMask / WalletConnect on ARC Testnet  
3. `POST /api/auth/verify` — verify signature, upsert user, set HTTP-only JWT cookie  
4. Protected routes use `requireAuth` middleware  

## Realtime

- ARC blocks via **WebSocket** (viem `watchBlocks`) with **HTTP polling fallback**
- Events published to in-process **event bus**
- Clients subscribe via **Server-Sent Events** at `/api/events/stream` (serverless-friendly)

## Key APIs

| Method | Path | Auth |
|--------|------|------|
| GET | `/api/network/metrics` | Public |
| GET | `/api/network/nodes` | Public |
| GET | `/api/network/analytics` | Public |
| GET | `/api/network/status` | Public |
| GET | `/api/gas/estimate?to=0x…` | Public |
| GET | `/api/watchlist` | JWT |
| POST | `/api/watchlist/add` | JWT |
| DELETE | `/api/watchlist/remove` | JWT |
| GET | `/api/alerts` | JWT |
| GET | `/api/reputation` | Public |
| GET | `/api/user/dashboard` | JWT |

## Setup

See `.env.example` and `DEPLOYMENT.md`.
