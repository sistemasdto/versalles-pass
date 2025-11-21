// =====================================================
// MIDDLEWARE - No necesario en modo demo
// =====================================================

import { NextResponse, type NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // En modo demo, simplemente permitir todas las requests
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
