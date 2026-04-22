import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google"; // Fuentes modernas de Next.js
import "./globals.css";

// Optimización de fuentes para reducir el Layout Shift
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Emerald DT | Control Center",
    template: "%s | Emerald DT"
  },
  description: "Senior Software Architect - High-performance industrial monitoring dashboard by Software DT.",
  robots: {
    index: false, // Por seguridad, los dashboards no deben ser indexados por Google
    follow: false,
  },
};

// Configuración crítica para evitar que el usuario haga zoom por accidente en el dashboard
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="selection:bg-gold/30 selection:text-black">
