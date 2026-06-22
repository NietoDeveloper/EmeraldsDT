import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Next.js 16 requiere que la función se llame 'proxy' si usas la convención proxy.ts
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;


    /*
     * Excluye rutas del sistema y archivos estáticos. 
     * El patrón `.*\\..*$` evita que el proxy evalúe imágenes de minas u otros recursos dinámicos.
     */
    '/((?!api|_next/static|_next/image|assets|favicon.ico|icon.png|.*\\..*$).*)',
  ],
};