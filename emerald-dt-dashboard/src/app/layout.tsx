import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google"; // Fuentes modernas de Next.js
import "./globals.css";

// Optimización de fuentes para reducir el Layout Shift
const geistSans = Geist({
