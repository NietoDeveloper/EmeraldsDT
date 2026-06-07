# 💎 Emerald DT - Backend Security Cluster
### High-Engineering Emerald Commercialization Platform

This is the core services layer (API) of Emerald DT. Designed under a **Maximum Security** architecture and **Double Cluster** scalability, following the visual and technical standards inspired by SpaceX.

---

## 🏗️ Folder Architecture (Domain-Driven Design)

The project uses a modular structure where each resource is independent, facilitating maintenance and security auditing.

```
emerald-dt-api/
├── dist/                          # Compiled Production Bundle (JS) optimized for cloud deployment
├── src/                           # Core Source Infrastructure (TypeScript)
│   ├── config/                    # Infrastructure & Gateway Orchestrators
│   │   ├── corsOptions.ts         # Perimeter access control for Dashboard & E-commerce clients
│   │   └── database.ts            # dbManager: Symmetric synchronization for Alpha & Omega Clusters
│   │
│   ├── modules/                   # Autonomous Business Domains (Monorepo Isolated Units)
│   │   ├── auth/                  # 🔑 Cryptographic Identity Layer (Omega Cluster Target)
│   │   │   ├── auth.controller.ts # Authentication handling, tokens, and access auditing
│   │   │   ├── auth.interfaces.ts # Tight data structures, IUser schema, and Request extensions
│   │   │   ├── auth.middleware.ts # Perimetric RBAC firewall (requireAuth & restrictTo)
│   │   │   └── auth.routes.ts     # Identity access routing pipeline v2.2
│   │   │
│   │   ├── emeralds/              # 💎 High-Value Physical Assets (Alpha Cluster Target)
│   │   │   ├── emerald.constants.ts  # Gemology native enums (Cuts, origins, clarity states)
│   │   │   ├── emerald.controller.ts # Lean aggregation engines and instant metric views
│   │   │   ├── emerald.model.ts      # Mongoose schema featuring automated Slug indexing
│   │   │   ├── emerald.routes.ts     # Protected auditing routes wrapped by La Constrictor v2.2
│   │   │   └── emerald.schema.ts     # Strict Zod Shield validation wrapper for req.body
│   │   │
│   │   ├── inventory/             # 📊 Atomic Stock Synchronization & Ledgering
│   │   │   ├── inventory.controller.ts # Multi-cluster ACID transactions for inventory mutators
│   │   │   ├── inventory.routes.ts# Operational inventory validation and telemetry routes
│   │   │   └── inventory.schema.ts# Input sanitization and structural Zod enforcement
│   │   │
│   │   └── payments/              # 💳 Bank-Grade Secure Payment Gateway Pipeline
│   │       ├── payments.controller.ts # Transaction orchestrator & secure Webhook parser
│   │       ├── payments.interfaces.ts # Type-safe contracts for Stripe, Wompi, and fiscal ledgers
│   │       ├── payments.routes.ts     # Raw bitstreams for cryptographic verification and webhooks
│   │       └── payments.schema.ts     # Payment intents structural Zod validation rules
│   │
│   ├── shared/                    # Transversal System Utilities
│   │   ├── middlewares/
│   │   │   └── validate.middleware.ts # Generic schema interceptor middleware for Zod Shields
│   │   └── services/
│   │       ├── socket.service.ts  # ⚡ La Constrictor Realtime: High-performance type-safe Sockets
│   │       └── storage.service.ts # 🐍 La Constrictor Storage: S3 Client v3 & safe local asset buffering
│   │
│   ├── app.ts                     # Express framework piping, global wrappers, and L6 Error Handler
│   └── server.ts                  # Bootloader init engine, env guardian, and Graceful Shutdown
│
├── uploads/                       # Local safe sandboxed folder for Gem photos and CDTEC/GIA PDFs
├── Dockerfile                     # Multi-stage lightweight containerization blueprint for Railway/AWS
├── .env.example                   # Cryptographic secrets template (JWT, Datacenter URIs)
├── .gitignore                     # Repository leakage prevention rules
├── package.json                   # ESM engine configurations, orchestration scripts, and dependencies
└── tsconfig.json                  # High-strictness compiler configuration (strict: true)

```

## 🛡️ Security Protocols (S+ Cycle)

- **Double Cluster Isolation:** Physical and logical separation between public catalog data and sensitive customer transactional information.
- **JWT Multi-Role:** Role-Based Access Control (RBAC) for dashboard employees and investors.
- **Rate Limiting:** Protection against brute-force attacks on authentication endpoints.
- **Helmet & CORS:** Strict header configuration to prevent Cross-Site Scripting (XSS).

---

## 🚀 Installation & Development

**1. Clone the repository:**
```bash
git clone https://github.com/your-username/emerald-dt-back.git
cd emerald-dt-back
```

**2. Install dependencies:**
```bash
npm install
```

**3. Configure environment variables:**

Create a `.env` file based on `.env.example`.

**4. Start in development mode:**
```bash
npm run dev
```

---

## 🛠️ Engineering Commands

| Command | Description |
|---|---|
| `npm run dev` | Starts the server with Hot Reload. |
| `npm run build` | Compiles code to optimized JavaScript in `/dist`. |
| `npm run start` | Launches the production binary (For Railway/AWS). |
| `npm run lint` | Verifies TypeScript code integrity. |

---

## 📦 Tech Stack

- **Runtime:** Node.js v20+
- **Language:** TypeScript (Strict Mode)
- **Framework:** Express.js 5.0 (Next Gen)
- **Database:** MongoDB Atlas (Double Cluster)
- **ORM:** Mongoose
- **Security:** Helmet, Jose (JWT), Bcrypt

---

## ✍️ Author

Developed by Manuel Nieto (NietoDeveloper) — Building scalable systems with 100% discipline. #1 GitHub Colombia Ranking.

GitHub Profile | Portfolio | Software DT Website

Last updated: February 24, 2026
