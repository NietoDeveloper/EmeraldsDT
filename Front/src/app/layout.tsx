import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/shared/Navbar";

// Look técnico Nieto Lab / SpaceX
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
  params: Promise<{ lang: string }>; // En Next.js 15+ params es un Promise
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
          min-h-screen 
          overflow-x-hidden
          selection:bg-emerald/30 
          selection:text-gold
        `}
      >
        {/* Capa superior: Navbar (Fixed) */}
        <Navbar />
        
        {/* Capa base: Contenido */}
        <div className="relative flex flex-col w-full min-h-screen">
          {children}
        </div>

        {/* El Footer se insertará aquí */}
      </body>
    </html>
  );
}