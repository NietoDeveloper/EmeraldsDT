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

export const metadata: Metadata = {
  title: "Emerald DT | Colombian Emeralds & High Engineering",
  description: "The world's premier platform for high-value Colombian emeralds. Designed by Nieto Laboratory.",
  keywords: ["Emeralds", "Colombia", "Luxury", "Nieto Laboratory", "Gems", "Nieto Lab"],
  openGraph: {
    title: "Emerald DT | Eternal Emeralds",
    description: "World-class emerald commercialization with SpaceX-inspired engineering.",
    images: ["/assets/img/og-emerald.jpg"],
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  }
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { lang } = await params;

  return (
    <html lang={lang || "en"} className="scroll-smooth">
      <body
        className={`
          ${sans.variable} 
          ${mono.variable} 
          antialiased 
          bg-black 
          text-white
          /* RESET DE CAJA: Forzamos que el body ocupe todo el ancho real */
          w-full 
          max-w-[100vw]
          overflow-x-hidden
          selection:bg-emerald/30 
          selection:text-gold
          relative
        `}
      >
        {/* Navbar: Al estar fuera del main, se rige por el body */}
        <Navbar />
        
        {/* Contenedor de contenido: Usamos min-h-screen para asegurar que empuje el footer */}
        <main className="relative flex flex-col w-full min-h-screen">
          {children}
        </main>

        {/* El Footer se insertará aquí */}
      </body>
    </html>
  );
}