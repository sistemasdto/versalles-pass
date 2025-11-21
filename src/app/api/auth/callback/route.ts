// =====================================================
// AUTH CALLBACK - Magic Link Handler
// =====================================================

import { createServerSupabaseClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const supabase = await createServerSupabaseClient()
    await supabase.auth.exchangeCodeForSession(code)
  }

  // Redirigir a la página de pre-admisión
  return NextResponse.redirect(new URL('/pre-admission', request.url))
}
