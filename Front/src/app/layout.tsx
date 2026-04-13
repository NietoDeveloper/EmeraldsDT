import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer"; 
import Preloader from "@/components/shared/Preloader";
import { Suspense } from "react";
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
  description: "The world's premier platform for high-value Colombian emeralds. Developed by Software DT.",
  keywords: ["Emeralds", "Colombia", "Luxury", "NietoDeveloper", "Software DT", "Gems", "Engineering"],
  icons: {
    icon: [{ url: "/assets/img/logo.png", href: "/assets/img/logo.png", type: "image/png" }],
    shortcut: "/assets/img/logo.png",
    apple: [{ url: "/assets/img/logo.png", sizes: "180x180", type: "image/png" }],
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang?: string }>; 
}

/**
 * Emerald DT - Root Layout Orchestrator
 * Arquitectura de Bloqueo Crítico para Ciclo S+
 */
export default async function RootLayout(props: RootLayoutProps) {
  const { children, params } = props;
  const resolvedParams = await params;
  const lang = resolvedParams?.lang || "en";

  return (
    <html 
      lang={lang} 
      className={`${sans.variable} ${mono.variable} scroll-smooth js-loading`}
      suppressHydrationWarning 
    >
      <head>
        {/* CSS CRÍTICO INLINE: Evita el parpadeo centesimal antes de cargar globals.css */}
        <style dangerouslySetInnerHTML={{ __html: `
          html.js-loading body { overflow: hidden !important; background: #000 !important; }
          #main-content { opacity: 0; visibility: hidden; }
          html.js-loaded #main-content { 
            opacity: 1 !important; 
            visibility: visible !important; 
            transition: opacity 1.2s cubic-bezier(0.43, 0.13, 0.23, 0.96); 
          }
        `}} />
      </head>
      <body className="antialiased bg-black text-white selection:bg-emerald-500/30 selection:text-emerald-200 min-h-screen flex flex-col font-sans overflow-x-hidden">
        
        {/* Capa de Preloader: Controla las clases js-loading/js-loaded */}
        <Suspense fallback={null}>
          <Preloader />
        </Suspense>

        {/* Estructura Principal */}
        <div id="main-content" className="flex flex-col min-h-screen">
          <Navbar />
          
          <main className="flex-grow w-full pt-20 md:pt-24 relative z-10">
            <PageTransitionWrapper>
              {children}
            </PageTransitionWrapper>
          </main>

          <Footer />
        </div>

      </body>
    </html>
  );
}