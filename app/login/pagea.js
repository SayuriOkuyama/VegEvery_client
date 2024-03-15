'use client'
import { Auth } from '@supabase/auth-ui-react'
import {
  // Import predefined theme
  ThemeSupa,
} from '@supabase/auth-ui-shared'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { supabase } from '@/lib/utils/supabase/supabase'
import { getProviders, signIn } from 'next-auth/react'
// Login
export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const { data: session } = useSession()

  // signup
  // const handleSignUp = async () => {
  //   await supabase.auth.signUp({
  //     email,
  //     password,
  //     options: {
  //       emailRedirectTo: `${location.origin}/auth/callback`,
  //     },
  //   })
  //   router.refresh()
  // }

  // login
  // const handleSignIn = async () => {
  //   // await supabase.auth.signInWithPassword({
  //   //   email,
  //   //   password,
  //   // })
  //   await supabase.auth.signInWithOAuth({
  //     provider: 'google',
  //   })

  //   router.refresh()
  // }

  // signout
  // const handleSignOut = async () => {
  //   await supabase.auth.signOut()
  //   router.refresh()
  // }

  return (
    <>
      {/* <form action="/auth/login" method="post"> */}
      {/* <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={['google']}
      /> */}
      {
        // セッションがある場合、ログアウトを表示
        session && (
          <div>
            <h1>ようこそ, {session.user && session.user.email}</h1>
            <button onClick={() => signOut()}>ログアウト</button>
          </div>
        )
      }
      {
        // セッションがない場合、ログインを表示
        // ログインボタンを押すと、ログインページに遷移する
        !session && (
          <div>
            <p>ログインしていません</p>
            <button onClick={() => signIn()}>ログイン</button>
          </div>
        )
      }
      {/* <label htmlFor="email">Email</label>
        <input className="border" name="email" />
        <label htmlFor="password">Password</label>
        <input className="border" type="password" name="password" />
        <button className="border" onClick={handleSignIn}>
          Sign In
        </button>
        <button className="border" formAction="/auth/sign-up">
          Sign Up
        </button>
        <button className="border" formAction="/auth/logout">
          Sign Out
        </button> */}
      {/* </form> */}
    </>
  )
}
