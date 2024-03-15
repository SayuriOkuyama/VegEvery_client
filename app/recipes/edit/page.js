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

  const [image, setImage] = useState(null)
  const [stepsData, setStepsData] = useState([])
  const { register, setValue, handleSubmit, control, getValues, reset } =
    useForm({
      // resolver: zodResolver(formSchema),
      defaultValues: {
        title: '',
        tags: [{ tag: '' }],
        materials: [{ material: '', quantity: '', unit: '' }],
        thumbnail: '',
        servings: '',
      },
    })
  const form = useForm()
  const { data, error } = useSWR(`${path}/${articleId}`, getArticles)
  console.log(data)

  // let data
  useEffect(() => {
    console.log('エフェクト')
    if (data) {
      console.log(data)

      const orders = []
      data.article.recipe_steps.forEach((step, index) => {
        console.log(index)
        if (step) {
          // console.log(step)
          let order = step.order
          // console.log(order)
          // console.log(orders.includes(order))
          if (orders.includes(order)) {
            while (orders.includes(order)) {
              order++
            }
          }
          orders.push(order)
          // console.log(orders)
          data.article.recipe_steps[index].order = index + 1
          console.log({
            [order]: {
              order: order,
              image: step.image,
              text: step.text,
            },
          })
          setValue(`steps.${index + 1}`, {
            order: order,
            image: step.image,
            text: step.text,
          })
          setStepsData(prevState => ({
            ...prevState,
            [index + 1]: {
              order: order,
              image: step.image,
              text: step.text,
            },
          }))
        }
      })

      reset({
        title: data.article.title,
        thumbnail: data.article.thumbnail,
        tags: data.article.tags ? data.article.tags : '',
        materials: data.article.materials,
        steps: data.article.recipe_steps,
        servings: data.article.servings,
        time: data.article.cooking_time,
      })
      setImage({
        image: data.article.thumbnail,
      })
    }

    const fetchData = async () => {
      const data = await getArticles({ path, articleId })

      const tags = []
      data.article.tags.map((tag, index) => {
        setValue(`tags.${index}.tag`, tag.name)
        tags.push(tag.name)
      })

      // const defaultValue = [
      //   { title: data.article.title },
      //   {
      //     vege_type: {
      //       vegan: data.article.vegan,
      //       oriental_vegetarian: data.article.oriental_vegetarian,
      //       ovo_vegetarian: data.article.ovo_vegetarian,
      //       pescatarian: data.article.pescatarian,
      //       lacto_vegetarian: data.article.lacto_vegetarian,
      //       pollo_vegetarian: data.article.pollo_vegetarian,
      //       fruitarian: data.article.fruitarian,
      //       other_vegetarian: data.article.other_vegetarian,
      //     },
      //   },
      //   { tags: tags },
      //   { time: data.article.cooking_time },
      //   { servings: data.article.servings },
      // ]
      // setValue('title', data.article.title)

      // setValue('vege_type.vegan', data.article.vegan)
      // setValue(
      //   'vege_type.oriental_vegetarian',
      //   data.article.oriental_vegetarian,
      // )
      // setValue('vege_type.ovo_vegetarian', data.article.ovo_vegetarian)
      // setValue('vege_type.pescatarian', data.article.pescatarian)
      // setValue('vege_type.lacto_vegetarian', data.article.lacto_vegetarian)
      // setValue('vege_type.pollo_vegetarian', data.article.pollo_vegetarian)
      // setValue('vege_type.fruitarian', data.article.fruitarian)
      // setValue('vege_type.other_vegetarian', data.article.other_vegetarian)

      data.article.tags.map((tag, index) => {
        setValue(`tags.${index}.tag`, tag.name)
      })
      // setFormData({ title: data.article.title })
      setValue('time', data.article.cooking_time)
      setValue('servings', data.article.servings)

      data.article.materials.map((material, index) => {
        // console.log(material)
        setValue(`materials.${index}.material`, material.name)
        setValue(`materials.${index}.quantity`, material.quantity)
        setValue(`materials.${index}.unit`, material.unit)
      })

      data.article.recipe_steps.sort((a, b) => a.order - b.order)
      console.log(data.article.recipe_steps)
      const orders = []
      data.article.recipe_steps.forEach(step => {
        if (step) {
          // console.log(step)
          let order = step.order
          // console.log(order)
          console.log(orders.includes(order))
          if (orders.includes(order)) {
            while (orders.includes(order)) {
              order++
            }
          }
          orders.push(order)
          console.log(orders)
          console.log({
            [order]: {
              order: order,
              image: step.image,
              text: step.text,
            },
          })
          setValue(`stepsData.${step.order}`, {
            [order]: {
              order: order,
              image: step.image,
              text: step.text,
            },
          })
          setStepsData(prevState => ({
            ...prevState,
            [order]: {
              order: order,
              image: step.image,
              text: step.text,
            },
          }))
        }
      })
      // data.article.recipe_steps.map(step => {
      //   setStepsData(prevState => ({
      //     ...prevState,
      //     [step.order]: {
      //       order: step.order,
      //       preview: step.image,
      //       text: step.text,
      //     },
      //   }))
      // })
      console.log(data)

      reset({
        title: data.article.title,
        tags: data.article.tags ? data.article.tags : '',
        materials: data.article.materials,
        steps: data.article.recipe_steps,
        servings: data.article.servings,
        time: data.article.cooking_time,
      })

      return data
    }
    // data = fetchData()
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

  function onSubmit(values) {
    console.log(values)

    const fileExtension = values.thumbnail.name.split('.').pop()
    let thumbnailUrl = ''
    const stepImageUrls = []

    supabase.storage
      .from('VegEvery-backet')
      .upload(
        `recipes/thumbnail/${uuidv4()}.${fileExtension}`,
        values.thumbnail,
      )
      .then(response => {
        console.log('Insert successful:', response.data)
        const supabase_url = process.env.NEXT_PUBLIC_SUPABASE_BUCKET_URL
        thumbnailUrl = `${supabase_url}/object/public/${response.data.fullPath}`

        // すべてのステップ画像のアップロードが完了したかどうかを追跡するPromiseの配列
        const uploadPromises = values.stepImages.map(image =>
          supabase.storage
            .from('VegEvery-backet')
            .upload(`recipes/thumbnail/${uuidv4()}.${fileExtension}`, image),
        )
        // すべてのアップロードが完了した後に次の処理を行う
        Promise.all(uploadPromises)
          .then(responses => {
            console.log('All images uploaded successfully')

            // すべてのステップ画像のURLを配列に追加
            responses.forEach(response => {
              const stepImageUrl = `${supabase_url}/object/public/${response.data.fullPath}`
              stepImageUrls.push(stepImageUrl)
            })

            console.log({
              values,
              thumbnailUrl,
              stepImageUrls,
            })
            axios
              .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/recipes`, {
                values,
                thumbnailUrl,
                stepImageUrls,
              })
              .then(res => {
                console.log(res.data)
                form.reset()
                console.log('画面遷移')
                router.push('/recipes')
              })
              .catch(error => {
                console.error('Error sending data to backend:', error)
              })
          })
          .catch(error => {
            console.error('Error uploading step images:', error)
          })
      })
      .catch(error => {
        console.error('Error uploading thumbnail:', error)
      })
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
            <div className="image-preview relative flex w-full">
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
            <div {...getRootProps()} className="h-52">
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
