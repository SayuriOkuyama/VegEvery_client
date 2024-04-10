'use client'

import Logo from '@/components/ui/Logo'
import { Button } from '@/components/ui/button'
import axios from '@/lib/axios'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useAuth } from '@/hooks/auth'
import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const page = () => {
  const router = useRouter()
  const [loginErrors, setErrors] = useState([])
  const [, setStatus] = useState(null)

  const formSchema = z.object({
    account_id: z
      .string()
      .min(1, {
        message: '※ 入力が必須です。',
      })
      .max(225, {
        message: '※ 225 文字以内で入力してください。',
      })
      .refine(value => /^[A-Za-z0-9]+$/.test(value), {
        message: '半角英数字で入力してください。',
      }),
    password: z
      .string()
      .min(1, {
        message: '※ 入力が必須です。',
      })
      .max(225, {
        message: '※ 225 文字以内で入力してください。',
      })
      .refine(
        value => /^[A-Za-z0-9!@#$%^&*()_+={}[\]:;"'<>,.?/~`-]+$/.test(value),
        {
          message: 'パスワードは半角英数字、記号で入力してください。',
        },
      ),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      password: '',
    },
    mode: 'onChange',
  })

  const { login } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/',
  })

  // useEffect(() => {
  //   console.log(router.reset)
  //   if (router.reset?.length > 0 && loginErrors.length === 0) {
  //     setStatus(atob(router.reset))
  //   } else {
  //     setStatus(null)
  //   }
  // })
  console.log(errors)
  // console.log(status)

  const handleGoogleLogin = async () => {
    const res = await axios.get(`/api/user/auth/google`)
    router.push(res.data)
  }

  const handleLogin = async values => {
    // console.log('login')
    login({
      setErrors,
      setStatus,
      account_id: values.account_id,
      password: values.password,
    })
  }

  return (
    <>
      <div className="pt-8">
        <Logo size="100" />
      </div>
      <main className="container mx-auto mt-8 pb-24">
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
        <div>
          <label htmlFor="account_id" className="block text-start">
            アカウント ID
          </label>
          <div className="flex flex-col items-center">
            <div className="flex items-center w-full">
              <span className="text-lg mr-1">@</span>
              <input
                id="account_id"
                type="text"
                placeholder="vegevery123"
                className="border w-full text-sm pl-1 h-8"
                {...register(`account_id`)}
              />
            </div>
            {errors.account_id && (
              <div className="text-red-400 w-full text-start text-sm">
                {errors.account_id.message}
              </div>
            )}
          </div>
        </div>
        <div className="mt-2">
          <label htmlFor="password" className="block text-start">
            パスワード
          </label>
          <input
            id="password"
            type="password"
            placeholder="password123!"
            className="border w-full text-sm pl-1 h-8"
            {...register(`password`)}
          />
          <p className="text-end text-xs">
            パスワードをお忘れの場合は
            <Link href={'/forget-password'}>
              <span className="ml-1 text-blue-600">こちら</span>
            </Link>
          </p>
          {errors.password && (
            <div className="text-red-400 text-sm">
              {errors.password.message}
            </div>
          )}
        </div>
        {loginErrors && (
          <div className="text-start text-sm text-red-400">
            {loginErrors.login}
          </div>
        )}
        <Button
          onClick={handleSubmit(handleLogin)}
          className="border flex items-center py-3 px-4 mt-4 mx-auto w-52">
          <p className="leading-none">ログイン</p>
        </Button>
        <p className="text-center mt-16 text-sm">
          アカウントをお持ちでない場合
        </p>
        <Link href={'/register'}>
          <Button className="border flex items-center py-3 px-8 mt-4 mx-auto w-52">
            <p className="leading-none">新規アカウント作成</p>
          </Button>
        </Link>
      </main>
    </>
  )
}
export default page
