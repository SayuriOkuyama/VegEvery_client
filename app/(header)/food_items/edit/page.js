'use client'

import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import axios from '@/lib/axios'
import { supabase } from '@/lib/utils/supabase/supabase'
import { v4 as uuidv4 } from 'uuid'
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

  const [oldThumbnail, setOldThumbnail] = useState()
  const [arrayOldPath, setArrayOldPath] = useState()
  const [image, setImage] = useState(null)
  const [reportsData, setReportsData] = useState([])
  const { register, setValue, handleSubmit, control, getValues, reset } =
    useForm({
      mode: 'onChange', // リアルタイムで入力値を取得する
    })

  const { data, error } = useSWR(`${path}/${articleId}`, getArticles)
  // console.log(data)

  useEffect(() => {
    // console.log('エフェクト')
    if (data) {
      // console.log(data)
      setOldThumbnail({
        path: data.article.thumbnail_path,
        url: data.article.thumbnail_url,
      })
      const arrayPath = []
      const preOldReportImages = []
      data.article.reports.forEach((report, index) => {
        if (report) {
          preOldReportImages.push({
            path: report.image_path,
            url: report.image_url,
          })
          data.article.reports[index].order = index + 1

          setValue(`reports.${index}`, {
            order: report.order,
            image_url: report.image_url,
            text: report.text,
          })
          // 画像出力用
          setReportsData(prevState => {
            const newState = prevState
            newState.push({ url: report.image_url, path: report.image_path })
            return newState
          })
          // 比較用
          arrayPath.push(report.image_path)
        }
      })
      setArrayOldPath(arrayPath)

      reset({
        title: data.article.title,
        thumbnail_path: data.article.thumbnail_path,
        thumbnail_url: data.article.thumbnail_url,
        tags: data.article.tags,
        items: data.article.items,
        reports: data.article.reports,
        vegeTags: {
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

      setImage({
        image: data.article.thumbnail_url,
      })
    }
  }, [data])

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
    const reportImages = []
    const pathOnly = []
    // try {
    // サムネイルに変更があった場合のみ、ストレージにアップロード
    if (values.thumbnail && values.thumbnail.name) {
      // 拡張子部分を切り出す
      const fileExtension = values.thumbnail.name.split('.').pop()

      // サムネイルのアップロード
      const response = await supabase.storage.from('VegEvery-backet').upload(
        // ランダムな文字列に拡張子を付けたものをパスとする
        `items/thumbnail/${uuidv4()}.${fileExtension}`,
        values.thumbnail,
      )
      // console.log('Thumbnail upload successful:', response.data)
      thumbnail_path = response.data.path
      thumbnail_url = `${supabase_url}/object/public/${response.data.fullPath}`

      await supabase.storage.from('VegEvery-backet').remove(oldThumbnail.path)
    } else {
      thumbnail_path = values.thumbnail_path
      thumbnail_url = values.thumbnail_url
    }

    await Promise.all(
      // 新しい画像をストレージに保存
      reportsData.map(async (report, index) => {
        if (report && report.file && report.url.substr(0, 4) === 'blob') {
          const fileExtension = report.file.name.split('.').pop()

          const response = await supabase.storage
            .from('VegEvery-backet')
            .upload(
              `items/report_image/${uuidv4()}.${fileExtension}`,
              report.file,
            )
          // console.log('Report image upload successful:', response.data)

          reportImages[index] = {
            image_path: response.data.path,
            image_url: `${supabase_url}/object/public/${response.data.fullPath}`,
          }
          // console.log(reportImages)
          pathOnly.push(response.data.path)
        } else {
          reportImages[index] = {
            image_path: report.path,
            image_url: report.url,
          }
          // console.log(reportImages)
          pathOnly.push(report.path)
        }
      }),
    )

    // 要らなくなった画像をストレージから削除
    await Promise.all(
      arrayOldPath.map(oldPath => {
        if (!pathOnly.includes(oldPath)) {
          supabase.storage
            .from('VegEvery-backet')
            .remove(oldPath)
            // .then(() => {
            // console.log('Delete report_image successful:', response.data)
            // })
            .catch(error => {
              throw error
            })
        }
      }),
    )
    // console.log({
    //   values,
    //   thumbnail_path,
    //   thumbnail_url,
    //   reportImages,
    // })

    await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/food_items/${data.article.id}`,
      {
        title: values.title,
        thumbnail: {
          thumbnail_path: thumbnail_path,
          thumbnail_url: thumbnail_url,
        },
        tags: values.tags,
        vegeTags: values.vegeTags,
        items: values.items,
        reports: {
          report_order_text: values.reports,
          reportImages: reportImages,
        },
      },
    )

    // console.log(res.data)
    // console.log('画面遷移')
    //   router.push(`/food_items/${res.data.article.id}`)
    // } catch (error) {
    //   throw error
    // }
  }

  const handleDelete = async () => {
    // try {
    await axios.delete(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/food_items/${data.article.id}`,
    )
    // console.log(res.data)

    await supabase.storage.from('VegEvery-backet').remove()
    // console.log(imageRes.data)

    await Promise.all(
      arrayOldPath.map(oldPath => {
        supabase.storage
          .from('VegEvery-backet')
          .remove(oldPath)
          // .then(() => {
          // console.log('Delete report_image successful:', response.data)
          // })
          .catch(error => {
            throw error
          })
      }),
    )

    router.push('/food_items')
    // } catch (error) {
    //   throw error
    // }
  }

  if (error) return <p>Error: {error.message}</p>
  if (!data) return <p>Loading...</p>
  return (
    <main className="pb-32">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 my-16">
        <EditFormVegeTypes register={register} control={control} />

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
            />
          </div>
          <EditTags
            register={register}
            control={control}
            getValues={getValues}
          />
        </div>

        <EditItems
          register={register}
          control={control}
          getValues={getValues}
          setValue={setValue}
        />

        <EditReports
          register={register}
          control={control}
          reportsData={reportsData}
          setReportsData={setReportsData}
          setValue={setValue}
        />
        <hr className="mx-4" />

        <div className="flex justify-center">
          <Dialog className="mx-auto">
            <DialogTrigger className="mx-auto">
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
