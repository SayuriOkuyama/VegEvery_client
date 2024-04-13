'use client'

import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import axios from '@/lib/axios'
import { useEffect, useState } from 'react'
import { PiCameraLight } from 'react-icons/pi'
import { IconContext } from 'react-icons'
import { useDropzone } from 'react-dropzone'
import { useRouter, useSearchParams } from 'next/navigation.js'
import { zodResolver } from '@hookform/resolvers/zod'
import { reviewFormSchema } from '@/lib/zod/reviewFormSchema'
import Menus from '@/components/layouts/reviews/Menus'
import Stars from '@/components/layouts/reviews/Stars'

const page = ({ params }) => {
  const [image, setImage] = useState(null)
  const router = useRouter()
  const [, setUser] = useState()
  const query = useSearchParams()
  const lat = query.get('lat')
  const lng = query.get('lng')
  const restaurant_name = query.get('name')
  const place_id = params.id

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
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      restaurant: {
        name: restaurant_name,
        place_id: place_id,
        latitude: lat,
        longitude: lng,
      },
      thumbnail: '',
      stars: 0,
      menus: [
        {
          name: '',
          price: '',
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
      ],
      text: '',
    },
    mode: 'onChange',
  })
  console.log(errors)

  const watcher = watch()
  console.log(watcher)

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

    values.menus.forEach((menu, index) => {
      formData.append(`menus[${index}][name]`, menu.name)
      formData.append(`menus[${index}][price]`, menu.price)
      types.map(type => {
        formData.append(
          `menus[${index}][vege_type][${type}]`,
          menu.vege_type[type],
        )
      })
    })

    for (let pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1])
    }

    // const res = await axios.post(`/api/food_items`, formData, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   },
    // })

    // console.log(res.data)
    // console.log('画面遷移')
    // router.push(`/map/${res.data.article.id}`)
  }

  return (
    <main className="pb-32">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 my-16">
        <div className="text-center text-2xl">{watcher.restaurant.name}</div>

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
            <h3>評価</h3>
            <Stars setValue={setValue} />
            {errors.stars && (
              <div className="text-red-400">{errors.stars.message}</div>
            )}
          </div>
        </div>

        <Menus register={register} control={control} errors={errors} />

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
