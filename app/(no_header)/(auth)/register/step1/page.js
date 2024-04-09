'use client'

import Logo from '@/components/ui/Logo'
import { Button } from '@/components/ui/button'
// import Image from 'next/image'
import Link from 'next/link'
import React, { useContext } from 'react'
import { FormContext } from '@/contexts/registerProvider'

const page = () => {
  const [register, , , watch, errors] = useContext(FormContext)
  const provider = watch('provider')
  // const watcher = watch()

  // console.log(errors)
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
                <label htmlFor="name1" className="block text-start">
                  ユーザー名
                </label>
                <input
                  id="name1"
                  type="text"
                  placeholder="べジヴリー"
                  className="border w-full text-sm pl-1 h-8"
                  {...register(`name`)}
                />
                <p className="text-xs text-start">
                  公開されても問題のないニックネームを入力してください。
                </p>
                {errors.name && (
                  <div className="text-red-400 w-full text-start text-sm">
                    {errors.name.message}
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <div>
                <label htmlFor="account_id" className="block text-start">
                  アカウント ID
                </label>
                <div className="flex items-center">
                  <span className="text-lg mr-1">@</span>
                  <input
                    id="account_id"
                    type="text"
                    placeholder="vege1234"
                    className="border w-full text-sm pl-1 h-8"
                    {...register(`account_id`)}
                  />
                </div>
                <p className="text-xs text-start">
                  半角英数字 8 文字以上で入力してください。
                </p>
                {errors.account_id && (
                  <div className="text-red-400 w-full text-start text-sm">
                    {errors.account_id.message}
                  </div>
                )}
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
                {errors.name && (
                  <div className="text-red-400 w-full text-start text-sm">
                    {errors.name.message}
                  </div>
                )}
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
                {errors.password && (
                  <div className="text-red-400 w-full text-start text-sm">
                    {errors.password.message}
                  </div>
                )}
              </div>
              <div>
                <label
                  htmlFor="passwordConfirmation"
                  className="block text-start">
                  パスワード再入力
                </label>
                <input
                  id="passwordConfirmation"
                  type="password"
                  placeholder="password#123!"
                  className="border w-full text-sm pl-1 h-8"
                  {...register(`passwordConfirmation`)}
                />
                {errors.passwordConfirmation && (
                  <div className="text-red-400 w-full text-start text-sm">
                    {errors.passwordConfirmation.message}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
        {errors.length === 0 ? (
          <Button className="border flex items-center py-3 px-20 mt-8 mx-auto bg-button border-button-color">
            <p className="leading-none disabled-text-color">次へ</p>
          </Button>
        ) : (
          <Link href={'/register/step2'} className="w-fit block mx-auto">
            <Button className="border flex items-center py-3 px-20 mt-8 mx-auto bg-button border-button-color">
              <p className="leading-none">次へ</p>
            </Button>
          </Link>
        )}
      </main>
    </>
  )
}

export default page
