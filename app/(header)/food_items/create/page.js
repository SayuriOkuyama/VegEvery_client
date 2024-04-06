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
import { useState } from 'react'
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

  const { register, setValue, handleSubmit, control, getValues } = useForm({
    resolver: zodResolver(itemFormSchema),
    defaultValues: {
      title: '',
      tags: [{ tag: '' }],
      items: [{ name: '', place: '', price: '' }],
      thumbnail: '',
      reports: [{ text: '' }],
    },
    mode: 'onChange', // リアルタイムで入力値を取得する
  })

  const onDrop = acceptedFiles => {
    const file = acceptedFiles[0]
    setImage({
      file,
      image: URL.createObjectURL(file),
    })
    setValue('thumbnail', file)
  }

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  async function onSubmit(values) {
    // console.log(values)

    const supabase_url = process.env.NEXT_PUBLIC_SUPABASE_BUCKET_URL
    let thumbnail_path
    let thumbnail_url
    const reportImagesData = []

    try {
      const fileExtension = values.thumbnail.name.split('.').pop()

      const response = await supabase.storage
        .from('VegEvery-backet')
        .upload(
          `items/thumbnail/${uuidv4()}.${fileExtension}`,
          values.thumbnail,
        )
      thumbnail_path = response.data.path
      thumbnail_url = `${supabase_url}/object/public/${response.data.fullPath}`

      await Promise.all(
        reportImages.map(async (report, index) => {
          if (report && report.file) {
            const fileExtension = report.file.name.split('.').pop()

            const response = await supabase.storage
              .from('VegEvery-backet')
              .upload(
                `items/report_image/${uuidv4()}.${fileExtension}`,
                report.file,
              )
            // console.log('Report image upload successful:', response.data)
            reportImagesData[index] = {
              image_path: response.data.path,
              image_url: `${supabase_url}/object/public/${response.data.fullPath}`,
            }
          }
        }),
      )
      // console.log({
      //   values,
      //   thumbnail_path,
      //   thumbnail_url,
      //   reportImagesData,
      // })

      const res = await axios.post(`api/food_items`, {
        title: values.title,
        thumbnail: {
          thumbnail_path: thumbnail_path,
          thumbnail_url: thumbnail_url,
        },
        tags: values.tags,
        vegeTags: values.vege_type,
        items: values.items,
        reports: {
          reports_order_text: values.reports,
          reportImages: reportImagesData,
        },
      })

      // console.log(res.data)
      // console.log('画面遷移')
      router.push(`/food_items/${res.data.article.id}`)
    } catch (error) {
      // console.error('Error handling form submission:', error)
    }
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
          reportImages={reportImages}
          setReportImages={setReportImages}
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
