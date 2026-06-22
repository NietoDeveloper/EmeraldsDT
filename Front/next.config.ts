import type { NextConfig } from 'next';

/**
 * 🚀 EMERALD DT - CORE INFRASTRUCTURE CONFIG
 * Configuración optimizada para despliegues de alta disponibilidad en Docker y Railway.
 * Adaptado con inmunidad de origen para Turbopack en el Nieto Laboratory.
 */
const nextConfig: NextConfig = {
  // Optimización avanzada de imágenes (Gemas de alta pureza)
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.amazonaws.com', // Conexión blindada para S3 en AWS
      },
    ],
  },

  // Máxima seguridad y estabilidad del clúster
  reactStrictMode: true,
  poweredByHeader: false, // Perímetro seguro: Mitiga escaneos de firma de framework



  // Características experimentales autorizadas
  experimental: {
    // Abre el canal de WebSockets de Turbopack para desarrollo local y en red cableada/Wi-Fi
    allowedDevOrigins: [
      'localhost:3000',
      '192.168.0.21:3000'
    ]
  }
};

export default nextConfig;