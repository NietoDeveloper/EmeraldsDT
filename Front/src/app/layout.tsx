import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer"; 
import Preloader from "@/components/shared/Preloader";
import { Suspense } from "react";
// Importamos motion para la transición (necesita un wrapper client)
import PageTransitionWrapper from "@/components/shared/PageTransitionWrapper"; 

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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  metadataBase: new URL('https://emeralddt.com'),
  title: {
    default: "Emerald DT | Colombian Emeralds & High Engineering",
    template: "%s | Emerald DT"
  },
  description: "The world's premier platform for high-value Colombian emeralds. Designed by Nieto Laboratory.",
  keywords: ["Emeralds", "Colombia", "Luxury", "Nieto Laboratory", "Gems", "Engineering"],
  icons: {
    icon: [{ url: "/assets/img/logo.png", href: "/assets/img/logo.png", type: "image/png" }],
    shortcut: "/assets/img/logo.png",
    apple: [{ url: "/assets/img/logo.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: "Emerald DT | Eternal Emeralds",
    description: "World-class emerald commercialization with SpaceX-inspired engineering.",
    url: "https://emeralddt.com",
    siteName: "Emerald DT",
    images: [{ url: "/assets/img/og-emerald.jpg", width: 1200, height: 630, alt: "Emerald DT" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Emerald DT | Colombian Masterpieces",
    description: "High engineering meets eternal gems.",
    images: ["/assets/img/og-emerald.jpg"],
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang?: string }>; 
}

/**
 * Emerald DT - Root Layout Orchestrator
 * Arquitectura Máxima Seguridad - Ciclo S+
 */
export default async function RootLayout(props: RootLayoutProps) {
  // En Next.js 16, resolvemos params de forma asíncrona
  const { children, params } = props;
  const resolvedParams = await params;
  const lang = resolvedParams?.lang || "en";

  return (
    <html 
      lang={lang} 
      className={`${sans.variable} ${mono.variable} scroll-smooth`}
      suppressHydrationWarning 
    >
      <body className="antialiased bg-black text-white selection:bg-emerald-500/30 selection:text-emerald-200 min-h-screen flex flex-col font-sans overflow-x-hidden">
        
        {/* PRELOADER CINEMÁTICO (5 SEGUNDOS)
            Debe estar en Suspense para manejar useSearchParams internamente
        */}
        <Suspense fallback={null}>
          <Preloader />
        </Suspense>

        <Navbar />
        
        {/* CONTENEDOR PRINCIPAL CON TRANSICIÓN
            PageTransitionWrapper maneja el Fade In después del Preloader
        */}
        <main className="flex-grow w-full pt-20 md:pt-24 relative z-10">
          <PageTransitionWrapper>
            {children}
          </PageTransitionWrapper>
        </main>

        <Footer />
      </body>
    </html>
  );
}