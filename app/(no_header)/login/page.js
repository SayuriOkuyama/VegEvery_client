'use client'

import Logo from '@/components/ui/Logo'
import { Button } from '@/components/ui/button'
import axios from '@/lib/axios'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const page = () => {
  const router = useRouter()
  const [inputValue, setInputValue] = useState({ userName: '', password: '' })

  const handleGoogleLogin = async () => {
    const res = await axios.get(`/login/google`)
    console.log(res)
    router.push(res.data)
  }
  const handleLogin = async () => {
    const res = await axios.post(`/login`, {
      name: inputValue.userName,
      password: inputValue.password,
    })
    console.log(res)
  }

  return (
    <>
      <div className="mt-20">
        <Logo size="100" />
      </div>
      <main className="container mx-auto">
        <Button
          className="border flex items-center py-3 px-4 mt-12 mx-auto"
          onClick={handleGoogleLogin}>
          <Image
            width={20}
            height={20}
            src={'/google-logo.png'}
            className="block mr-2"
          />
          <p className="leading-none">Google アカウントでログイン</p>
        </Button>
        <p className="text-center my-8">または</p>
        <div className="text-center space-y-2">
          <input
            type="text"
            placeholder="ユーザー名"
            className="border w-full"
            onChange={e =>
              setInputValue(prev => ({
                ...prev,
                userName: e.target.value,
              }))
            }
            value={inputValue.userName}
          />
          <input
            type="text"
            placeholder="パスワード"
            className="border w-full"
            onChange={e =>
              setInputValue(prev => ({
                ...prev,
                password: e.target.value,
              }))
            }
            value={inputValue.password}
          />
        </div>
        <div className="flex justify-end mt-1">
          <p className="text-sm">
            パスワードをお忘れの場合は
            <Link href={'/password'} className="text-blue-600">
              こちら
            </Link>
          </p>
        </div>
        <Button
          className="border flex items-center py-3 px-8 mt-4 mx-auto"
          onClick={handleLogin}>
          ログイン
        </Button>
        <p className="text-center mt-12 text-sm">
          アカウントをお持ちでない場合
        </p>
        <Link href={'/register'}>
          <Button
            className="border flex items-center py-3 px-4 mt-4 mx-auto"
            onClick={handleGoogleLogin}>
            <p className="leading-none">新規アカウント作成</p>
          </Button>
        </Link>
      </main>
    </>
  )
}

export default page
