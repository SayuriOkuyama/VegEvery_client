'use client'

import Logo from '@/components/ui/Logo'
import { Button } from '@/components/ui/button'
// import Image from 'next/image'
import Link from 'next/link'
import React, { useContext } from 'react'
import { FormContext } from '@/contexts/registerProvider'

const page = () => {
  const [register, , , watch] = useContext(FormContext)
  const provider = watch('provider')
  // const watcher = watch()

  // console.log(watcher)

  return (
    <>
      <div className="pt-8">
        <Logo size="100" />
      </div>
      <main className="container mx-auto mt-8">
        <div className="text-center space-y-3">
          {provider ? (
            <>
              <div className="mt-20 mb-20">
                <label htmlFor="name" className="block text-start">
                  ユーザー名
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="べジヴリー"
                  className="border w-full text-sm pl-1 h-8"
                  {...register(`name`)}
                />
                <p className="text-xs text-start">
                  公開されても問題のないニックネームを入力してください。
                </p>
              </div>
            </>
          ) : (
            <>
              <div>
                <label htmlFor="name" className="block text-start">
                  アカウント ID
                </label>
                <div className="flex items-center">
                  <span className="text-lg mr-1">@</span>
                  <input
                    id="name"
                    type="text"
                    placeholder="vege1234"
                    className="border w-full text-sm pl-1 h-8"
                    {...register(`account_id`)}
                  />
                </div>
                <p className="text-xs text-start">
                  半角英数字 8 文字以上で入力してください。
                </p>
              </div>
              <div>
                <label htmlFor="name" className="block text-start">
                  ユーザー名
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="べジヴリー"
                  className="border w-full text-sm pl-1 h-8"
                  {...register(`name`)}
                />
                <p className="text-xs text-start">
                  公開されて問題のないニックネームを入力してください。
                </p>
              </div>
              <div>
                <label htmlFor="password" className="block text-start">
                  パスワード
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="password#123!"
                  className="border w-full text-sm pl-1 h-8"
                  {...register(`password`)}
                />
                <small className="block text-start">
                  半角英字、数字、記号をそれぞれ１文字以上含め、
                  <br />8 文字以上で入力してください。
                </small>
              </div>
              <div>
                <label htmlFor="reenteredPassword" className="block text-start">
                  パスワード再入力
                </label>
                <input
                  id="reenteredPassword"
                  type="password"
                  placeholder="password#123!"
                  className="border w-full text-sm pl-1 h-8"
                  {...register(`reenteredPassword`)}
                />
              </div>
            </>
          )}
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
