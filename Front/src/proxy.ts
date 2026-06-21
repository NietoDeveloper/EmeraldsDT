import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Next.js 16 requiere que la función se llame 'proxy' si usas la convención proxy.ts
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Si entra a la raíz pura '/', detectar el idioma preferido del navegador o redirigir a '/es' por defecto
  if (pathname === '/') {
    const acceptLanguage = request.headers.get('accept-language') || '';
    const preferredLang = acceptLanguage.startsWith('en') ? '/en' : '/es';
    return NextResponse.redirect(new URL(preferredLang, request.url));
  }

  return NextResponse.next();
}

// 2. El matcher ignora API, estáticos, assets y cualquier archivo con extensión (ej. .png, .css, .js)
export const config = {
  matcher: [
    /*
     * Excluye rutas del sistema y archivos estáticos. 
     * El patrón `.*\\..*$` evita que el proxy evalúe imágenes de minas u otros recursos dinámicos.
     */
    '/((?!api|_next/static|_next/image|assets|favicon.ico|icon.png|.*\\..*$).*)',
  ],
};