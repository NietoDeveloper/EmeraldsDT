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
 