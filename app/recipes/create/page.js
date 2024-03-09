'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Tags from './Tags'
import Materials from './Materials.js'
import Steps from './Steps.js'
import FormVegeType from './FormVegeType.js'
import { useEffect, useRef, useState } from 'react'

// const formSchema = z.object({
//   title: z
//     .string()
//     .min(2, {
//       message: 'タイトルは 2 文字以上で入力してください。',
//     })
//     .max(30, {
//       message: 'タイトルは 30 文字以内で入力してください。',
//     }),
//   tags: z
//     .string()
//     .min(2, {
//       message: 'タグは 2 文字以上で入力してください。',
//     })
//     .max(10, {
//       message: 'タグは 10 文字以内で入力してください。',
//     }),
// time: z
//   .string()
//   .min(1, {
//     message: '調理目安時間は 1 文字以上で入力してください',
//   })
//   .max(10, { message: '調理目安時間は 10 文字以内で入力してください' }),
// servings: z.string().min(2, {
//   message: '分量は 2 文字以上で入力してください。',
// }),
// material: z
//   .string()
//   .min(1, {
//     message: '材料は 1 文字以上で入力してください。',
//   })
//   .max(20, {
//     message: '材料は 20 文字以内で入力してください。',
//   }),
// quantity: z
//   .string()
//   .min(1, {
//     message: '量は 1 文字以上で入力してください。',
//   })
//   .max(1, {
//     message: '量は 10 文字以内で入力してください。',
//   }),
// unit: z.string().min(2, {
//   message: '量は 1 文字以上で入力してください。',
// }),
// image: z.string().min(2, {
//   message: 'Username must be at least 2 characters.',
// }),
// step: z.string().min(2, {
//   message: '手順は 2 文字以上で入力してください。',
// }),
//   image: z.string().min(2, {
//     message: 'Username must be at least 2 characters.',
//   }),
// })

const page = () => {
  const [thumbnail, setThumbnail] = useState(null)
  const thumbnailRef = useRef(null)
  const { watch } = useForm()

  // 1. Define your form.
  const { register, handleSubmit, control } = useForm({
    // resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      tags: [{ tag: '' }],
      materials: [{ material: '', quantity: '', unit: '' }],
      time: '',
      thumbnail: '',
      steps: [{ order: '', image: '', text: '' }],
    },
  })
  const form = useForm()
  // const { fields, append, remove } = useFieldArray({
  //   control,

  //   name: 'tags',
  //   name: 'materials',
  // })
  // const { ref } = register('thumbnail')

  function onSubmit(values) {
    console.log(values)
    form.reset()
  }
  const showFolder = () => {
    console.log('click')
    if (thumbnailRef.current) {
      thumbnailRef.current.click()
    }
  }

  // const selectFile = e => {
  //   console.log('選択中')
  // }

  // state に画像をセットする
  const setFile = e => {
    const files = e.target.files

    if (files) {
      console.log('セット')

      setThumbnail(files[0])
      console.log(thumbnail)
    }
  }

  return (
    <main className="pb-32">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-16">
        <FormVegeType register={register} control={control} />
        <div className="bg-orange py-8">
          {/* <h3>メイン画像</h3> */}
          <button
            type="button"
            className="block mx-auto"
            onClick={() => showFolder()}>
            写真
          </button>
          <input
            // ここで ref を指定
            ref={thumbnailRef}
            className="border mx-auto"
            type="file"
            accept=".png, .jpeg, .jpg "
            onClick={e => selectFile(e)}
            onChange={e => setFile(e)}
            hidden
            // ここでは register に引数（ref）を渡さない！
            {...register}
          />
        </div>
        <img src={thumbnail?.name} />

        <div className="container py-4 space-y-4">
          <div>
            <h3>レシピタイトル</h3>
            <input className="border" type="text" {...register(`title`)} />
          </div>
          <Tags register={register} control={control} />
          <div>
            <h3>調理目安時間</h3>
            <input
              className="border"
              type="text"
              placeholder="20分"
              {...register(`time`)}
            />
          </div>
        </div>

        <Materials register={register} control={control} />

        <Steps register={register} control={control} />

        <Button
          type="submit"
          className="mx-auto bg-button block py-1 border-button-color ">
          投稿
        </Button>
      </form>
      {/* </Form> */}
    </main>
  )
}

export default page
