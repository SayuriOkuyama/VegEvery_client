'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { EditRecipeFormSchema } from '@/lib/zod/EditRecipeFormSchema'
import { Button } from '@/components/ui/button'
import axios from '@/lib/axios'
import EditTags from '@/app/(header)/recipes/edit/EditTags.js'
import EditMaterials from '@/app/(header)/recipes/edit/EditMaterials.js'
import EditStep from '@/app/(header)/recipes/edit/EditStep.js'
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
  const path = 'recipes'

  const [stepImages, setStepImages] = useState([])

  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(EditRecipeFormSchema),
    mode: 'onChange',
  })
  const watcher = watch()
  // console.log(watcher)
  // console.log(errors)

  const { data, error } = useSWR(`/api/${path}/${articleId}`, getArticles)
  // console.log(data)

  useEffect(() => {
    if (data) {
      // console.log(data)

      data.article.recipe_steps.forEach((step, index) => {
        if (step) {
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
        }
      })

      reset({
        title: data.article.title,
        thumbnail_path: data.article.thumbnail_path,
        thumbnail_url: data.article.thumbnail_url,
        thumbnail_newFile: '',
        tags: data.article.tags,
        materials: data.article.materials,
        steps: data.article.recipe_steps,
        servings: data.article.servings,
        time: data.article.cooking_time,
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

    values.steps.forEach((step, index) => {
      formData.append(`steps[${index}][order]`, step.order)
      formData.append(`steps[${index}][text]`, step.text)
      // console.log(stepImages[index])
      if (stepImages[index]) {
        // console.log(stepImages[index].file)
        // ↓ なぜかこれだと undefined になる
        // console.log(step.image)
        if (stepImages[index].url) {
          formData.append(`steps[${index}][url]`, stepImages[index].url)
          formData.append(`steps[${index}][path]`, stepImages[index].path)
          formData.append(`steps[${index}][file]`, stepImages[index].file)
        }
      }
    })

    values.materials.forEach((material, index) => {
      formData.append(`materials[${index}][name]`, material.name)
      formData.append(`materials[${index}][quantity]`, material.quantity)
      formData.append(`materials[${index}][unit]`, material.unit)
    })

    values.tags.forEach((tag, index) => {
      if (tag.name !== '') {
        formData.append(`tags[${index}][name]`, tag.name)
      }
    })

    // for (let pair of formData.entries()) {
    //   console.log(pair[0] + ', ' + pair[1])
    // }

    const res = await axios.post(`/api/recipes/${data.article.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-HTTP-Method-Override': 'PUT',
      },
    })

    router.push(`/recipes/${res.data.article.id}`)
    // } catch (error) {
    //   throw error
    // }
  }

  const handleDelete = async () => {
    // try {
    await axios.delete(`/api/recipes/${data.article.id}`)
    // console.log(res.data)
    router.push('/recipes')
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
            <div className="image-preview relative flex w-full h-full">
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
                className="object-cover w-full h-full block"
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
            <h3>レシピタイトル</h3>
            <input
              className="border w-full"
              type="text"
              {...register(`title`)}
            />
            {errors.title && (
              <div className="text-red-400">{errors.title.message}</div>
            )}
          </div>
          <EditTags register={register} control={control} errors={errors} />
          <div>
            <h3>調理目安時間</h3>
            <input
              className="border w-8 px-1"
              type="number"
              placeholder="20"
              {...register(`time`)}
            />
            分
            {errors.time && (
              <div className="text-red-400">{errors.time.message}</div>
            )}
          </div>
        </div>

        <EditMaterials
          register={register}
          control={control}
          setValue={setValue}
          errors={errors}
        />

        <EditStep
          register={register}
          control={control}
          stepImages={stepImages}
          setStepImages={setStepImages}
          setValue={setValue}
          reset={reset}
          errors={errors}
        />
        <hr className="mx-4" />

        <div className="flex justify-center">
          <Dialog className="mx-auto">
            <DialogTrigger className="mx-auto">
              <Button
                type="button"
                className="mx-auto bg-button block py-1 mt-16 border-button-color">
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
                    className="mx-auto bg-button block py-1 mt-8 border-button-color">
                    削除する
                  </Button>
                  <DialogClose asChild>
                    <Button
                      type="button"
                      className="mx-auto bg-button block py-1 mt-8 border-button-color">
                      戻る
                    </Button>
                  </DialogClose>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <Button
            type="submit"
            className="mx-auto bg-button block py-1 mt-16 border-button-color">
            更新
          </Button>
        </div>
      </form>
    </main>
  )
}

export default page
