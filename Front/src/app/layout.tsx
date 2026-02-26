import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer"; // Importación vital

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
  metadataBase: new URL('https://emeralddt.com'),
  title: {
    default: "Emerald DT | Colombian Emeralds & High Engineering",
    template: "%s | Emerald DT"
  },
  description: "The world's premier platform for high-value Colombian emeralds. Designed by Nieto Laboratory.",
  keywords: ["Emeralds", "Colombia", "Luxury", "Nieto Laboratory", "Gems", "Engineering"],
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

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const resolvedParams = await params;
  const lang = resolvedParams?.lang || "en";

  return (
    <html 
      lang={lang} 
      className={`scroll-smooth ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning 
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

        
        {/* Estructura de contenido */}
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow relative w-full overflow-x-hidden">
            {children}
          </main>
          
          {/* El Footer ahora cierra cada página del ecosistema Emerald DT */}
          <Footer />
        </div>
      </body>
    </html>
  );
}