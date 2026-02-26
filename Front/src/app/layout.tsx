import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer"; 

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
  // ... resto de tu metadata igual
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const resolvedParams = await params;
  const lang = resolvedParams?.lang || "en";

  return (
    <html 
      lang={lang} 
      className={`${sans.variable} ${mono.variable} scroll-smooth`}
      suppressHydrationWarning 
    >
      {/* 1. Eliminamos 'relative' y cualquier clase que force altura en body.
          2. Dejamos que el flujo natural de HTML maneje el scroll.
      */}
      <body className="antialiased bg-black text-white selection:bg-emerald/30 selection:text-gold">
        
        {/* Navbar es fixed, no ocupa espacio en el flujo */}
        <Navbar />
        
        {/* ESTRUCTURA UNIFICADA:
            Eliminamos el div 'flex-col min-h-screen' que suele causar el doble scroll en Next.js 15.
            En su lugar, usamos 'main' directamente como el contenedor que empuja al footer.
        */}
        <main className="min-h-screen w-full flex flex-col">
          {/* Contenido dinámico: 
              Asegúrate de que tus secciones dentro de children NO tengan 'h-screen' fijo, 
              sino 'min-h-screen' o 'min-h-[100dvh]'.
          */}
          <div className="flex-grow">
            {children}
          </div>
          
          <Footer />
        </main>

      </body>
    </html>
  );
}