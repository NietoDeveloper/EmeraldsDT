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
  keywords: ["Emeralds", "Colombia", "Luxury", "Nieto Laboratory", "Gems", "Engineering"],
  
  // --- UNIFICACIÓN DE ICONOS (FAVICON) ---
  icons: {
    icon: "/assets/img/logo.png",       // Icono principal (pestaña)
    shortcut: "/assets/img/logo.png",   // Acceso directo
    apple: "/assets/img/logo.png",      // Icono para iPhone/iPad
  },
  // ---------------------------------------

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
  params: Promise<{ lang: string }>;
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { lang } = await params;

  return (
    <html 
      lang={lang || "en"} 
      className={`${sans.variable} ${mono.variable} scroll-smooth`}
      suppressHydrationWarning 
    >
      <body className="antialiased bg-black text-white selection:bg-emerald/30 selection:text-gold min-h-screen flex flex-col">
        {/* Navbar con posición fija para control de scroll */}
        <Navbar />
        
        {/* Main que crece para empujar el footer y encapsula el contenido */}
        <main className="flex-grow w-full">
          {children}
        </main>
        
        <Footer />
      </body>
    </html>
  );
}