import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Fuentes que dan el look técnico de SpaceX
const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Emerald DT | Colombian Emeralds & High Engineering",
  description: "The world's premier platform for high-value Colombian emeralds. Designed by Nieto Laboratory.",
  keywords: ["Emeralds", "Colombia", "Luxury", "Nieto Laboratory", "Blockchain", "Gems"],
  openGraph: {
    title: "Emerald DT | Eternal Emeralds",
    description: "World-class emerald commercialization with SpaceX-inspired engineering.",
    images: ["/og-image.jpg"], // Imagen para compartir en redes
  },
  icons: {
    icon: "/favicon.ico",
  }
};


export default function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  // Nota: En el RootLayout, params.lang viene de la URL dinámica [lang]
 
  );
}