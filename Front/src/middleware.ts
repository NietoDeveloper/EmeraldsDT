import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Si el usuario entra a la raíz '/', enviarlo a '/es' o '/en'
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/en', request.url));
  }

  return NextResponse.next();
}

// 2. El matcher debe dejar pasar archivos estáticos (fotos, iconos, css)
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, icon.png (metadata files)
     * - assets (tu carpeta de imágenes de minas)
     */
    '/((?!api|_next/static|_next/image|assets|favicon.ico|icon.png).*)',
  ],
};