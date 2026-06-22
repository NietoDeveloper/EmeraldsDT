/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. Desbloqueo perimetral directo de WebSockets exigido por Next.js 16
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

  // Máxima seguridad y estabilidad del clúster
  reactStrictMode: true,
  poweredByHeader: false, // Perímetro seguro: Mitiga escaneos de firma de framework

  // Configuración de empaquetado para entornos distribuidos
  output: 'standalone'
};

module.exports = nextConfig;