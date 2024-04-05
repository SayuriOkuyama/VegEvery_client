'use client'

import Logo from '@/components/ui/Logo'
import { Button } from '@/components/ui/button'
import { useContext, useState } from 'react'
import { FormContext } from '@/contexts/registerProvider'
// import axios from '@/lib/axios'
import { supabase } from '@/lib/utils/supabase/supabase'
import { v4 as uuidv4 } from 'uuid'
import { useAuth } from '@/hooks/auth'

const page = () => {
  const [register, , handleSubmit] = useContext(FormContext)
  // const [errors, setErrors] = useState([])
  const [, setErrors] = useState([])
  // const watcher = watch()

  // console.log(watcher)
  // console.log(errors)

  const { authRegister } = useAuth({
    middleware: 'guest',
    // ログイン状態になったらトップページに移動
    redirectIfAuthenticated: '/',
  })

  const onSubmit = async values => {
    // console.log(values)
    const supabase_url = process.env.NEXT_PUBLIC_SUPABASE_BUCKET_URL
    let icon_url = 'users/icon/user_icon.png'
    let icon_path =
      'https://sbbfkhueljpgbvhxguip.supabase.co/storage/v1/object/public/VegEvery-backet/users/icon/user_icon.png'

    if (values.iconFile) {
      const fileExtension = values.iconFile.name.split('.').pop()

      const response = await supabase.storage.from('VegEvery-backet').upload(
        // ランダムな文字列に拡張子を付けたものをパスとする
        `users/icon/${uuidv4()}.${fileExtension}`,
        values.iconFile,
      )
      // console.log(response.data)
      icon_path = response.data.path
      icon_url = `${supabase_url}/object/public/${response.data.fullPath}`
    }

    // register ルートに post し、user データを登録
    // レスポンスのトークンを Cookie に保存
    authRegister({
      account_id: values.account_id,
      name: values.name,
      password: values.password,
      icon: {
        url: icon_url,
        storage_path: icon_path,
      },
      vegetarian_type: values.vegeType,
      secret_question: values.secretQuestion,
      answer_to_secret_question: values.secretAnswer,
      provider: values.provider,
      provider_id: values.providerId,
      setErrors,
    })
  }

  return (
    <>
      <div className="pt-8">
        <Logo size="100" />
      </div>
      <main className="container mx-auto mt-8">
        <div className="text-center space-y-4">
          <p className="text-center my-8">秘密の質問を設定</p>
          <div>
            <label htmlFor="name" className="block text-start">
              秘密の質問
            </label>
            <input
              id="name"
              type="text"
              placeholder="初めての海外旅行で行った場所は？"
              className="border w-full text-sm pl-1 h-8"
              {...register(`secretQuestion`)}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-start">
              秘密の質問の答え
            </label>
            <input
              id="password"
              type="text"
              placeholder="フランスのルーヴル美術館"
              className="border w-full text-sm pl-1 h-8"
              {...register(`secretAnswer`)}
            />
          </div>
        </div>
        <Button
          className="border flex items-center py-3 px-20 mt-8 mx-auto bg-button border-button-color"
          onClick={handleSubmit(onSubmit)}>
          <p className="leading-none">登録する</p>
        </Button>
      </main>
    </>
  )
}

export default page
