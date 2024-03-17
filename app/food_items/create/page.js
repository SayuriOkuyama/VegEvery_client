'use client'

import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import axios from '@/lib/axios'
import { supabase } from '@/lib/utils/supabase/supabase'
import { v4 as uuidv4 } from 'uuid'
import Tags from './Tags'
import Reports from './Reports'
import Items from './Items'
import FormVegeType from './FormVegeType.js'
import { useEffect, useRef, useState } from 'react'
import { PiCameraLight } from 'react-icons/pi'
import { IconContext } from 'react-icons'
import { useDropzone } from 'react-dropzone'
import { useRouter } from 'next/navigation.js'

const page = () => {
  const [image, setImage] = useState(null)
  const [stepImage, setStepImage] = useState([])
  const router = useRouter()

  const { register, setValue, handleSubmit, control, getValues } = useForm({
    defaultValues: {
      title: '',
      tags: [{ tag: '' }],
      items: [{ material: '', quantity: '', unit: '' }],
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
            <h3>タイトル</h3>
            <input
              className="border w-full"
              type="text"
              {...register(`title`)}
              placeholder="新発売のヴィーガンヌードルを試してみた"
            />
          </div>
          <Tags register={register} control={control} getValues={getValues} />
        </div>

        <Items register={register} control={control} getValues={getValues} />

        <Reports
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
