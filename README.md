<div align="center">
  <h1>📦 StockSense</h1>
  <p><strong>Inventory & Sales Intelligence for Small-to-Medium Businesses</strong></p>
  <p><em>Real-time stock tracking · Low-stock alerts · AI-powered predictions · Multi-tenant SaaS</em></p>

  <br>

  <p>
    <a href="https://stocksense-client.vercel.app/">🌐 View Demo</a>
    &nbsp;·&nbsp;
    <a href="https://github.com/FakeyeTami/stocksense/issues/new?template=bug_report.md">🐛 Report Bug</a>
    &nbsp;·&nbsp;
    <a href="https://github.com/FakeyeTami/stocksense/issues/new?template=feature_request.md">✨ Request Feature</a>
    &nbsp;·&nbsp;
    <a href="https://stocksense.vercel.app/docs">📖 Docs</a>
  </p>

  <br>

  ![GitHub deployments](https://img.shields.io/github/deployments/FakeyeTami/stocksense/production?style=for-the-badge&logo=vercel&logoColor=white&label=Vercel&labelColor=%23000&color=%2310b981)
  ![GitHub last commit](https://img.shields.io/github/last-commit/FakeyeTami/stocksense?style=for-the-badge&labelColor=%23000&color=%2310b981)
  ![License](https://img.shields.io/github/license/FakeyeTami/stocksense?style=for-the-badge&labelColor=%23000&color=%2310b981)
  ![GitHub stars](https://img.shields.io/github/stars/FakeyeTami/stocksense?style=for-the-badge&labelColor=%23000&color=%2310b981)

</div>

---

## 📸 Preview

<div align="center">
  <img src="./public/preview-desktop.png" alt="StockSense Desktop Dashboard" width="100%">
  <br><br>
  <img src="./public/preview-mobile.png" alt="StockSense Mobile View" width="320">
</div>

---

## 🎯 The Problem It Solves

Small shops and SMBs lose thousands annually to two avoidable problems:

- **Overstocking** — tying up cash in slow-moving inventory
- **Stockouts** — losing sales because high-demand items ran out

**StockSense** solves both. Real-time low-stock alerts tell you when to reorder. AI-powered predictions (trained on your own 90-day sales history) tell you *how much* to reorder. No more guessing.

---

## ✨ Features

### Core
- 📊 **Real-time Dashboard** — KPIs, revenue trends, stock value, top sellers at a glance
- 📦 **Inventory Management** — Full CRUD with SKU, barcode, categories, images, unit cost & selling price
- 🔔 **Live Low-Stock Alerts** — WebSocket-powered notifications the moment stock hits your threshold
- 📈 **Sales Tracking** — POS-style sales recording with automatic stock decrement
- 📩 **Email Digests** — Daily low-stock and out-of-stock summaries via Resend

### Data
- 📥 **CSV Import/Export** — Bulk upload with validation, preview diff, and error report
- 📑 **Analytics Charts** — Sales trend lines, revenue by category, stock turnover rate (Recharts)
- 🕵️ **Audit Log** — Every stock change, sale, and user action is timestamped and searchable

### Platform
- 🏢 **Multi-tenant** — Each organisation is fully isolated at the database level
- 🔐 **Role-Based Access** — Admin, Manager, Staff with granular permissions
- 🤖 **AI Reorder Suggestions** — GPT-powered predictions from your 90-day sales history
- 💳 **Stripe Billing** — Free / Pro / Business tiers with feature gating
- 📱 **PWA Support** — Install on mobile, view inventory offline

---

## 🧰 Built With

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=next.js&logoColor=white)
&nbsp;![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
&nbsp;![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
&nbsp;![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
&nbsp;![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
&nbsp;![NextAuth](https://img.shields.io/badge/NextAuth.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
&nbsp;![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white)
&nbsp;![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)
&nbsp;![AWS S3](https://img.shields.io/badge/AWS_S3-FF9900?style=for-the-badge&logo=amazon-aws&logoColor=white)
&nbsp;![Stripe](https://img.shields.io/badge/Stripe-008CDD?style=for-the-badge&logo=stripe&logoColor=white)
&nbsp;![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
&nbsp;![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

</div>

---

## 🏗️ Architecture

```
stocksense/
├── app/                        # Next.js 15 App Router
│   ├── (auth)/                 # Login, register, onboarding
│   ├── (dashboard)/            # Protected org dashboard
│   │   ├── inventory/          # Product CRUD + table
│   │   ├── sales/              # Sales recording + history
│   │   ├── analytics/          # Charts & reports
│   │   └── settings/           # Org settings, members, billing
│   └── api/                    # Route handlers
│       ├── auth/               # NextAuth endpoints
│       ├── products/           # REST API
│       ├── sales/
│       ├── alerts/             # Socket.io alert triggers
│       └── webhooks/stripe/    # Billing webhooks
├── components/
│   ├── ui/                     # ShadCN primitives
│   ├── inventory/              # Inventory-specific components
│   ├── charts/                 # Recharts wrappers
│   └── layout/                 # Shell, sidebar, header
├── lib/
│   ├── prisma.ts               # DB client singleton
│   ├── redis.ts                # Redis client
│   ├── s3.ts                   # AWS S3 utils
│   └── stripe.ts               # Stripe helpers
├── prisma/
│   └── schema.prisma           # DB schema
└── docker-compose.yml          # Local dev: PG + Redis
```

---

## 🗄️ Database Schema (Key Tables)

```prisma
model Organisation {
  id        String   @id @default(cuid())
  name      String
  plan      Plan     @default(FREE)
  members   Member[]
  products  Product[]
  sales     Sale[]
}

model Product {
  id            String   @id @default(cuid())
  sku           String
  name          String
  quantity      Int
  lowStockAt    Int      @default(10)
  costPrice     Decimal
  sellingPrice  Decimal
  orgId         String
  org           Organisation @relation(fields: [orgId], references: [id])
}

model Sale {
  id        String     @id @default(cuid())
  items     SaleItem[]
  total     Decimal
  createdAt DateTime   @default(now())
  orgId     String
}
```

---

## 🛠️ Installation & Local Setup

### Prerequisites

- Node.js 20+
- Docker & Docker Compose (for PostgreSQL + Redis)
- A [Stripe](https://stripe.com) account (test mode)
- An [AWS S3](https://aws.amazon.com/s3/) bucket (or use local MinIO)
- An [OpenAI](https://openai.com) API key (for AI predictions)

### 1. Clone

```bash
git clone https://github.com/yourusername/stocksense.git
cd stocksense
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Start Infrastructure

```bash
docker compose up -d   # Spins up PostgreSQL + Redis
```

### 4. Environment Variables

```bash
cp .env.example .env.local
```

```env
# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/stocksense"

# Auth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-here"
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""

# Redis
REDIS_URL="redis://localhost:6379"

# AWS S3
AWS_ACCESS_KEY_ID=""
AWS_SECRET_ACCESS_KEY=""
AWS_REGION="eu-west-2"
AWS_BUCKET_NAME="stocksense-dev"

# Stripe
STRIPE_SECRET_KEY=""
STRIPE_WEBHOOK_SECRET=""
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=""

# OpenAI (AI predictions)
OPENAI_API_KEY=""

# Email
RESEND_API_KEY=""
```

### 5. Database Setup

```bash
pnpm prisma migrate dev --name init
pnpm prisma db seed        # Seeds demo org + products
```

### 6. Start Dev Server

```bash
pnpm dev
```

Visit `http://localhost:3000` — log in with `demo@stocksense.app / demo1234`

### 7. Stripe Webhooks (local)

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

---

## 🧪 Testing

```bash
# Unit + integration tests
pnpm test

# E2E tests (requires running dev server)
pnpm test:e2e

# Coverage report
pnpm test:coverage
```

Test stack: **Vitest** (unit) · **Playwright** (E2E) · **MSW** (API mocking)

---

## 🚀 Deployment

| Service   | Purpose                          |
|-----------|----------------------------------|
| Vercel    | Next.js frontend + API routes    |
| Railway   | PostgreSQL database              |
| Railway   | Redis instance                   |
| AWS S3    | Product images & CSV files       |
| Resend    | Transactional emails             |

```bash
# Deploy to Vercel
vercel --prod
```

---

## 🗺️ Roadmap

- [x] Auth (email + OAuth)
- [x] Multi-tenant architecture
- [x] Inventory CRUD + CSV import
- [x] Real-time alerts via Socket.io
- [ ] AI stock predictions
- [ ] Stripe billing
- [ ] Mobile PWA
- [ ] Supplier management + PO generation
- [ ] Barcode scanner (mobile camera)

---

## 🤝 Let's Connect

<div align="center">

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/yourusername)
&nbsp;[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/yourusername)
&nbsp;[![Portfolio](https://img.shields.io/badge/Portfolio-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://yourportfolio.dev)
&nbsp;[![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:you@gmail.com)

</div>

---

<div align="center">
  <sub>Built with ☕ and stubbornness · © 2025 TamiCodes</sub>
</div>
