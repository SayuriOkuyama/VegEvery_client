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

const page = () => {
  const router = useRouter()
  const [errors, setErrors] = useState([])
  // const [errors, setErrors] = useState([])
  const [, setStatus] = useState(null)
  // const [status, setStatus] = useState(null)

  const { register, handleSubmit } = useForm({
    // resolver: zodResolver(formSchema),
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
  useEffect(() => {
    if (router.reset?.length > 0 && errors.length === 0) {
      setStatus(atob(router.reset))
    } else {
      setStatus(null)
    }
  })
  // console.log(errors)
  // console.log(status)

  const handleGoogleLogin = async () => {
    const res = await axios.get(`/api/user/auth/google`)
    router.push(res.data)
  }

  const handleLogin = async values => {
    login({
      name: values.name,
      password: values.password,
      setErrors,
      setStatus,
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
          <label htmlFor="name" className="block text-start">
            アカウント ID
          </label>
          <div className="flex items-center">
            <span className="text-lg mr-1">@</span>
            <input
              id="name"
              type="text"
              placeholder=""
              className="border w-full text-sm pl-1 h-8"
              {...register(`name`)}
            />
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
        </div>
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
