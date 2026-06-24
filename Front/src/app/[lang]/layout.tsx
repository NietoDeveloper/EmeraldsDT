import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "@/app/globals.css";
import { Navbar } from "@/components/shared/Navbar";
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
  description: "The world's premier platform for high-value Colombian emeralds. Developed by Nieto Laboratory.",
  keywords: ["Emeralds", "Colombia", "Luxury", "NietoDeveloper", "Software DT", "Gems", "Engineering"],
  icons: {
    icon: [{ url: "/img/logo.png", href: "/img/logo.png", type: "image/png" }],
    shortcut: "/img/logo.png",
    apple: [{ url: "/img/logo.png", sizes: "180x180", type: "image/png" }],
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang?: string }>; 
}

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
        {/* Estilos de inicialización y scrollbar esmeralda integrado a nivel global */}
        <style dangerouslySetInnerHTML={{ __html: `
          html.js-loading body { overflow: hidden !important; background: #000 !important; }
          #main-content { opacity: 0; visibility: hidden; }
          html.js-loaded #main-content { 
            opacity: 1 !important; 
            visibility: visible !important; 
            transition: opacity 1.2s cubic-bezier(0.43, 0.13, 0.23, 0.96); 
          }
          
          /* Inyección del scrollbar esmeralda directo en el motor de renderizado del navegador */
          ::-webkit-scrollbar {
            width: 6px !important;
            height: 6px !important;
          }
          ::-webkit-scrollbar-track {
            background: #000000 !important;
          }
          ::-webkit-scrollbar-thumb {
            background: #059669 !important;
            border-radius: 3px !important;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: #10b981 !important;
          }
          html {
            scrollbar-width: thin !important;
            scrollbar-color: #059669 #000000 !important;
            overflow-y: auto !important; /* Fuerza la reactivación del scroll vertical general */
          }
        `}} />
      </head>
      <body className="antialiased bg-black text-white selection:bg-emerald-500/30 selection:text-emerald-200 min-h-screen font-sans overflow-x-hidden">
        
        {/* Orquestación perimetral de carga controlada */}
        <Suspense fallback={null}>
          <Preloader />
        </Suspense>

        {/* Árbol estructural de interfaz: escala responsiva estricta de 310px a 1900px */}
        <div id="main-content" className="relative flex flex-col min-h-screen w-full overflow-x-hidden">
          
          <Navbar />
          
          <main className="flex-grow w-full relative z-10 flex flex-col">
            <PageTransitionWrapper>
              {children}
            </PageTransitionWrapper>
          </main>

        </div>
      </body>
    </html>
  );
}