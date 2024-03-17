'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import axios from '@/lib/axios'
import { supabase } from '@/lib/utils/supabase/supabase'
import { v4 as uuidv4 } from 'uuid'

// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Tags from './Tags'
import Materials from './Materials.js'
import Steps from './Steps.js'
import FormVegeType from './FormVegeType.js'
import { useEffect, useRef, useState } from 'react'
import { PiCameraLight } from 'react-icons/pi'
import { IconContext } from 'react-icons'
import { useDropzone } from 'react-dropzone'
import useSWR from 'swr'
import { useRouter } from 'next/navigation.js'

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
  const [image, setImage] = useState(null)
  const [stepImage, setStepImage] = useState([])
  const router = useRouter()

  const { register, setValue, handleSubmit, control, getValues } = useForm({
    // resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      tags: [{ tag: '' }],
      materials: [{ material: '', quantity: '', unit: '' }],
      time: '',
      thumbnail: '',
      servings: '',
      steps: [{ text: '' }],
    },
  })
  const form = useForm()

  const onDrop = acceptedFiles => {
    const file = acceptedFiles[0]
    setImage({
      file,
      preview: URL.createObjectURL(file),
    })
    setValue('thumbnail', file)
  }

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  function onSubmit(values) {
    console.log(values)

    const fileExtension = values.thumbnail.name.split('.').pop()
    let thumbnailUrl = ''
    const stepImageUrls = []

    supabase.storage
      .from('VegEvery-backet')
      .upload(
        `recipes/thumbnail/${uuidv4()}.${fileExtension}`,
        values.thumbnail,
      )
      .then(response => {
        console.log('Insert successful:', response.data)
        const supabase_url = process.env.NEXT_PUBLIC_SUPABASE_BUCKET_URL
        thumbnailUrl = `${supabase_url}/object/public/${response.data.fullPath}`

        // すべてのステップ画像のアップロードが完了したかどうかを追跡するPromiseの配列
        const uploadPromises = values.stepImages.map(image =>
          supabase.storage
            .from('VegEvery-backet')
            .upload(`recipes/step_image/${uuidv4()}.${fileExtension}`, image),
        )
        // すべてのアップロードが完了した後に次の処理を行う
        Promise.all(uploadPromises)
          .then(responses => {
            console.log('All images uploaded successfully')

            // すべてのステップ画像のURLを配列に追加
            responses.forEach(response => {
              const stepImageUrl = `${supabase_url}/object/public/${response.data.fullPath}`
              stepImageUrls.push(stepImageUrl)
            })

            console.log({
              values,
              thumbnailUrl,
              stepImageUrls,
            })
            axios
              .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/recipes`, {
                values,
                thumbnailUrl,
                stepImageUrls,
              })
              .then(res => {
                console.log(res.data)
                form.reset()
                console.log('画面遷移')
                router.push('/recipes')
              })
              .catch(error => {
                console.error('Error sending data to backend:', error)
              })
          })
          .catch(error => {
            console.error('Error uploading step images:', error)
          })
      })
      .catch(error => {
        console.error('Error uploading thumbnail:', error)
      })
  }

  return (
    <main className="pb-32">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 my-16">
        <FormVegeType register={register} control={control} />

        <div className="bg-orange">
          {image ? (
            <div className="image-preview relative flex w-full">
              <button
                className="absolute right-1 top-1 bg-white w-4 h-4 leading-none"
                type="button"
                onClick={() => setImage('')}>
                ✕
              </button>
              <img
                src={image.preview}
                className="object-cover w-full h-full block"
                alt="Uploaded Image"
              />
            </div>
          ) : (
            <div {...getRootProps()} className="h-52">
              <input {...getInputProps()} />
              <div className="h-full flex justify-center items-center">
                <IconContext.Provider value={{ color: '#ccc', size: '80px' }}>
                  <PiCameraLight />
                </IconContext.Provider>
              </div>
            </div>
          )}
        </div>

        <div className="container py-4 space-y-4">
          <div>
            <h3>レシピタイトル</h3>
            <input className="border" type="text" {...register(`title`)} />
          </div>
          <Tags register={register} control={control} getValues={getValues} />
          <div>
            <h3>調理目安時間</h3>
            <input
              className="border w-8"
              type="number"
              placeholder="20"
              {...register(`time`)}
            />
            分
          </div>
        </div>

        <Materials
          register={register}
          control={control}
          getValues={getValues}
        />

        <Steps
          register={register}
          control={control}
          stepImage={stepImage}
          setStepImage={setStepImage}
          setValue={setValue}
        />
        <hr className="mx-4" />

        <div className="">
          <Button
            type="submit"
            className="mx-auto bg-button block py-1 mt-16 border-button-color ">
            投稿
          </Button>
        </div>
      </form>
      {/* </Form> */}
    </main>
  )
}

export default page
