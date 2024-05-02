'use client'

import Logo from '@/components/ui/Logo'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { FormContext } from '@/contexts/registerProvider'
import axios from '@/lib/axios'
import useSWR from 'swr'

const page = () => {
  const [register, , , watch, errors] = useContext(FormContext)
  const provider = watch('provider')
  const [isValid, setIsValid] = useState(false)
  const [isAccountIdAvailable, setAccountIdAvailable] = useState(false)
  const watcher = watch()
  const [query, setQuery] = useState(null)

  // console.log(errors)
  // console.log(watcher)

  useEffect(() => {
    let check
    if (watcher.provider) {
      check = watcher.name && !errors.name
    } else {
      check =
        watcher.name &&
        watcher.account_id &&
        watcher.password &&
        watcher.passwordConfirmation &&
        !errors.name &&
        !errors.account_id &&
        !errors.password &&
        !errors.passwordConfirmation
    }

    if (check) {
      setIsValid(true)
    } else {
      setIsValid(false)
    }
  }, [watcher, errors])

  const fetcher = async () => {
    const res = await axios.post(`api/user/check_account_id`, {
      id: watcher.account_id,
    })

    setAccountIdAvailable(res.data.result)
    // console.log(`res.data.result: ${res.data.result}`)

    return res.data
  }
  const { data } = useSWR(query, fetcher)

  useEffect(() => {
    // timer にまだタイマーがセットされていたら(5秒未経過)、そのタイマーは削除する
    const timer = setTimeout(() => {
      setQuery(watcher.account_id)
    }, 2000)

    return () => clearTimeout(timer)
  }, [watcher.account_id])

  // console.log(`result: ${data}`)
  // console.log(`isAccountIdAvailable: ${isAccountIdAvailable}`)

  return (
    <>
      <div className="pt-8">
        <Logo size="100" />
      </div>
      <main className="container mx-auto mt-8 max-w-md">
        <div className="text-center space-y-3 sm:space-y-6">
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
                  className="border w-full text-sm pl-1 h-8 focus:text-base"
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
                    className="border w-full text-sm pl-1 h-8 focus:text-base"
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
                {watcher.account_id.length > 0 &&
                !errors.account_id &&
                !data ? (
                  <div className="text-red-400 text-sm text-start">
                    検索中...
                  </div>
                ) : (
                  watcher.account_id.length > 0 &&
                  !errors.account_id &&
                  (isAccountIdAvailable ? (
                    <div className="text-green-500 w-full text-start text-sm">
                      そのアカウント ID は使用できます。
                    </div>
                  ) : (
                    <div className="text-red-400 w-full text-start text-sm">
                      そのアカウント ID はすでに使われています。
                    </div>
                  ))
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
                  className="border w-full text-sm pl-1 h-8 focus:text-base"
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
                  className="border w-full text-sm pl-1 h-8 focus:text-base"
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
                  className="border w-full text-sm pl-1 h-8 focus:text-base"
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
        {isValid ? (
          <Link href={'/register/step2'} className="w-fit block mx-auto">
            <Button className="border flex items-center py-3 px-20 mt-8 mx-auto bg-button border-button-color">
              <p className="leading-none">次へ</p>
            </Button>
          </Link>
        ) : (
          <Button className="border flex items-center py-3 px-20 mt-8 mx-auto bg-button border-button-color">
            <p className="leading-none disabled-text-color">次へ</p>
          </Button>
        )}
      </main>
    </>
  )
}

export default page
