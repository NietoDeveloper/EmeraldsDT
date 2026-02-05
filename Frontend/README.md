

```text
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
🎨 Design Philosophy: "The SpaceX Way"
Immersive Visuals: Fondos oscuros (#000000), tipografía Sans-Serif audaz y uso masivo de espacios en blanco.

Cinematic Transitions: Movimientos de entrada sutiles (Fade-in up) al estilo de los lanzamientos de Falcon 9.

Technical Reliability: Interfaz clara que transmite confianza, esencial para la venta de activos de alto valor como las esmeraldas.

🔒 Security & Performance Features
Security Architecture: Implementación de Content Security Policy (CSP) estricta y protección contra CSRF.

Double Cluster Ready: Configuración optimizada para balanceo de carga en entornos Dockerizados.

Image Optimization: Uso de next/image con formatos AVIF para carga ultra rápida de gemas en alta resolución.

🚀 Getting Started
Clone & Install:

Bash

git clone [https://github.com/NietoDeveloper/emerald-dt-front.git](https://github.com/NietoDeveloper/emerald-dt-front.git)
npm install
Environment Setup: Crea un archivo .env.local con las credenciales de AWS y la URL del Backend de Node.js.

Run Development:

Bash

npm run dev
🛠️ Deployment
Este proyecto está preparado para ejecutarse en contenedores Docker:

Bash

docker build -t emerald-dt-front .
docker run -p 3000:3000 emerald-dt-front
Developed by Manuel Nieto (NietoDeveloper) Building scalable systems with 100% discipline. #1 GitHub Colombia Ranking |