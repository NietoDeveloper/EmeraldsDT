import type { NextConfig } from 'next';

/**
 * 🚀 EMERALD DT - CORE INFRASTRUCTURE CONFIG
 * Configuración optimizada para despliegues de alta disponibilidad en Docker y Railway.
 * Adaptado con inmunidad de origen para Turbopack en el Nieto Laboratory.
 */
const nextConfig: NextConfig = {
  // 1. Autorización de tráfico HMR para Next.js 16 (Llave de primer nivel)
  allowedDevOrigins: [
    'localhost:3000',
    '192.168.0.21:3000'
  ],

  images: {
    formats: ['image/avif', ''],
    remotePatterns: [
      {

      },
    ],
  },


  
};

export default nextConfig;