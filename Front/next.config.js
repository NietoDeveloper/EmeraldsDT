/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración de red del servidor de desarrollo para Next.js 16 / Turbopack
  devServer: {
    allowedDevOrigins: [
      'localhost:3000',
      '192.168.0.21:3000'
    ]
  },

  // Compatibilidad alternativa directa exigida por el compilador nativo
  allowedDevOrigins: [
    'localhost:3000',
    '192.168.0.21:3000'
  ],

  // Optimización avanzada de imágenes
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.amazonaws.com', // Conexión blindada para S3 en AWS
      },
    ],
  },
