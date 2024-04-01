'use client'

import Logo from '@/components/ui/Logo'
import { Button } from '@/components/ui/button'
// import Image from 'next/image'
import Link from 'next/link'
import React, { useContext } from 'react'
import { FormContext } from '@/contexts/registerProvider'

const page = () => {
  const [register] = useContext(FormContext)

  // console.log()

  return (
    <>
      <div className="mt-16">
        <Logo size="100" />
      </div>
      <main className="container mx-auto mt-8">
        <div className="text-center space-y-3">
          <p className="text-center my-4">アカウントを作成します</p>
          <div>
            <label htmlFor="name" className="block text-start">
              ユーザー名
            </label>
            <input
              id="name"
              type="text"
              placeholder="べジヴリー"
              className="border w-full text-sm pl-1"
              {...register(`name`)}
              // onChange={e =>
              //   setFormData(prev => ({
              //     ...prev,
              //     name: e.target.value,
              //   }))
              // }
              // value={formData.name}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-start">
              パスワード
            </label>
            <input
              id="password"
              type="password"
              placeholder="password123!"
              className="border w-full text-sm pl-1"
              // onChange={e =>
              //   setFormData(prev => ({
              //     ...prev,
              //     password: e.target.value,
              //   }))
              // }
              {...register(`password`)}
              // value={formData.password}
            />
            <small className="block text-start">※ 英数記号 8 文字以上</small>
          </div>
          <div>
            <label htmlFor="reenteredPassword" className="block text-start">
              パスワード再入力
            </label>
            <input
              id="reenteredPassword"
              type="password"
              placeholder="password123!"
              className="border w-full text-sm pl-1"
              // onChange={e =>
              //   setFormData(prev => ({
              //     ...prev,
              //     reenteredPassword: e.target.value,
              //   }))
              // }
              // value={formData.reenteredPassword}
              {...register(`reenteredPassword`)}
            />
          </div>
        </div>
        <Link href={'/register/step2'} className="w-fit block mx-auto">
          <Button className="border flex items-center py-3 px-20 mt-8 mx-auto bg-button border-button-color">
            <p className="leading-none">次へ</p>
          </Button>
        </Link>
      </main>
    </>
  )
}

export default page
