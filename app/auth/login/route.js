import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

//  ログインフォームに入力し、Submitが行われるとこちらの処理に飛ぶ
export async function POST(request) {
  console.log(request)
  const requestUrl = new URL(request.url)
  const formData = await request.formData()
  const email = formData.get('email')
  const password = formData.get('password')
  // const cookieStore = cookies()
  const supabase = createRouteHandlerClient({ cookies })
  // ログインに利用するメールアドレス・パスワードを、supabase側のsignin処理に送っている
  await supabase.auth.signInWithPassword({
    email,
    password,
  })
  // 問題がなければそのままプロフィール画面が表示される

  // 301 ステータスを返すと、POST から GET ルートにリダイレクトされます
  return NextResponse.redirect(requestUrl.origin, {
    status: 301,
  })
}
