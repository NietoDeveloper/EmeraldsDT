import type { NextConfig } from 'next';

/**
 * 🚀 EMERALD DT - CORE INFRASTRUCTURE CONFIG
 * Configuración optimizada para despliegues de alta disponibilidad en Docker y Railway.
 * Adaptado con inmunidad de origen para Turbopack en el Nieto Laboratory.
 */
const nextConfig: NextConfig = {
  // Optimizac
        protocol: 'https',
        hostname: '**.amazonaws.com', // Conexión blindada para S3 en AWS
      },
    ],
  },

  // Máxima seguridad y estabilidad del clúster
  reactStrictMode: true,
  poweredByHeader: false, // Perímetro seguro: Mitiga escaneos de firma de framework

    ]
  }
};

export default nextConfig;