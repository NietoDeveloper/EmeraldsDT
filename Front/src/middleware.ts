import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Si el usuario entra a la raíz '/', enviarlo a '/es' o '/en'
  if (pathname === '/') {
