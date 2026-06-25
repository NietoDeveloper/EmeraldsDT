/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración Experimental Avanzada (Next.js 16 / Turbopack)
  experimental: {
    // Desbloqueo perimetral para desarrollo y WebSockets en red local
    serverActions: {
      allowedOrigins: [
        'localhost:3000',
        '192.168.0.21:3000',
        '192.168.0.21'
      ],
    },
  },

  // Optimización avanzada de imágenes (Renderizado de Gemas de alta pureza)
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.amazonaws.com', // Conexión blindada para S3 en AWS
      },
    ],
  },

  // Máxima seguridad y estabilidad del ecosistema
  reactStrictMode: true,
  poweredByHeader: false, // Perímetro seguro: Oculta la firma del framework para mitigar escaneos de vulnerabilidades

  // Arquitectura de despliegue híbrida y dinámica
  // 'standalone' optimiza al máximo para contenedores Docker/Railway empaquetando solo lo necesario,
  // mientras que para Vercel se desactiva permitiendo el comportamiento serverless nativo automatizado.
  output: process.env.VERCEL ? undefined : 'standalone'
};

module.exports = nextConfig;