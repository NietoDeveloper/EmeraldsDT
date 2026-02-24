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

