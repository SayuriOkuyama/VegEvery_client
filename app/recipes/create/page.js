'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Tags from './Tags'
import Materials from './Materials.js'
import Steps from './Steps.js'
import FormVegeType from './FormVegeType.js'
import { useEffect, useRef, useState } from 'react'
import { PiCameraLight } from 'react-icons/pi'
import { IconContext } from 'react-icons'
import { useDropzone } from 'react-dropzone'

// const formSchema = z.object({
//   title: z
//     .string()
//     .min(2, {
//       message: 'タイトルは 2 文字以上で入力してください。',
//     })
//     .max(30, {
//       message: 'タイトルは 30 文字以内で入力してください。',
//     }),
//   tags: z
//     .string()
//     .min(2, {
//       message: 'タグは 2 文字以上で入力してください。',
//     })
//     .max(10, {
//       message: 'タグは 10 文字以内で入力してください。',
//     }),
// time: z
//   .string()
//   .min(1, {
//     message: '調理目安時間は 1 文字以上で入力してください',
//   })
//   .max(10, { message: '調理目安時間は 10 文字以内で入力してください' }),
// servings: z.string().min(2, {
//   message: '分量は 2 文字以上で入力してください。',
// }),
// material: z
//   .string()
//   .min(1, {
//     message: '材料は 1 文字以上で入力してください。',
//   })
//   .max(20, {
//     message: '材料は 20 文字以内で入力してください。',
//   }),
// quantity: z
//   .string()
//   .min(1, {
//     message: '量は 1 文字以上で入力してください。',
//   })
//   .max(1, {
//     message: '量は 10 文字以内で入力してください。',
//   }),
// unit: z.string().min(2, {
//   message: '量は 1 文字以上で入力してください。',
// }),
// image: z.string().min(2, {
//   message: 'Username must be at least 2 characters.',
// }),
// step: z.string().min(2, {
//   message: '手順は 2 文字以上で入力してください。',
// }),
//   image: z.string().min(2, {
//     message: 'Username must be at least 2 characters.',
//   }),
// })

const page = () => {
  const [image, setImage] = useState(null)

  const onDrop = acceptedFiles => {
    const file = acceptedFiles[0]
    setImage({
      file,
      preview: URL.createObjectURL(file),
    })
  }

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  const [thumbnail, setThumbnail] = useState(null)
  const thumbnailRef = useRef(null)
  // const { watch, getValues } = useForm()
  // const watchThumbnail = watch('thumbnail', '未登録')

  // 1. Define your form.
  const { register, handleSubmit, control } = useForm({
    // resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      tags: [{ tag: '' }],
      materials: [{ material: '', quantity: '', unit: '' }],
      time: '',
      thumbnail: '',
      steps: [{ order: '', image: '', text: '' }],
    },
  })
  const form = useForm()
  // const { fields, append, remove } = useFieldArray({
  //   control,

  //   name: 'tags',
  //   name: 'materials',
  // })
  // const { ref } = register('thumbnail')
  // const thumbnailRegister = register('thumbnail')
  const { ref, name, onBlur, ...rest } = register('thumbnail')

  console.log({ ...rest })

  // const thumbnailOnChange = thumbnailRegister.onChange

  // thumbnailRegister.onChange = e => {
  //   const res = thumbnailOnChange(e)
  //   const files = e.target.files
  //   console.log(files)
  //   console.log('これからセット')

  //   if (files) {
  //     console.log('セット')

  //     setThumbnail(files[0])
  //     console.dir(watchThumbnail)
  //     console.log(thumbnail)
  //   }
  //   return res
  // }

  function onSubmit(values) {
    console.log(values)
    form.reset()
  }
  const showFolder = () => {
    console.log('click')
    console.log(thumbnailRef.current)

    if (thumbnailRef.current) {
      thumbnailRef.current.click()
    }
  }

  // state に画像をセットする
  const setFile = e => {
    const files = e.target.files
    console.log(files)
    console.log('これからセット')

    if (files) {
      console.log('セット')

      setThumbnail(files[0])
      // console.dir(watchThumbnail)
      console.log(thumbnail)
    }
  }

  // const registerRef = node => {
  //   ref(node) // register の ref に関連付ける
  // }

  useEffect(() => {
    if (register) {
      thumbnailRef.current = register.thumbnail
    }
  }, [register])

  return (
    <main className="pb-32">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 my-16">
        <div {...getRootProps()} className="dropzone">
          <input {...getInputProps()} {...register(`image`)} />
          <p>Drag 'n' drop an image here, or click to select image</p>
        </div>
        {image && (
          <div className="image-preview">
            <img src={image.preview} alt="Uploaded Image" />
          </div>
        )}
        <FormVegeType register={register} control={control} />
        <div className="bg-orange">
          {/* <h3>メイン画像</h3> */}
          <label class="upload-label hidden">
            ファイルを選択
            <input type="file hidden" />
          </label>
          <button
            type="button"
            className="block mx-auto h-52"
            onClick={() => showFolder()}>
            <div className="w-dvw h-full flex justify-center items-center">
              <IconContext.Provider value={{ color: '#ccc', size: '80px' }}>
                <PiCameraLight />
              </IconContext.Provider>
            </div>
          </button>
          {/* <Controller
            control={control}
            name="ReactDatepicker"
            // rules={{
            //   required: true,
            //   onChange: e => setFile(e),
            // }}
            render={({ field: { onChange, onBlur, value, name, ref } }) => ( */}
          <input
            // ここで ref を指定
            ref={register.thumbnail}
            // ref={node => {
            //   ref(node)
            //   console.log(node)
            //   // console.dir(ref(e))
            //   thumbnailRef.current = node
            // }}
            capture="environment"
            className="border mx-auto"
            type="file"
            accept=".png, .jpeg, .jpg "
            // hidden
            // ここでは register に引数（ref）を渡さない！
            // register から Controller に変更したから field になる？
            // {...rest}
            name={name}
            onBlur={onBlur}
            onChange={e => {
              console.log('呼び出し')
              // onChange(e)
              setFile(e)
            }}
            // value={value}
          />
          {/* )}
          /> */}
        </div>
        <img src={thumbnail?.name} />

        <div className="container py-4 space-y-4">
          <div>
            <h3>レシピタイトル</h3>
            <input className="border" type="text" {...register(`title`)} />
          </div>
          <Tags register={register} control={control} />
          <div>
            <h3>調理目安時間</h3>
            <input
              className="border"
              type="text"
              placeholder="20分"
              {...register(`time`)}
            />
          </div>
        </div>
        <Materials register={register} control={control} />
        <Steps register={register} control={control} />
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
