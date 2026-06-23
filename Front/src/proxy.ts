import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * 🚀 EMERALD DT - PERIMETRAL PROXY
 * Orquestación de enrutamiento e idioma optimizada para Next.js 16 (Turbopack).
 * Protege el canal de WebSockets de desarrollo contra intercepciones de ciclo.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Redirección geo-idiomática limpia en la raíz pura
  if (pathname === '/') {
    const acceptLanguage = request.headers.get('accept-language') || '';
    const preferredLang = acceptLanguage.startsWith('en') ? '/en' : '/es';
    return NextResponse.redirect(new URL(preferredLang, request.url));
  }

  return NextResponse.next();
}


export const config = {
  matcher: [
    /*
     * EXCLUSIONES CRÍTICAS:
     * - api, _next/static, _next/image: Rutas nativas de Next.js
     * - _next/webpack-hmr: EXCEPCIÓN OBLIGATORIA para desbloquear WebSockets de Turbopack en IP local
     * - assets, *.ico, *.png, .*\\..*$: Archivos estáticos y recursos multimedia de alta fidelidad
     */
    '/((?!api|_next/static|_next/image|_next/webpack-hmr|assets|favicon.ico|icon.png|.*\\..*$).*)',
  ],
};