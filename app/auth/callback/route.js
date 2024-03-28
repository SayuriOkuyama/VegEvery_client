import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

//ユーザー登録後に送られるメール上に載っているURLにアクセスすることで発火するGET
export async function GET(request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  // console.log(requestUrl.origin)
  if (code) {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    await supabase.auth.exchangeCodeForSession(code)
  }

  // サインインプロセスの完了後にリダイレクトされる URL (トップページ)
  return NextResponse.redirect(requestUrl.origin)
}
