'use client'

import Logo from '@/components/ui/Logo'
import { Button } from '@/components/ui/button'
import { useContext } from 'react'
import { FormContext } from '@/contexts/registerProvider'
import axios from '@/lib/axios'
import { supabase } from '@/lib/utils/supabase/supabase'
import { v4 as uuidv4 } from 'uuid'

const page = () => {
  const [register, , handleSubmit] = useContext(FormContext)

  const onSubmit = async values => {
    console.log(values)
    const supabase_url = process.env.NEXT_PUBLIC_SUPABASE_BUCKET_URL
    let icon_url = ''
    let icon_path = ''

    if (values.iconFile) {
      const fileExtension = values.iconUrl.split('.').pop()

      const response = await supabase.storage.from('VegEvery-backet').upload(
        // ランダムな文字列に拡張子を付けたものをパスとする
        `users/icon/${uuidv4()}.${fileExtension}`,
        values.iconFile,
      )
      icon_path = response.data.path
      icon_url = `${supabase_url}/object/public/${response.data.fullPath}`
    }

    const res = await axios.post(`/register`, {
      name: values.name,
      password: values.password,
      icon: {
        url: icon_url,
        storage_path: icon_path,
      },
      vegetarian_type: values.vegeType,
      secret_question: values.secretQuestion,
      answer_to_secret_question: values.secretAnswer,
    })
    console.log(res.data)
  }

  return (
    <>
      <div className="mt-16">
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
              className="border w-full text-sm pl-1"
              {...register(`secretQuestion`)}
            />
            {/* <small className="block text-start">
              (例) 初めての海外旅行で行った場所は？
            </small> */}
          </div>
          <div>
            <label htmlFor="password" className="block text-start">
              秘密の質問の答え
            </label>
            <input
              id="password"
              type="text"
              placeholder="フランスのルーヴル美術館"
              className="border w-full text-sm pl-1"
              {...register(`secretAnswer`)}
            />
            {/* <small className="block text-start">
              (例) フランスのルーヴル美術館
            </small> */}
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
