'use client'

import Logo from '@/components/ui/Logo'
import { Button } from '@/components/ui/button'
import React, { useContext, useState } from 'react'
import { FormContext } from '@/contexts/registerProvider'
import { useAuth } from '@/hooks/auth'
import Link from 'next/link'
import { PiNotePencilLight } from 'react-icons/pi'
import axios from '@/lib/axios'
import Cookie from 'js-cookie'

const page = () => {
  const [, , handleSubmit, watch] = useContext(FormContext)
  const [, setErrors] = useState([])

  const { authRegister } = useAuth({
    middleware: 'guest',
    // ログイン状態になったらトップページに移動
    redirectIfAuthenticated: '/',
  })

  const watcher = watch()
  console.log(watcher)
  // console.log(user)

  const onSubmit = async data => {
    console.log(data)

    // FormDataオブジェクトを作成
    const formData = new FormData()

    // フォームデータをFormDataオブジェクトに追加
    for (const key in data) {
      console.log(key)
      console.log(data[key])
      formData.append(key, data[key])
    }

    // register ルートに post し、user データを登録
    // レスポンスのトークンを Cookie に保存
    // axios.get('/sanctum/csrf-cookie')
    console.log(formData.get('name'))
    authRegister({
      setErrors,
      formData,
    })

    // await axios.get('/sanctum/csrf-cookie')
    // axios
    //   .post('api/user/register', formData, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   })
    //   .then(res => {
    //     console.log(res.data.token)
    //     // トークンをクッキーに保存
    //     Cookie.set('sanctum_token', res.data.token, {
    //       expires: 7,
    //       secure: false,
    //       sameSite: 'lax',
    //     })
    //     // キャッシュの更新
    //     // mutate()
    //   })
  }

  return (
    <>
      <div className="pt-8">
        <Logo size="100" />
      </div>
      <main className="container mx-auto mt-8">
        <div className="text-center space-y-3">
          <p className="text-center my-4">登録内容の確認</p>
          <div className=" space-y-2">
            {watcher.iconUrl && (
              <div className="relative w-32 h-32 mx-auto z-10">
                <img
                  src={watcher.iconUrl}
                  className="object-cover w-full h-full block rounded-full"
                  alt="Uploaded Image"
                />
                <Link
                  href={`/resister/step3`}
                  className="absolute bottom-0 right-0">
                  <div className="rounded-full p-1 bg-register-edit">
                    <PiNotePencilLight size="28px" />
                  </div>
                </Link>
              </div>
            )}
            {watcher.account_id && (
              <div className=" border-b flex justify-between items-center">
                <div>アカウント ID：{watcher.account_id}</div>
                <Link href={`/resister/step1`} className="">
                  <div className="rounded-full p-1 side_icon">
                    <PiNotePencilLight size="28px" />
                  </div>
                </Link>
              </div>
            )}
            {watcher.name && (
              <div className=" border-b flex justify-between items-center">
                <div>ユーザーネーム：{watcher.name}</div>
                <Link href={`/resister/step1`} className="">
                  <div className="rounded-full p-1 side_icon">
                    <PiNotePencilLight size="28px" />
                  </div>
                </Link>
              </div>
            )}
            {watcher.password && (
              <div className=" border-b flex justify-between items-center">
                <div>パスワード：**********</div>
                <Link href={`/resister/step1`} className="">
                  <div className="rounded-full p-1 side_icon">
                    <PiNotePencilLight size="28px" />
                  </div>
                </Link>
              </div>
            )}

            <div className=" border-b flex justify-between items-center">
              <div>
                ベジタリアンの種類：
                {watcher.vegeType === 'none' ? '未選択' : watcher.vegeType}
              </div>
              <Link href={`/resister/step2`} className="">
                <div className="rounded-full p-1 side_icon">
                  <PiNotePencilLight size="28px" />
                </div>
              </Link>
            </div>

            {watcher.secretQuestion && (
              <>
                <div className=" border-b flex justify-between items-center">
                  <div>秘密の質問：{watcher.secretQuestion}</div>
                  <Link href={`/resister/step4`} className="">
                    <div className="rounded-full p-1 side_icon">
                      <PiNotePencilLight size="28px" />
                    </div>
                  </Link>
                </div>
                <div className=" border-b flex justify-between items-center">
                  <div>秘密の質問の答え：**********</div>
                  <Link href={`/resister/step4`} className="">
                    <div className="rounded-full p-1 side_icon">
                      <PiNotePencilLight size="28px" />
                    </div>
                  </Link>
                </div>
              </>
            )}
          </div>
          <Button
            className="border flex items-center py-3 px-20 mt-8 mx-auto bg-button border-button-color"
            onClick={handleSubmit(onSubmit)}>
            <p className="leading-none">登録する</p>
          </Button>
        </div>
      </main>
    </>
  )
}

export default page