# Emerald DT - Front-end Ecosystem 💎🚀
### World-Class E-commerce for Colombian Emeralds

[![GitHub Top #1 - Colombia](https://img.shields.io/badge/GitHub-Top_%231_Colombia-047857?style=for-the-badge&logo=github)](https://committers.top/colombia)
[![Stack: Next.js 15](https://img.shields.io/badge/Stack-Next.js_15_/_TS-000000?style=for-the-badge&logo=nextdotjs)](https://nextjs.org/)
[![Design: SpaceX Inspired](https://img.shields.io/badge/Design-SpaceX_Inspired-white?style=for-the-badge&logo=spacex)](https://www.spacex.com/)

**Emerald DT** es la plataforma de comercio electrónico de alta gama diseñada por el **Nieto Laboratory** para la comercialización de esmeraldas colombianas. Inspirada en la estética minimalista y técnica de **SpaceX**, esta aplicación utiliza una arquitectura de máxima seguridad, escalabilidad mediante doble cluster y un rendimiento de vanguardia.

---

## 🏗️ Architecture & Core Stack

Este repositorio contiene el **Front-end** construido con un enfoque de **World-Class Engineering**:

* **Framework:** Next.js 15 (App Router) - SSR/SSG prioritario.
* **Language:** TypeScript para robustez y tipado estricto.
* **Styling:** Tailwind CSS + Framer Motion (Animaciones cinematográficas).
* **State Management:** Zustand (Ligero y escalable).
* **Internationalization:** i18n dinámico (EN/ES) vía Middleware.
* **Deployment:** Dockerized for AWS & Railway.

---

## 📂 Project Structure (Nieto Lab Standard)

```
src/
├── app/                # Routing & Server Components (Performance-first)
│   ├── [lang]/         # Dynamic i18n support (English/Spanish)
│   │   ├── products/   # High-value asset listings
│   │   ├── about/      # Brand timeline (SpaceX style)
│   │   └── page.tsx    # Immersive Hero Landing (Full-screen Video)
│   ├── layout.tsx      # Root layout, Theme providers, Metadata
│   └── not-found.tsx   # Custom minimalist 404
├── components/         # Atomic Design System
│   ├── ui/             # Atomic: buttons, inputs, high-quality cards
│   ├── shared/         # Shared: Fixed Navbar, Footer, Modals
│   ├── sections/       # Composite: HeroSection, ProductsGrid
│   └── animations/     # Framer Motion Wrappers (Parallax, Fades)
├── hooks/              # Custom logic: useScroll, useIntersectionObserver
├── services/           # API Integration & Caching layers
├── store/              # Global State: Zustand (User prefs, Cart)
├── lib/                # Pure helpers: Validators, formatters
├── types/              # Strict TS definitions for API & Props
├── tests/              # Unit & Integration testing (Jest/Cypress)
└── public/             # Optimized Static Assets (WebM/Avif)
```

🎨 **Design Philosophy: "The SpaceX Way"**  
Immersive Visuals: Fondos oscuros (#000000), tipografía Sans-Serif audaz y uso masivo de espacios en blanco.  

Cinematic Transitions: Movimientos de entrada sutiles (Fade-in up) al estilo de los lanzamientos de Falcon 9.  

Technical Reliability: Interfaz clara que transmite confianza, esencial para la venta de activos de alto valor como las esmeraldas.

🔒 **Security & Performance Features**  
Security Architecture: Implementación de Content Security Policy (CSP) estricta y protección contra CSRF.  

Double Cluster Ready: Configuración optimizada para balanceo de carga en entornos Dockerizados.  

Image Optimization: Uso de next/image con formatos AVIF para carga ultra rápida de gemas en alta resolución.

