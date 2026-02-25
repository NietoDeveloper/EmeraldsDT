/** @type {import('next').NextConfig} */
const nextConfig = {
  /* * En Next.js 15 estable, el compilador de React se activa 
   * automáticamente si detecta React 19, no es necesario forzarlo 
   * aquí si causaba errores de parseo.
   */
  
  // Optimización de imágenes (Crucial para el e-commerce de esmeraldas)
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.amazonaws.com', // Preparado para tu arquitectura AWS
      },
    ],
  },

  // Seguridad y estabilidad
  reactStrictMode: true,
  poweredByHeader: false, // Seguridad: no revelar que usamos Next.js
  
  // Configuración de salida para Docker/Railway
  output: 'standalone', 
};

export default nextConfig;