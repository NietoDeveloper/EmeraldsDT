<div align="center">

# 💎 Emerald DT — Full-Stack Ecosystem

### World-Class E-commerce & Management for Colombian Emeralds

*Engineered by [Nieto Laboratory](https://nietolab.com) · SpaceX-inspired technical aesthetic*

<br>

[![Node.js](https://img.shields.io/badge/Node.js-TypeScript-047857?style=flat-square&logo=nodedotjs&logoColor=white)](https://github.com/NietoDeveloper)
[![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=flat-square&logo=nextdotjs&logoColor=white)](https://github.com/NietoDeveloper)
[![MongoDB](https://img.shields.io/badge/MongoDB-Double_Cluster-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://github.com/NietoDeveloper)
[![Docker](https://img.shields.io/badge/Docker-Orchestrated-2496ED?style=flat-square&logo=docker&logoColor=white)](https://github.com/NietoDeveloper)
[![AWS](https://img.shields.io/badge/AWS-S3_+_CloudFront-FF9900?style=flat-square&logo=amazonaws&logoColor=white)](https://github.com/NietoDeveloper)
[![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF?style=flat-square&logo=stripe&logoColor=white)](https://github.com/NietoDeveloper)
[![Railway](https://img.shields.io/badge/Railway-Deploy-0B0D0E?style=flat-square&logo=railway&logoColor=white)](https://github.com/NietoDeveloper)
[![i18n](https://img.shields.io/badge/i18n-EN_|_ES-D4AF37?style=flat-square)](https://github.com/NietoDeveloper)

<br>

> **Emerald DT** is not just a store — it's a complete software infrastructure composed of an immersive front-end, an administrative control dashboard, and a high-security back-end with double cluster architecture.

</div>

---

## 🏗️ Ecosystem Architecture

Three independent repositories/modules that guarantee scalability and full separation of concerns, optimized for deployments on **AWS**, **Railway**, and **Docker** containers.

```
emerald-dt/
├── emerald-dt-back/         →  Core API      (Node.js + TypeScript)
├── emerald-dt-front/        →  Store         (Next.js 15)
└── emerald-dt-dashboard/    →  Control Panel (Next.js + Admin)
```

---

## 1 · Back-end Core — *The Engine*

Central motor built in Node.js managing security, MongoDB persistence, and AWS integrations.

```
emerald-dt-back/
├── src/
│   ├── config/             # DB (Double Cluster logic), AWS S3, CloudFront
│   ├── controllers/        # Business logic — Inventory, Payments, Auth
│   ├── middlewares/        # Security: JWT, RBAC (Role-Based Access Control)
│   ├── models/             # Mongoose Schemas — Product, User, Order
│   ├── routes/             # API Endpoints v1
│   ├── services/           # Logic for Stripe, AWS, and Database triggers
│   └── server.ts           # Entry point with Cluster module for scalability
└── docker-compose.yml      # Container orchestration
```

---

## 2 · Front-end Store — *The Face*

Public interface inspired by SpaceX. Designed for conversion and luxury experience.

```
emerald-dt-front/
├── src/
│   ├── app/                # Next.js 15 App Router
│   │   └── [lang]/         # Multi-language support (EN / ES)
│   ├── components/         # SpaceX-style UI components
│   ├── hooks/              # Custom hooks for UX
│   └── services/           # Connects to Emerald DT Back-end
└── public/                 # High-res assets (AVIF / WebM)
```

---

## 3 · Dashboard Control — *The Brain*

Standalone application for employees and administrators. Full control over inventory, stock, users, and sales analytics.

```
emerald-dt-dashboard/
├── src/
│   ├── app/                # Admin Panel (Protected Layout)
│   │   ├── (auth)/         # Employee secure login
│   │   ├── inventory/      # Emerald stock management (CRUD)
│   │   ├── sales/          # Order tracking & logistics
│   │   └── settings/       # System configuration
│   ├── components/
│   │   ├── admin-ui/       # Specialized tables, modals, data-inputs
│   │   └── charts/         # Real-time data visualization
│   ├── services/           # Admin-level API requests
│   └── store/              # Global admin state (Zustand)
└── middleware.ts           # Route guard — authorized employees only
```

---

## 🛠️ Tech Stack & Standards

| Layer | Technologies |
|---|---|
| **Engineering** | Next.js 15, Node.js, TypeScript, MongoDB |
| **Infrastructure** | AWS S3 + CloudFront, Railway, Docker, Double Cluster |
| **Payments** | Stripe |
