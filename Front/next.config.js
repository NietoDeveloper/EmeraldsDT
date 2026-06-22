import type { NextConfig } from 'next';

/**
 * 🚀 EMERALD DT - CORE INFRASTRUCTURE CONFIG
 * Configuración optimizada para despliegues de alta disponibilidad en Docker y Railway.
 * Solución absoluta para el bypass de WebSockets en Turbopack (Nieto Laboratory).
 */
const nextConfig = {
  // Desbloqueo perimetral nativo para desarrollo en red local
  allowedDevOrigins: [
    'localhost:3000',
    '192.168.0.21:3000'
  ],

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

  // Configuración de empaquetado para entornos distribuidos
  output: 'standalone'
} as any; // Cast aséptico temporal para forzar la lectura completa de propiedades raíz en Next 16

export default nextConfig as NextConfig;