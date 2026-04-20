<div align="center">

# 🟩 Emerald DT — Dashboard

### Employee Control Center · Nieto Laboratory

*Standalone admin application — part of the [Emerald DT Full-Stack Ecosystem](https://github.com/NietoDeveloper)*

<br>

[![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=flat-square&logo=nextdotjs&logoColor=white)](https://github.com/NietoDeveloper)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://github.com/NietoDeveloper)
[![Zustand](https://img.shields.io/badge/State-Zustand-D4AF37?style=flat-square)](https://github.com/NietoDeveloper)
[![AWS](https://img.shields.io/badge/AWS-S3_Storage-FF9900?style=flat-square&logo=amazonaws&logoColor=white)](https://github.com/NietoDeveloper)
[![Recharts](https://img.shields.io/badge/Charts-Recharts-22C55E?style=flat-square)](https://github.com/NietoDeveloper)
[![RBAC](https://img.shields.io/badge/Security-RBAC_+_JWT-EF4444?style=flat-square)](https://github.com/NietoDeveloper)
[![Edge](https://img.shields.io/badge/Middleware-Edge_Protected-8B5CF6?style=flat-square)](https://github.com/NietoDeveloper)
[![Responsive](https://img.shields.io/badge/Responsive-310px_→_1900px-047857?style=flat-square)](https://github.com/NietoDeveloper)

<br>

> Full control over emerald inventory, order logistics, sales analytics, and employee access management — protected at the edge.

</div>

---

## 📦 Core Modules

| Route | Module | Description |
|---|---|---|
| `/app/(auth)/` | **Auth Gate** | Secure employee login, session management, password reset |
| `/app/inventory/` | **Inventory CRUD** | Full stock management with AWS S3 image upload |
| `/app/sales/` | **Order Tracking** | Real-time order lifecycle with Stripe payment visibility |
| `/app/analytics/` | **Sales Analytics** | Revenue trends, top SKUs, conversion metrics via Recharts |
| `/app/settings/` | **System Config** | Role assignment, API integration management (admin only) |

---

## 📁 Project Structure

```
emerald-dt-dashboard/
├── src/
│   ├── app/                        # Next.js 15 App Router
│   │   ├── (auth)/                 # Employee secure login
│   │   │   ├── login/
│   │   │   └── reset-password/
│   │   ├── inventory/              # Emerald stock CRUD
│   │   │   ├── page.tsx            # Inventory table view
│   │   │   └── [id]/edit/          # Edit single product
│   │   ├── sales/                  # Order tracking & logistics
│   │   ├── analytics/              # Revenue & KPI charts
│   │   └── settings/               # System configuration
│   │
│   ├── components/
│   │   ├── admin-ui/               # Specialized admin components
│   │   │   ├── DataTable.tsx       # Sortable, paginated tables
│   │   │   ├── Modal.tsx           # Confirm / form modals
│   │   │   └── StatusBadge.tsx     # Order status indicators
│   │   ├── charts/                 # Data visualization
│   │   │   ├── RevenueChart.tsx
│   │   │   ├── TopSkuChart.tsx
│   │   │   └── ConversionFunnel.tsx
│   │   └── forms/                  # Product upload · AWS S3 integration
│   │
│   ├── services/                   # Admin-level API requests
│   │   ├── inventory.service.ts
│   │   ├── orders.service.ts
│   │   ├── analytics.service.ts
│   │   └── auth.service.ts
│   │
│   ├── store/                      # Global admin state — Zustand
│   │   ├── inventoryStore.ts
│   │   └── sessionStore.ts
│   │
│   ├── hooks/                      # Admin-specific custom hooks
│   │   ├── useSessionTimer.ts      # Auto-logout on inactivity
│   │   └── useAdminRole.ts         # Role-based feature flags
│   │
│   └── types/                      # Admin role interfaces
│
└── middleware.ts                   # Strict Edge Protection — route guard
```

---

## 🔐 Access Control — RBAC

| Role | Inventory | Orders | Analytics | Settings | Users |
|---|---|---|---|---|---|
| **Super Admin** | Read / Write | Full | ✅ Export | ✅ | ✅ |
| **Manager** | Read / Edit | Manage | ✅ View | ❌ | ❌ |
| **Employee** | Read only | Status only | ❌ | ❌ | ❌ |
| **Viewer** | Read only | View only | ❌ | ❌ | ❌ |

Role scope is enforced at two layers: `middleware.ts` at the edge and `useAdminRole` hook inside the UI.

---

## 🔒 Security Standards

**Edge Middleware** — Every route protected at the network edge. Tokens validated before any page render. Unauthenticated requests redirected to `/login`.

**Session Timers** — Auto-logout on inactivity via `useSessionTimer`. Configurable timeout with graceful warning modal before expiry.

**RBAC Scoping** — Role-based feature flags throughout the UI. Components render only what each role is permitted to access.

**Type-safe API** — Strict TypeScript interfaces on every admin request. No untyped data reaches the UI layer.

---

## 🌿 Environment Variables

```env
# API & Auth
NEXT_PUBLIC_API_URL=
JWT_SECRET=
SESSION_TIMEOUT=1800

# AWS Storage
AWS_BUCKET_NAME=
AWS_REGION=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=

# App Config
NODE_ENV=production
NEXT_PUBLIC_APP_URL=
LOG_LEVEL=warn
```

---

## 🚀 Getting Started

```bash
# Clone the dashboard module
git clone https://github.com/NietoDeveloper/emerald-dt-dashboard

# Install dependencies
cd emerald-dt-dashboard && npm install

# Set up environment variables
cp .env.example .env.local

# Start the development server
npm run dev
```

**Production build:**

```bash
# Build for production
npm run build && npm run start

# Or deploy via Docker
docker build -t emerald-dashboard .
docker run -p 3001:3001 emerald-dashboard
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 15 — App Router |
| **Language** | TypeScript (strict mode) |
| **State** | Zustand |
| **Charts** | Recharts |
| **Storage** | AWS S3 + CloudFront |
| **Auth** | JWT + Edge Middleware |
| **Access Control** | RBAC — 4 role levels |
| **Responsive** | 310px → 1900px |
| **Design** | True Black `#000` · Emerald `#047857` · Gold `#D4AF37` |

---

## 🔗 Ecosystem

This module is part of the **Emerald DT Full-Stack Ecosystem**:

| Module | Repo | Description |
|---|---|---|
| 🔧 **Back-end Core** | `emerald-dt-back` | Node.js API — security, DB, AWS |
| 🛍️ **Front-end Store** | `emerald-dt-front` | Next.js 15 public store |
| 🟩 **Dashboard** | `emerald-dt-dashboard` | This repo — admin control center |

---

## 👤 Developed by

<div align="center">

**Manuel Nieto — NietoDeveloper**

*Part of the Emerald DT Full-Stack Ecosystem.*
*#1 GitHub Colombia Ranking · 100% discipline.*

<br>

[![GitHub](https://img.shields.io/badge/GitHub-NietoDeveloper-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/NietoDeveloper)
[![Software DT](https://img.shields.io/badge/Web-Software_DT-047857?style=flat-square)](https://softwaredtwebsite.com)
[![Nieto Laboratory](https://img.shields.io/badge/Lab-Nieto_Laboratory-D4AF37?style=flat-square)](https://nietolab.com)

</div>

---

<div align="center">

*Emerald DT · Dashboard Module · Nieto Laboratory · April 2026*

</div>
