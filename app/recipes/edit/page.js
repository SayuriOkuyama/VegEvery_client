'use client'

import { set, useForm, useFieldArray } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import axios from '@/lib/axios'
import { supabase } from '@/lib/utils/supabase/supabase'
import { v4 as uuidv4 } from 'uuid'
import { Input } from '@/components/ui/input'
import EditTags from '@/app/recipes/edit/EditTags.js'
import EditMaterials from '@/app/recipes/edit/EditMaterials.js'
import EditStep from '@/app/recipes/edit/EditStep.js'
import EditFormVegeTypes from '@/app/recipes/edit/EditFormVegeTypes.js'
import { useEffect, useRef, useState } from 'react'
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
  const [oldStepImages, setOldStepImages] = useState()
  const [arrayOldPath, setArrayOldPath] = useState()
  const [image, setImage] = useState(null)
  const [stepsData, setStepsData] = useState([])
  const { register, setValue, handleSubmit, control, getValues, reset } =
    useForm()
  const form = useForm()
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

          setValue(`steps.${index + 1}`, {
            order: step.order,
            image_url: step.image_url,
            text: step.text,
          })
          // 画像出力用
          setStepsData(prevState => ({
            ...prevState,
            [index + 1]: {
              order: step.order,
              image_url: step.image_url,
              text: step.text,
            },
          }))
          // 比較用
          arrayPath.push(step.image_path)
          console.log(arrayPath)
        }
      })
      setArrayOldPath(arrayPath)
      // 編集キャンセルに備えて、元の画像を保持しておく
      setOldStepImages(preOldStepImages)

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
    // // 0番目から4文字切り出す
    // if (image.substr(0, 4) !== 'blob') {
    //   const { data, error } = supabase.storage
    //     .from('VegEvery-backet')
    //     .remove([`recipes/thumbnail/${image.path}`])
    // }
    const file = acceptedFiles[0]
    setImage({
      file,
      image: URL.createObjectURL(file),
    })
    setValue('thumbnail', file)
  }

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  function onSubmit(values) {
    console.log(values)

    const supabase_url = process.env.NEXT_PUBLIC_SUPABASE_BUCKET_URL
    let thumbnail_path
    let thumbnail_url

    // サムネイルに変更があった場合のみ、ストレージにアップロード
    if (values.thumbnail && values.thumbnail.name) {
      // 拡張子部分を切り出す
      console.log('cut')
      const fileExtension = values.thumbnail.name.split('.').pop()

      // サムネイルのアップロード
      supabase.storage
        .from('VegEvery-backet')
        .upload(
          // ランダムな文字列に拡張子を付けたものをパスとする
          `recipes/thumbnail/${uuidv4()}.${fileExtension}`,
          values.thumbnail,
        )
        .then(response => {
          console.log('Insert successful:', response.data)
          console.log(oldThumbnail.path)
          const { data, error } = supabase.storage
            .from('VegEvery-backet')
            .remove(oldThumbnail.path)
            .then(response => {
              console.log('Delete successful:', response.data)
            })
            .catch(error => {
              console.error('Error delete thumbnail:', error)
            })
          thumbnail_path = response.data.path
          thumbnail_url = `${supabase_url}/object/public/${response.data.fullPath}`
          console.log(thumbnail_path)
          console.log(thumbnail_url)
        })
        .catch(error => {
          console.error('Error uploading thumbnail:', error)
        })
    } else {
      console.log('変更なし')
      thumbnail_path = values.thumbnail_path
      thumbnail_url = values.thumbnail_url
    }

    const stepImages = []
    const pathOnly = []
    const max = Math.max(oldStepImages.length, values.steps.length)

    for (let i = 0; i < max; i++) {
      if (oldStepImages[i] && values.steps[i]) {
        if (
          oldStepImages[i].url !== values.steps[i].image_url &&
          values.steps[i].image_url.substr(0, 4) === 'blob'
        ) {
          const fileExtension = values.steps[i].file.name.split('.').pop()

          supabase.storage
            .from('VegEvery-backet')
            .upload(
              `recipes/step_image/${uuidv4()}.${fileExtension}`,
              values.steps[i].file,
            )
            .then(response => {
              console.log('Insert successful:', response.data)

              stepImages[i] = {
                image_path: response.data.path,
                image_url: `${supabase_url}/object/public/${response.data.fullPath}`,
              }
              pathOnly.push(response.data.path)
            })
            .catch(error => {
              console.error('Error uploading step_image:', error)
            })
        } else {
          stepImages[i] = {
            image_path: values.steps[i].image_path,
            image_url: values.steps[i].image_url,
          }
          pathOnly.push(values.steps[i].image_path)
        }
      }
    }

    // すべてのアップロードが完了した後に次の処理を行う
    Promise.all(stepImages)
    console.log('All images uploaded successfully')
    console.log(stepImages)

    console.log(pathOnly)
    console.log(arrayOldPath)

    arrayOldPath.map(oldPath => {
      console.log(oldPath)
      if (!pathOnly.includes(oldPath)) {
        console.log('含まれてないから削除')

        const { data, error } = supabase.storage
          .from('VegEvery-backet')
          .remove(oldPath)
          .then(response => {
            console.log('Delete step_image successful:', response.data)
          })
          .catch(error => {
            console.error('Error delete step_image:', error)
          })
      }

      console.log({
        values,
        thumbnail_path,
        thumbnail_url,
        stepImages,
      })
    })

    Promise.all(stepImages, thumbnail_path, thumbnail_url)
    console.log({
      values,
      thumbnail_path,
      thumbnail_url,
      stepImages,
    })
    // axios
    //   .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/recipes`, {
    //     values,
    //     thumbnailUrl,
    //     stepImageUrls,
    //   })
    //   .then(res => {
    //     console.log(res.data)
    //     form.reset()
    //     console.log('画面遷移')
    //     router.push('/recipes')
    //   })
    //   .catch(error => {
    //     console.error('Error sending data to backend:', error)
    //   })
  }

  if (error) return <p>Error: {error.message}</p>
  if (!data) return <p>Loading...</p>
  return (
    // <RecoilRoot>
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
        />

        <EditStep
          register={register}
          control={control}
          stepsData={stepsData}
          setStepsData={setStepsData}
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
      {/* </Form> */}
    </main>
    // </RecoilRoot>
  )
}

export default page
