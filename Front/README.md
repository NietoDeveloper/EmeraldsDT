Markdown
# Emerald DT - Front-end Ecosystem 💎🚀

### World-Class E-commerce for Colombian Emeralds

[![GitHub Top #1 - Colombia](https://img.shields.io/badge/GitHub-Top_%231_Colombia-047857?style=for-the-badge&logo=github)](https://committers.top/colombia)
[![Stack: Next.js 16](https://img.shields.io/badge/Stack-Next.js_16_/_TS-000000?style=for-the-badge&logo=nextdotjs)](https://nextjs.org/)
[![Design: SpaceX Inspired](https://img.shields.io/badge/Design-SpaceX_Inspired-white?style=for-the-badge&logo=spacex)](https://www.spacex.com/)

**Emerald DT** is the high-end e-commerce platform designed by the **Nieto Laboratory** for the commercialization of Colombian emeralds. Inspired by the minimalist and technical aesthetic of **SpaceX**, this application uses a maximum security architecture, scalability through double cluster, and cutting-edge performance.

---

## 🚀 Getting Started

Clone & Install:

```bash
git clone [https://github.com/NietoDeveloper/emerald-dt-front.git](https://github.com/NietoDeveloper/emerald-dt-front.git)
npm install
Environment Setup:
Create a .env.local file with AWS credentials and the Node.js Backend URL (Nieto Lab API).

Run Development:

Bash
npm run dev
🛠️ Dockerization & Local Clúster Orchestration
This project is prepared to run in standalone production mode inside Docker containers using a high-efficiency multi-stage structure:

Build and Run Single Container:
Bash
docker build -t emerald-dt-front .
docker run -p 3000:3000 emerald-dt-front
Orchestrate Local Stack:
Bash
docker compose up --build -d
🏗️ Architecture & Core Stack (Nieto Lab Standard)
This repository contains the Front-end built with a World-Class Engineering approach:

Framework: Next.js 16 (App Router) - Prioritizing Turbopack, SSR, and static layout optimization.

Responsive Range: Calibrated fluid design built strictly to perform flawlessly from 310px up to 1900px.

Language: TypeScript (Strict Mode) with robust fallback dataset structures.

Styling: Tailwind CSS (V4 optimized) + Framer Motion (Cinematic animations).

State Management: Zustand (Lightweight and scalable).

Internationalization: Dynamic i18n via [lang] routes (EN/ES) & custom server Middleware.

Deployment: Dockerized standalone layer ready for high-availability clústers.

🔒 Security & Performance Features
Maximum Security Architecture: Implementation of strict Content Security Policy (CSP), CSRF protection, and cloaked headers (poweredByHeader: false).

Double Cluster Ready: Optimized isolated environment variables configuration for seamless load balancing.

Image Optimization: Automated next/image processing supporting AVIF/WebP loss-less compression formats via secure AWS S3 integrations.

📂 Project Structure
Plaintext
src/
├── app/                # Routing & Server Components (Performance-first)
│   ├── [lang]/         # Dynamic i18n support (English/Spanish)
│   │   ├── collections/# Faceted Boyacá mineral assets & local buffers
│   │   ├── products/   # High-value asset listings
│   │   ├── about/      # Brand timeline & heritage (SpaceX style)
│   │   └── page.tsx    # Immersive Hero Landing (Full-screen Video)
│   ├── layout.tsx      # Root layout, Theme providers, Metadata
│   └── globals.css     # True Black (#000) & Emerald/Gold variables
├── components/         # Atomic Design System
│   ├── ui/             # Atomic: buttons (SpaceX style), countdowns, inputs
│   ├── shared/         # Shared: Fixed Navbar (Scroll-aware), Hydrated Footer
│   ├── sections/       # Composite: HeroSection, ProductsGrid, TechSection
│   └── animations/     # Framer Motion Wrappers (Parallax, Fades)
├── hooks/              # Custom logic: useScrollDirection, useIntersectionObserver
├── services/           # API Integration & Caching layers (Nieto Lab Core)
├── store/              # Global State: Zustand (User prefs, Cart)
├── lib/                # Pure helpers: apiClient layers, i18n Dictionaries
├── types/              # Strict TS definitions for API & Props
├── tests/              # Unit & Integration testing (Jest/Cypress)
└── public/             # Optimized Static Assets (4K WebM/Avif)
🎨 Design Philosophy: "The SpaceX Way"
Immersive Visuals: Dark backgrounds (#000000), bold Sans-Serif typography, and massive use of white spaces.

Paleta de Lujo: Acentos en Verde Esmeralda (#10b981) y detalles en Oro e Imperial Yellow (#D4AF37).

Cinematic Transitions: Subtle entry movements (Fade-in up) in the style of Falcon 9 launches.

Technical Reliability: Clear interface that conveys confidence, essential for high-value assets.

Developed by Manuel Nieto (NietoDeveloper) — Building scalable systems with 100% discipline. #1 GitHub Colombia Ranking.

GitHub Profile | Portfolio | Software DT Website

Last updated: June 25, 2026