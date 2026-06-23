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
    const acceptLangua