/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. Desbloqueo perimetral de WebSockets para desarrollo en red local (Next.js 16 / Turbopack)
  allowedDevOrigins: [
    'localhost:3000',
    '192.168.0.21:3000',
    '192.168.0.21'
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

  // Máxima seguridad y estabilidad del clúster
  reactStrictMode: true,
  poweredByHeader: false, // Perímetro seguro: Mitiga escaneos de firma de framework

  // Configuración dinámica: 'standalone' para Docker/Railway, inactivo para Serverless nativo en Vercel
  output: process.env.VERCEL ? undefined : 'standalone'
};

module.exports = nextConfig;