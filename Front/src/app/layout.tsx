import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer"; 
import Preloader from "@/components/shared/Preloader";
import { Suspense } from "react";
import PageTransitionWrapper from "@/components/shared/PageTransitionWrapper"; 

const sans = Inter({ variable: "--font-sans", subsets: ["latin"], display: 'swap' });
const mono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"], display: 'swap' });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  metadataBase: new URL('https://emeralddt.com'),
  title: { default: "Emerald DT | Colombian Emeralds", template: "%s | Emerald DT" },
  description: "The world's premier platform for high-value Colombian emeralds.",
  icons: { icon: "/assets/img/logo.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} scroll-smooth`} suppressHydrationWarning>
      <head>
        {/* Estilos críticos para evitar FOUC y manejar el Preloader */}
        <style dangerouslySetInnerHTML={{ __html: `
          #main-content { opacity: 0; }
          html.js-loaded #main-content { opacity: 1; transition: opacity 1.2s ease; }
        `}} />
      </head>
      <body className="antialiased bg-black text-white min-h-screen flex flex-col font-sans overflow-x-hidden">
        {/* Preloader con Suspense para optimización de carga */}
        <Suspense fallback={null}>
          <Preloader />
        </Suspense>

        <Navbar />
        
        <div id="main-content" className="flex flex-col flex-grow">
          {/* IMPORTANTE: Se eliminó pt-20/pt-24. 
            Ahora el contenido empieza en el borde superior (y=0).
            Esto es vital para que las secciones h-[100dvh] del Home no se desplacen.
          */}
          <main className="flex-grow w-full relative z-10">
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