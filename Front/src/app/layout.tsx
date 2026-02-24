import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/shared/Navbar";

// Configuración de fuentes con el look técnico de SpaceX
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
  keywords: ["Emeralds", "Colombia", "Luxury", "Nieto Laboratory", "Blockchain", "Gems"],
  openGraph: {
    title: "Emerald DT | Eternal Emeralds",
    description: "World-class emerald commercialization with SpaceX-inspired engineering.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  }
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: { lang: string };
}

/**
 * Root Layout - Emerald DT
 * Punto de entrada principal que envuelve toda la aplicación.
 */
export default function RootLayout({
  children,
  params,
}: RootLayoutProps) {

  );
}