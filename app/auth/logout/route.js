import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

// プロフィール画面でログアウトを行った際に行われる処理
export async function POST(request) {
  const requestUrl = new URL(request.url)
  // const cookieStore = cookies()
  const supabase = createRouteHandlerClient({ cookies })
  // supabase側のsignout処理を行い、ログインページにリダイレクト
  await supabase.auth.signOut()

  // 301 ステータスを返すと、POST から GET ルートにリダイレクトされます
  return NextResponse.redirect(`${requestUrl.origin}/login`, {
    status: 301,
  })
}
