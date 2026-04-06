```markdown
# Emerald DT — Mission Control
**High-Engineering Admin Ecosystem for Gemstone Logistics**

> Private, high-security monorepo module for employees and administrators — tracking Colombian emeralds from Muzo, Chivor & Coscuez to global dispatch. Developed by Nieto Laboratory.

![Status](https://img.shields.io/badge/status-operational-00C97A?style=flat-square) ![Architecture](https://img.shields.io/badge/architecture-double_cluster-00C97A?style=flat-square) ![Uptime](https://img.shields.io/badge/uptime-100%25-00C97A?style=flat-square) ![Access](https://img.shields.io/badge/access-internal_only-F0A500?style=flat-square) ![Infra](https://img.shields.io/badge/infra-dockerized-555?style=flat-square)

---

## 01 · Dashboard Core Functions

| Module | Description |
|---|---|
| **Inventory Telemetry** | Real-time tracking of high-value assets — Carats, Color, Clarity, Cut |
| **Employee Management** | Role-based access control (RBAC) with maximum encryption layers |
| **Traceability Ledger** | Digital record of each emerald's journey from Boyacá to the client |
| **Sales Analytics** | Financial visualization with dark telemetry charts (SpaceX-style) |

---

## 02 · Technical Architecture — The Double Cluster

### 🟢 Primary Cluster — Operations
Handles daily inventory operations and user management. Main throughput node for all CRUD activity.
`Node.js` `MongoDB` `Railway`

### 🟡 Secondary Cluster — Security / Mirror
Redundant failover node. Encrypted backup & mirror via AWS S3 with high-res certificate storage.
`AWS S3` `Auto-scaling` `Docker`

**Backend:** Node.js (Nieto Lab Core API)
**Database:** MongoDB — strict schema for gemstone metadata
**Cloud:** Railway + AWS S3
**DevOps:** Dockerized monorepo flow

---

## 03 · Project Structure

```plaintext
src/
├── app/                   # Control Center (private routes)
│   ├── (auth)/            # Multi-factor Authentication (MFA)
│   ├── inventory/         # CRUD — Muzo / Chivor / Coscuez
│   ├── logistics/         # Shipping & global tracking
│   └── layout.tsx         # Console sidebar navigation
├── components/            # Mission-critical UI
│   ├── charts/            # Real-time telemetry (Recharts/D3)
│   ├── forms/             # Strict validation for gemstone specs
│   └── status/            # Live system health monitors
├── middleware.ts          # JWT & security boundary (The Firewall)
├── services/              # API integration — DT Core
└── store/                 # Zustand — global admin state
```

---

## 04 · Security Protocol

- 🟢 **Session Shield** — Automated logout on inactivity + hardware key support
- 🟢 **Immutable Log** — Every status change logged with a tamper-proof timestamp
- 🟢 **Responsive** — Full control from any device (310px to 1900px), optimized for field ops in Boyacá and office work in Bogotá

---

## 05 · Deployment

Build the production image for the Nieto Lab Cluster:

```bash
docker build -t emerald-dt-dashboard .
```

Required environment variables:

```env
MONGO_URI=
JWT_SECRET_KEY=
AWS_ACCESS_KEY=
NIETO_LAB_API_KEY=
```

---

## 06 · Design Philosophy — Mission Control

Unlike the public site, the Dashboard prioritizes **information density**:

- **Grid System** — Compact data tables with high contrast
- **Status Indicators** — `● System Ready` `● Warning` `● Critical` following aerospace standards
- **Typography** — Monospaced fonts for all technical data and numeric readouts

---

*Developed with 100% discipline by **Manuel Nieto** — #1 GitHub Colombia Ranking*
*Last updated: March 6, 2026*
```