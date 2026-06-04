# 💎 Emerald DT - Backend Security Cluster
### High-Engineering Emerald Commercialization Platform

This is the core services layer (API) of Emerald DT. Designed under a **Maximum Security** architecture and **Double Cluster** scalability, following the visual and technical standards inspired by SpaceX.

---

## 🏗️ Folder Architecture (Domain-Driven Design)

The project uses a modular structure where each resource is independent, facilitating maintenance and security auditing.

```
emerald-dt-api/
├── dist/                          # Código compilado (JS) listo para producción en la nube
├── src/                           # Código fuente en TypeScript (TS)
│   ├── config/                    # Orquestadores de infraestructura
│   │   ├── corsOptions.ts         # Políticas de acceso perimetral para el Dashboard y E-commerce
│   │   └── database.ts            # dbManager: Sincronización simétrica de la DB Alpha y Omega
│   │
│   ├── modules/                   # Dominios de Negocio Autónomos (Aislados en Monorepo)
│   │   ├── auth/                  # 🔑 Capa de Identidad Criptográfica (Omega Target)
│   │   │   ├── auth.controller.ts # Login, registro y auditoría automática de accesos
│   │   │   ├── auth.interfaces.ts # Contratos estrictos, IUser e inyección AuthenticatedRequest
│   │   │   ├── auth.middleware.ts # Cortafuegos de red RBAC (requireAuth & restrictTo)
│   │   │   └── auth.routes.ts     # Enrutador e indicador analítico de estado v2.2
│   │   │
│   │   ├── emeralds/              # 💎 Activos de Alto Valor (Alpha Target)
│   │   │   ├── emerald.constants.ts  # Enums nativos de la gemología (Cortes, orígenes, estatus)
│   │   │   ├── emerald.controller.ts # Motores de lectura lean() y agregación de métricas sin scroll
│   │   │   ├── emerald.model.ts      # Esquema Mongoose con indexación de Slugs
│   │   │   ├── emerald.routes.ts     # Pipelines de auditoría blindados con La Constrictor v2.2
│   │   │   └── emerald.schema.ts     # Zod Shield envolvente en req.body con saneamiento nativo
│   │   │
│   │   ├── inventory/             # 📊 Sincronización de Stock Físico
│   │   │   └── inventory.routes.ts# Tubería de inventario cruzado
│   │   │
│   │   └── payments/              # 💳 Pasarela de Pagos Segura (Grado Bancario)
│   │       └── ...
│   │
│   ├── shared/                    # Capa Transversal del Ecosistema
│   │   ├── middlewares/
│   │   │   └── validate.middleware.ts # Validador genérico interceptor de esquemas Zod
│   │   └── services/
│   │       └── socket.service.ts  # 🐍 La Constrictor Realtime: Heartbeat y Sockets del Canvas
│   │
│   ├── app.ts                     # Configuración de Express, inyección unificada y Global Error Handler L6
│   └── server.ts                  # Bootloader del sistema, Guardián de variables y Apagado Seguro
│
├── uploads/                       # Almacenamiento local aislado para fotos de gemas y PDFs CDTEC/GIA
├── Dockerfile                     # Empaquetado atómico para despliegue en Railway o AWS clusters
├── .env.example                   # Plantilla de llaves críticas (JWT_SECRET, URIs de datacenters)
├── .gitignore                     # Blindaje anti-fugas de secretos al repositorio
├── package.json                   # Scripts de orquestación y dependencias con soporte ESM nativo
└── tsconfig.json                  # Reglas estrictas de compilación (strict: true)

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
