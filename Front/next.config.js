/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. Desbloqueo perimetral directo de WebSockets exigido por el compilador
  allowedDevOrigins: [
    '192.168.0.21:3000',
    'localhost:3000'
  ],

  // Optimización avanzada de imágenes
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',

      },
    ],
  },

  // Estabilidad del clúster
  reactStrictMode: true,
  poweredByHeader: false,

  // Empaquetado distribuido
  output: 'standalone'
};

module.exports = nextConfig;