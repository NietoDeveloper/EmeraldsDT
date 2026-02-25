import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/shared/Navbar";

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: 'swap',
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: 'swap',
});

// Calibración de Metadata para evitar warnings y mejorar SEO
export const metadata: Metadata = {
  metadataBase: new URL('https://emeralddt.com'), // Ajustar cuando tengas el dominio final
  title: {
    default: "Emerald DT | Colombian Emeralds & High Engineering",
    template: "%s | Emerald DT"
  },
  description: "The world's premier platform for high-value Colombian emeralds. Designed by Nieto Laboratory.",
  keywords: ["Emeralds", "Colombia", "Luxury", "Nieto Laboratory", "Gems", "Nieto Lab", "Engineering"],
  openGraph: {
    title: "Emerald DT | Eternal Emeralds",
    description: "World-class emerald commercialization with SpaceX-inspired engineering.",
    url: "https://emeralddt.com",
    siteName: "Emerald DT",
    images: [
      {
        url: "/assets/img/og-emerald.jpg",
        width: 1200,
        height: 630,
        alt: "Emerald DT Masterpiece",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Emerald DT | Colombian Masterpieces",
    description: "High engineering meets eternal gems.",
    images: ["/assets/img/og-emerald.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

/**
 * Emerald DT - Root Architecture
 * Garantía de estabilidad: Next.js 15.1.7 + React 19
 * Responsive: 310px - 1900px
 */
export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  // En Next 15, los params DEBEN ser awaitados
  const resolvedParams = await params;
  const lang = resolvedParams?.lang || "en";

  return (
    <html 
      lang={lang} 
      className={`scroll-smooth ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning // Evita warnings de extensiones de navegador
    >
      <body
        className={`
          antialiased 
          bg-black 
          text-white
          min-h-screen
          w-full
          overflow-x-hidden
          selection:bg-emerald/30 
          selection:text-gold
          relative
          m-0 p-0
        `}
      >
        {/* Navbar fijo con z-index superior */}
        <Navbar />
        
        {/* Contenedor principal sin restricciones de ancho para permitir scroll snap fluido */}
        <main className="relative w-full overflow-x-hidden">
          {children}
        </main>
      </body>
    </html>
  );
}