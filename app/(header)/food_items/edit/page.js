'use client'

import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import axios from '@/lib/axios'
import EditTags from '@/app/(header)/food_items/edit/EditTags.js'
import EditItems from '@/app/(header)/food_items/edit/EditItems.js'
import EditReports from '@/app/(header)/food_items/edit/EditReports.js'
import EditFormVegeTypes from '@/app/(header)/recipes/edit/EditFormVegeTypes.js'
import { useEffect, useState } from 'react'
import { PiCameraLight } from 'react-icons/pi'
import { IconContext } from 'react-icons'
import { useDropzone } from 'react-dropzone'
import { useRouter, useSearchParams } from 'next/navigation.js'
import { getArticles } from '@/lib/utils/fetch.js'
import useSWR from 'swr'
import { zodResolver } from '@hookform/resolvers/zod'
import { EditItemFormSchema } from '@/lib/zod/EditItemFormSchema'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'

const page = () => {
  const router = useRouter()
  const query = useSearchParams()
  const articleId = query.get('id')
  const path = 'food_items'
  // const [image, setImage] = useState(null)
  const [reportsData, setReportsData] = useState([])
  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(EditItemFormSchema),
    mode: 'onChange',
  })
  // console.log(errors)
  const watcher = watch()
  // console.log(watcher)

  const { data, error } = useSWR(`/api/${path}/${articleId}`, getArticles)
  // console.log(data)

  useEffect(() => {
    if (data) {
      // console.log(data)
      const reportData = []
      data.article.reports.forEach((report, index) => {
        if (report) {
          data.article.reports[index].order = index + 1

          reportData.push({
            order: report.order,
            text: report.text,
            url: report.image_url,
            path: report.image_path,
            file: '',
          })
          // // 画像出力用
          // setReportsData(prevState => {
          //   const newState = prevState
          //   newState.push({ url: report.image_url, path: report.image_path })
          //   return newState
          // })
        }
      })

      reset({
        title: data.article.title,
        thumbnail_path: data.article.thumbnail_path,
        thumbnail_url: data.article.thumbnail_url,
        thumbnail_newFile: '',
        tags: data.article.tags,
        items: data.article.items,
        reports: reportData,
        vege_type: {
          vegan: data.article.vegan,
          oriental_vegetarian: data.article.oriental_vegetarian,
          ovo_vegetarian: data.article.ovo_vegetarian,
          pescatarian: data.article.pescatarian,
          lacto_vegetarian: data.article.lacto_vegetarian,
          pollo_vegetarian: data.article.pollo_vegetarian,
          fruitarian: data.article.fruitarian,
          other_vegetarian: data.article.other_vegetarian,
        },
      })

      // setImage({
      //   image: data.article.thumbnail_url,
      // })
    }
  }, [data])

  const onDrop = acceptedFiles => {
    const file = acceptedFiles[0]
    const url = URL.createObjectURL(file)
    setValue('thumbnail_url', url)
    setValue('thumbnail_newFile', file)
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

    types.map(type => {
      formData.append(type, values.vege_type[type])
    })

    values.reports.forEach((report, index) => {
      formData.append(`reports[${index}][order]`, report.order)
      formData.append(`reports[${index}][text]`, report.text)
      formData.append(`reports[${index}][url]`, watcher.reports[index].url)
      formData.append(`reports[${index}][path]`, watcher.reports[index].path)
      formData.append(`reports[${index}][file]`, watcher.reports[index].file)
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

    const res = await axios.post(
      `/api/food_items/${data.article.id}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-HTTP-Method-Override': 'PUT',
        },
      },
    )

    // console.log(res.data)
    // console.log('画面遷移')
    router.push(`/food_items/${res.data.article.id}`)
    // } catch (error) {
    //   throw error
    // }
  }

  const handleDelete = async () => {
    // try {
    await axios.delete(`/api/food_items/${data.article.id}`)
    // console.log(res.data)

    router.push('/food_items')
    // } catch (error) {
    //   throw error
    // }
  }

  if (error) return <p>Error: {error.message}</p>
  if (!data) return <p>Loading...</p>
  return (
    <main className="pb-32 max-w-2xl">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 my-16">
        <EditFormVegeTypes register={register} control={control} />

        <div className="bg-orange aspect-[4/3] max-w-2xl mx-auto">
          {watcher.thumbnail_url ? (
            <div className="image-preview aspect-[4/3] max-w-2xl relative flex w-full">
              <button
                className="absolute right-1 top-1 bg-white w-4 h-4 leading-none"
                type="button"
                onClick={() => {
                  setValue('thumbnail_newFile', '')
                  setValue('thumbnail_url', '')
                  setValue('thumbnail_path', '')
                }}>
                ✕
              </button>
              <img
                src={watcher.thumbnail_url}
                className="aspect-[4/3] max-w-2xl object-cover w-full h-full block"
                alt="Uploaded Image"
              />
            </div>
          ) : (
            <div {...getRootProps()} className="w-full h-full">
              <input accept="image/*" {...getInputProps()} />
              <div className="h-full flex justify-center items-center">
                <IconContext.Provider value={{ color: '#ccc', size: '80px' }}>
                  <PiCameraLight />
                </IconContext.Provider>
              </div>
            </div>
          )}
        </div>
        {errors.thumbnail_newFile && (
          <div className="container text-red-400">
            {errors.thumbnail_newFile.message}
          </div>
        )}

        <div className="container py-4 space-y-4">
          <div>
            <h3 className="bold sm:text-xl">タイトル</h3>
            <input
              className="border w-full"
              type="text"
              {...register(`title`)}
            />
          </div>
          <EditTags register={register} control={control} errors={errors} />
        </div>

        <EditItems
          register={register}
          control={control}
          setValue={setValue}
          errors={errors}
        />

        <EditReports
          register={register}
          control={control}
          reportsData={reportsData}
          setReportsData={setReportsData}
          setValue={setValue}
          errors={errors}
          watcher={watcher}
        />
        <hr className="mx-4" />

        <div className="flex justify-center">
          <Dialog className="mx-auto">
            <DialogTrigger asChild className="mx-auto">
              <Button
                type="button"
                className="mx-auto bg-button block py-1 mt-16 border-button-color ">
                削除
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>本当に削除しますか？</DialogTitle>
                <DialogDescription className="flex">
                  <Button
                    onClick={handleDelete}
                    type="button"
                    className="mx-auto bg-button block py-1 mt-8 border-button-color ">
                    削除する
                  </Button>
                  <DialogClose asChild>
                    <Button
                      type="button"
                      className="mx-auto bg-button block py-1 mt-8 border-button-color ">
                      戻る
                    </Button>
                  </DialogClose>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <Button
            type="submit"
            className="mx-auto bg-button block py-1 mt-16 border-button-color ">
            更新
          </Button>
        </div>
      </form>
      {/* </Form> */}
    </main>
  )
}

export default page
