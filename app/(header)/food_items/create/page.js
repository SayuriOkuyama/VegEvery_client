'use client'

import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import axios from '@/lib/axios'
import Tags from './Tags'
import Reports from './Reports'
import Items from './Items'
import FormVegeType from '@/components/layouts/recipes/FormVegeType.js'
import { useEffect, useState } from 'react'
import { PiCameraLight } from 'react-icons/pi'
import { IconContext } from 'react-icons'
import { useDropzone } from 'react-dropzone'
import { useRouter } from 'next/navigation.js'
import { zodResolver } from '@hookform/resolvers/zod'
import { itemFormSchema } from '@/lib/zod/itemFormSchema'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { LiaSpinnerSolid } from 'react-icons/lia'
import Link from 'next/link'

const page = () => {
  const [image, setImage] = useState(null)
  const [reportImages, setReportImages] = useState([{ url: '', file: '' }])
  const router = useRouter()
  const [, setUser] = useState()
  const [isPosting, setIsPosting] = useState(false)

  useEffect(() => {
    const getUser = async () => {
      axios.get('/sanctum/csrf-cookie')
      axios.get('/api/user').then(res => setUser(res.data))
    }
    getUser()
  }, [])

  const {
    register,
    setValue,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(itemFormSchema),
    defaultValues: {
      title: '',
      tags: [{ name: '' }],
      items: [{ name: '', where_to_buy: '', price: '' }],
      thumbnail: '',
      reports: [{ text: '' }],
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
    mode: 'onChange',
  })
  // console.log(errors)

  const watcher = watch()
  // console.log(watcher)

  const onDrop = acceptedFiles => {
    const file = acceptedFiles[0]
    setImage(URL.createObjectURL(file))
    setValue('thumbnail', file)
  }

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  async function onSubmit(values) {
    // console.log(values)
    setIsPosting(true)

    // FormDataオブジェクトを作成
    const formData = new FormData()

    // フォームデータをFormDataオブジェクトに追加
    for (const key in values) {
      formData.append(key, values[key])
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
      formData.append(type, values.vege_type[type])
    })

    values.reports.forEach((report, index) => {
      formData.append(`reports[${index}][order]`, report.order)
      formData.append(`reports[${index}][text]`, report.text)

      if (watcher.reports[index].image) {
        formData.append(
          `reports[${index}][image]`,
          watcher.reports[index].image,
        )
      }
    })

    values.items.forEach((item, index) => {
      formData.append(`items[${index}][name]`, item.name)
      formData.append(`items[${index}][price]`, item.price)
      formData.append(`items[${index}][where_to_buy]`, item.where_to_buy)
    })

    values.tags.forEach((tag, index) => {
      if (tag.name !== '') {
        formData.append(`tags[${index}][name]`, tag.name)
      }
    })

    // for (let pair of formData.entries()) {
    //   console.log(pair[0] + ', ' + pair[1])
    // }

    const res = await axios.post(`/api/food_items`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    // console.log(res.data)
    // console.log('画面遷移')
    setIsPosting(false)
    router.push(`/food_items/${res.data.article.id}`)
  }

  return (
    <main className="pb-32 max-w-2xl">
      {isPosting && (
        <div className="fixed inset-0 z-50 bg-[#ffffff9c]">
          <div className="z-100 w-full max-w-2xl absolute top-1/2 animate-bounce flex justify-center">
            <Alert className="w-4/5">
              <AlertDescription className="text-color text-center text-base">
                <div className="flex justify-center items-center space-x-1">
                  <LiaSpinnerSolid className="animate-spin" />
                  <p>投稿しています..</p>
                </div>
              </AlertDescription>
            </Alert>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 my-16">
        <FormVegeType register={register} control={control} />

        <div className="bg-orange aspect-[4/3] max-w-md mx-auto">
          {image ? (
            <div className="image-preview aspect-[4/3] max-w-md relative flex w-full">
              <button
                className="absolute right-1 top-1 bg-white w-4 h-4 leading-none"
                type="button"
                onClick={() => setImage('')}>
                ✕
              </button>
              <img
                src={image}
                className="aspect-[4/3] max-w-md object-cover w-full h-full block"
                alt="Uploaded Image"
              />
            </div>
          ) : (
            <div {...getRootProps()} className="w-full h-full">
              <input {...getInputProps()} />
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
            <h3 className="bold sm:text-xl">タイトル</h3>
            <input
              className="border w-full"
              type="text"
              {...register(`title`)}
              placeholder="新発売のヴィーガンヌードルを試してみた"
            />
            {errors.title && (
              <div className="text-red-400">{errors.title.message}</div>
            )}
          </div>
          <Tags register={register} control={control} errors={errors} />
        </div>

        <Items register={register} control={control} errors={errors} />

        <Reports
          register={register}
          control={control}
          reportImages={reportImages}
          setReportImages={setReportImages}
          setValue={setValue}
          errors={errors}
        />
        <hr className="mx-4" />

        <div className="flex justify-around">
          <Link href={'/food_items'}>
            <Button
              type="button"
              className="w-32 bg-button block py-1 px-2 mt-16 border-button-color">
              一覧に戻る
            </Button>
          </Link>
          <Button
            type="submit"
            className="w-32 bg-button block py-1 mt-16 border-button-color">
            投稿
          </Button>
        </div>
      </form>
      {/* </Form> */}
    </main>
  )
}

export default page
