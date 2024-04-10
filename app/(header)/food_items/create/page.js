'use client'

import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import axios from '@/lib/axios'
import Tags from './Tags'
import Reports from './Reports'
import Items from './Items'
import FormVegeType from './FormVegeType.js'
import { useEffect, useState } from 'react'
import { PiCameraLight } from 'react-icons/pi'
import { IconContext } from 'react-icons'
import { useDropzone } from 'react-dropzone'
import { useRouter } from 'next/navigation.js'
import { zodResolver } from '@hookform/resolvers/zod'
import { itemFormSchema } from '@/lib/zod/itemFormSchema'

const page = () => {
  const [image, setImage] = useState(null)
  const [reportImages, setReportImages] = useState([{ url: '', file: '' }])
  const router = useRouter()
  const [, setUser] = useState()

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
    router.push(`/food_items/${res.data.article.id}`)
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
                src={image}
                className="object-cover w-full h-full block"
                alt="Uploaded Image"
              />
            </div>
          ) : (
            <div {...getRootProps()} className="h-64">
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
            <h3>タイトル</h3>
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
