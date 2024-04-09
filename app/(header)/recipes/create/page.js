'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { recipeFormSchema } from '@/lib/zod/recipeFormSchema'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import axios from '@/lib/axios'
// import { supabase } from '@/lib/utils/supabase/supabase'
// import { v4 as uuidv4 } from 'uuid'
import Tags from './Tags'
import Materials from './Materials.js'
import Steps from './Steps.js'
import FormVegeType from './FormVegeType.js'
import { useState } from 'react'
import { PiCameraLight } from 'react-icons/pi'
import { IconContext } from 'react-icons'
import { useDropzone } from 'react-dropzone'
import { useRouter } from 'next/navigation.js'

const page = () => {
  const [image, setImage] = useState(null)
  const [stepImages, setStepImages] = useState([{ url: '', file: '' }])
  const router = useRouter()
  // const [user, setUser] = useState()

  // useEffect(() => {
  //   const getUser = async () => {
  //     axios.get('/sanctum/csrf-cookie')
  //     axios.get('/api/user').then(res => setUser(res.data))
  //   }
  //   getUser()
  // }, [])

  const {
    register,
    setValue,
    handleSubmit,
    control,
    // watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(recipeFormSchema),
    defaultValues: {
      title: '',
      tags: [{ name: '' }],
      materials: [{ name: '', quantity: '', unit: 'null' }],
      time: '',
      thumbnail: '',
      servings: '',
      steps: [{ text: '' }],
      vege_type: {
        vegan: false,
        oriental_vegetarian: false,
        ovo_vegetarian: false,
        pescatarian: false,
        lacto_vegetarian: false,
        pollo_vegetarian: false,
        fruitarian: false,
        other_vegetarian: false,
      },
    },
    mode: 'onChange', // リアルタイムで入力値を取得する
  })
  // const watcher = watch()
  // console.log(errors)
  // console.log(watcher)
  // console.log(user)

  const onDrop = acceptedFiles => {
    const file = acceptedFiles[0]
    setImage({
      file,
      image: URL.createObjectURL(file),
    })
    setValue('thumbnail', file)
  }

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  async function onSubmit(data) {
    // console.log('submit')
    // console.log(data)

    // FormDataオブジェクトを作成
    const formData = new FormData()

    // フォームデータをFormDataオブジェクトに追加
    for (const key in data) {
      formData.append(key, data[key])
    }

    const types = [
      'vegan',
      'oriental_vegetarian',
      'ovo_vegetarian',
      'pescatarian',
      'lacto_vegetarian',
      'pollo_vegetarian',
      'fruitarian',
      'other_vegetarian',
    ]

    // チェックボックスがチェックされているかどうかを確認し、
    // 文字列として 'true' または 'false' を設定
    types.map(type => {
      formData.append(type, data.type ? 'true' : 'false')
    })

    data.steps.forEach((step, index) => {
      formData.append(`steps[${index}][order]`, step.order)
      formData.append(`steps[${index}][text]`, step.text)
      // console.log(stepImages[index])
      if (stepImages[index]) {
        // console.log(stepImages[index].file)
        // ↓ なぜかこれだと undefined になる
        // console.log(step.image)
        formData.append(`steps[${index}][image]`, stepImages[index].file)
        // console.log(formData.getAll('steps'))
      }
    })

    data.materials.forEach((material, index) => {
      formData.append(`materials[${index}][name]`, material.name)
      formData.append(`materials[${index}][quantity]`, material.quantity)
      formData.append(`materials[${index}][unit]`, material.unit)
    })

    data.tags.forEach((tag, index) => {
      if (tag.name !== '') {
        formData.append(`tags[${index}][name]`, tag.name)
      }
    })

    const res = await axios.post(`/api/recipes`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    // console.log(res.data)
    // console.log('画面遷移')
    router.push(`/recipes/${res.data.article.id}`)
    // } catch (error) {
    //   throw error
    // }
  }

  return (
    <main className="pb-32">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 my-16">
        <FormVegeType register={register} control={control} />

        <div className="bg-orange">
          {image ? (
            <div className="image-preview relative flex w-full h-64">
              <button
                className="absolute right-1 top-1 bg-white w-4 h-4 leading-none"
                type="button"
                onClick={() => setImage('')}>
                ✕
              </button>
              <img
                src={image.image}
                className="object-cover w-full h-full block"
                alt="Uploaded Image"
              />
            </div>
          ) : (
            <div {...getRootProps()} className="h-64">
              <input accept="image/* " {...getInputProps()} />
              <div className="h-full flex justify-center items-center">
                <IconContext.Provider value={{ color: '#ccc', size: '80px' }}>
                  <PiCameraLight />
                </IconContext.Provider>
              </div>
            </div>
          )}
        </div>
        {errors.thumbnail && (
          <div className="container text-red-400">
            {errors.thumbnail.message}
          </div>
        )}

        <div className="container py-4 space-y-4">
          <div>
            <h3>レシピタイトル</h3>
            <input className="border" type="text" {...register(`title`)} />
            {errors.title && (
              <div className="text-red-400">{errors.title.message}</div>
            )}
          </div>
          <Tags register={register} control={control} errors={errors} />
          <div>
            <h3>調理目安時間</h3>
            <input
              className="border w-8"
              type="text"
              placeholder="20"
              {...register('time')}
            />
            分
            {errors.time && (
              <div className="text-red-400">{errors.time.message}</div>
            )}
          </div>
        </div>

        <Materials register={register} control={control} errors={errors} />

        <Steps
          register={register}
          control={control}
          setValue={setValue}
          stepImages={stepImages}
          setStepImages={setStepImages}
          errors={errors}
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
