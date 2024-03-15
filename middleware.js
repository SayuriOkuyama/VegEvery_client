import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

export async function middleware(req) {
  const res = NextResponse.next()

  // Cookie を使用するように構成された Supabase クライアントを作成する
  const supabase = createMiddlewareClient({ req, res })

  // 有効期限が切れた場合はセッションを更新します - サーバー コンポーネントに必要です
  await supabase.auth.getUser()

  return res
}

// ミドルウェアが関連するパスに対してのみ呼び出されることを確認します。
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
