'use client'

import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import axios from '@/lib/axios'
import { supabase } from '@/lib/utils/supabase/supabase'
import { v4 as uuidv4 } from 'uuid'
import EditTags from '@/app/recipes/edit/EditTags.js'
import EditMaterials from '@/app/recipes/edit/EditMaterials.js'
import EditStep from '@/app/recipes/edit/EditStep.js'
import EditFormVegeTypes from '@/app/recipes/edit/EditFormVegeTypes.js'
import { useEffect, useState } from 'react'
import { PiCameraLight } from 'react-icons/pi'
import { IconContext } from 'react-icons'
import { useDropzone } from 'react-dropzone'
import { useRouter, useSearchParams } from 'next/navigation.js'
import { getArticles } from '@/lib/utils/fetch.js'
import useSWR from 'swr'

const page = () => {
  const router = useRouter()
  const query = useSearchParams()
  const articleId = query.get('id')
  const path = 'recipes'

  const [oldThumbnail, setOldThumbnail] = useState()
  const [arrayOldPath, setArrayOldPath] = useState()
  const [image, setImage] = useState(null)
  const [stepImages, setStepImages] = useState([])
  const { register, setValue, handleSubmit, control, getValues, reset } =
    useForm({
      mode: 'onChange', // リアルタイムで入力値を取得する
    })
  // const form = useForm()

  const { data, error } = useSWR(`${path}/${articleId}`, getArticles)
  console.log(data)

  useEffect(() => {
    console.log('エフェクト')
    if (data) {
      console.log(data)
      setOldThumbnail({
        path: data.article.thumbnail_path,
        url: data.article.thumbnail_url,
      })
      const arrayPath = []
      const preOldStepImages = []
      data.article.recipe_steps.forEach((step, index) => {
        if (step) {
          preOldStepImages.push({ path: step.image_path, url: step.image_url })
          data.article.recipe_steps[index].order = index + 1

          setValue(`steps.${index}`, {
            order: step.order,
            image_url: step.image_url,
            text: step.text,
          })
          // 画像出力用
          setStepImages(prevState => {
            const newState = prevState
            newState.push({ url: step.image_url, path: step.image_path })
            return newState
          })
          // 比較用
          arrayPath.push(step.image_path)
        }
      })
      setArrayOldPath(arrayPath)

      reset({
        title: data.article.title,
        thumbnail_path: data.article.thumbnail_path,
        thumbnail_url: data.article.thumbnail_url,
        tags: data.article.tags,
        materials: data.article.materials,
        steps: data.article.recipe_steps,
        servings: data.article.servings,
        time: data.article.cooking_time,
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
    console.log(values)

    const supabase_url = process.env.NEXT_PUBLIC_SUPABASE_BUCKET_URL
    let thumbnail_path
    let thumbnail_url
    const stepImagesData = []
    const pathOnly = []

    try {
      // サムネイルに変更があった場合のみ、ストレージにアップロード
      if (values.thumbnail && values.thumbnail.name) {
        // 拡張子部分を切り出す
        const fileExtension = values.thumbnail.name.split('.').pop()

        // サムネイルのアップロード
        const response = await supabase.storage.from('VegEvery-backet').upload(
          // ランダムな文字列に拡張子を付けたものをパスとする
          `recipes/thumbnail/${uuidv4()}.${fileExtension}`,
          values.thumbnail,
        )
        console.log('Thumbnail upload successful:', response.data)
        thumbnail_path = response.data.path
        thumbnail_url = `${supabase_url}/object/public/${response.data.fullPath}`

        const { data, error } = await supabase.storage
          .from('VegEvery-backet')
          .remove(oldThumbnail.path)
      } else {
        thumbnail_path = values.thumbnail_path
        thumbnail_url = values.thumbnail_url
      }

      console.log(stepImages)
      await Promise.all(
        // 新しい画像をストレージに保存
        stepImages.map(async (step, index) => {
          console.log(step)
          if (step && step.file && step.url.substr(0, 4) === 'blob') {
            const fileExtension = step.file.name.split('.').pop()

            const response = await supabase.storage
              .from('VegEvery-backet')
              .upload(
                `recipes/step_image/${uuidv4()}.${fileExtension}`,
                step.file,
              )
            console.log('Step image upload successful:', response.data)

            stepImagesData[index] = {
              image_path: response.data.path,
              image_url: `${supabase_url}/object/public/${response.data.fullPath}`,
            }
            console.log(stepImagesData)

            pathOnly.push(response.data.path)
          } else {
            stepImagesData[index] = {
              image_path: step.path,
              image_url: step.url,
            }
            console.log(stepImagesData)
            pathOnly.push(step.path)
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
              .then(response => {
                console.log('Delete step_image successful:', response.data)
              })
              .catch(error => {
                console.error('Error delete step_image:', error)
              })
          }
        }),
      )
      console.log({
        values,
        thumbnail_path,
        thumbnail_url,
        stepImagesData,
      })

      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/recipes/${data.article.id}`,
        {
          title: values.title,
          thumbnail: {
            thumbnail_path: thumbnail_path,
            thumbnail_url: thumbnail_url,
          },
          cooking_time: values.time,
          servings: values.servings,
          tags: values.tags,
          vegeTags: values.vegeTags,
          materials: values.materials,
          recipe_step: {
            step_order_text: values.steps,
            stepImages: stepImagesData,
          },
        },
      )

      console.log(res.data)
      console.log('画面遷移')
      router.push(`/recipes/${res.data.article.id}`)
    } catch (error) {
      console.error('Error handling form submission:', error)
    }
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
            <h3>レシピタイトル</h3>
            <input className="border" type="text" {...register(`title`)} />
          </div>
          <EditTags
            register={register}
            control={control}
            getValues={getValues}
          />
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

        <EditMaterials
          register={register}
          control={control}
          getValues={getValues}
          setValue={setValue}
        />

        <EditStep
          register={register}
          control={control}
          stepImages={stepImages}
          setStepImages={setStepImages}
          setValue={setValue}
          reset={reset}
        />
        <hr className="mx-4" />

        <div className="">
          <Button
            type="submit"
            className="mx-auto bg-button block py-1 mt-16 border-button-color ">
            更新
          </Button>
        </div>
      </form>
    </main>
  )
}

export default page
