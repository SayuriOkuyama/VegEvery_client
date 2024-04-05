'use client'

import Logo from '@/components/ui/Logo'
import { Button } from '@/components/ui/button'
import axios from '@/lib/axios'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const page = () => {
  const router = useRouter()

  const handleGoogleLogin = async () => {
    const res = await axios.get(`/api/user/auth/google`)
    // console.log(res)
    router.push(res.data)
  }

  return (
    <>
      <div className="pt-8">
        <Logo size="100" />
      </div>
      <main className="container mx-auto mt-8">
        <Button
          className="border flex items-center py-3 px-4 mt-12 mx-auto"
          onClick={handleGoogleLogin}>
          <Image
            width={20}
            height={20}
            src={'/google-logo.png'}
            className="block mr-2"
          />
          <p className="leading-none">Google アカウントで登録</p>
        </Button>
        <p className="text-center my-8">または</p>
        <Link href={'/register/step1'}>
          <Button className="border flex items-center py-3 px-4 mt-4 mx-auto w-52">
            <p className="leading-none">新規アカウント作成</p>
          </Button>
        </Link>
        <p className="text-center mt-16 text-sm">
          すでにアカウントをお持ちの場合
        </p>
        <Link href={'/login'}>
          <Button className="border flex items-center py-3 px-8 mt-4 mx-auto w-52">
            <p className="leading-none">ログイン</p>
          </Button>
        </Link>
      </main>
    </>
  )
}
export default page
