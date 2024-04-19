'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'
import { SlSettings } from 'react-icons/sl'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/auth'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import axios from '@/lib/axios'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { PiCameraLight } from 'react-icons/pi'
import { IconContext } from 'react-icons'
import { useDropzone } from 'react-dropzone'
import { useRouter } from 'next/navigation'

const page = () => {
  const { user } = useAuth({ middleware: 'auth' })
  const [isEdit, setIsEdit] = useState(false)
  const router = useRouter()

  const vegetarian_type = {
    vegan: 'ヴィーガン',
    oriental_vegetarian: 'オリエンタル・ベジタリアン',
    ovo_vegetarian: 'オボ・ベジタリアン',
    pescatarian: 'ペスカタリアン',
    lacto_vegetarian: 'ラクト・ベジタリアン',
    pollo_vegetarian: 'ポーヨ・ベジタリアン',
    fruitarian: 'フルータリアン',
    other_vegetarian: 'その他のベジタリアン',
  }

  const ACCEPTED_IMAGE_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
  ]

  const FormSchema = z.object({
    account_id: z.string(),
    name: z
      .string()
      .min(1, {
        message: '※ 入力が必須です。',
      })
      .max(30, {
        message: '※ 30 文字以内で入力してください。',
      }),
    icon_path: z.string(),
    icon_url: z.string(),
    icon_file: z
      .custom(
        file =>
          file instanceof File && ACCEPTED_IMAGE_TYPES.includes(file.type),
        {
          message:
            'jpeg, jpg, png, webp のいずれかの画像ファイルを選択してください。',
        },
      )
      .optional()
      .or(z.literal('')),
    vegetarian_type: z.string(),
    introduction: z.string().max(30, {
      message: '※ 30 文字以内で入力してください。',
    }),
  })

  const form =
    // register,
    // control,
    // reset,
    // handleSubmit,
    // formState: { errors },
    useForm({
      resolver: zodResolver(FormSchema),
      defaultValues: {
        name: '',
      },
      mode: 'onChange',
    })

  const editProfile = () => {
    setIsEdit(true)
    form.reset({
      account_id: user.account_id,
      name: user.name,
      icon_path: user.icon_storage_path,
      icon_url: user.icon_url,
      icon_file: '',
      vegetarian_type: vegetarian_type[user.vegetarian_type],
      introduction: user.introduction,
    })
  }

  const editComplete = async values => {
    console.log(values)
    // FormDataオブジェクトを作成
    const formData = new FormData()

    // フォームデータをFormDataオブジェクトに追加
    for (const key in values) {
      formData.append(key, values[key])
    }

    const res = await axios.post(`/api/user/update/${user.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-HTTP-Method-Override': 'PUT',
      },
    })

    router.refresh()
  }

  const onDrop = acceptedFiles => {
    const file = acceptedFiles[0]
    form.setValue('icon_url', URL.createObjectURL(file))
    form.setValue('icon_file', file)
  }

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  if (!user) return <p>Loading...</p>
  console.log(user)

  return (
    <main className="pb-24">
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="fixed top-3 right-3 w-10 h-10">
          <button className="flex justify-center items-center rounded-full p-1 side_icon">
            <SlSettings size="24px" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          <DropdownMenuGroup className="text-color">
            <DropdownMenuItem
              onClick={() => editProfile()}
              className="text-base">
              プロフィール編集
            </DropdownMenuItem>
            <DropdownMenuItem className="text-base">
              パスワード再設定
            </DropdownMenuItem>
            <Dialog className="mx-auto mt-0">
              <DialogTrigger className="">
                <div className="px-2 py-1.5">アカウント削除</div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>本当にアカウントを削除しますか？</DialogTitle>
                  <DialogDescription className="flex">
                    <Button
                      // onClick={() => handleDelete()}
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
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <h2 className="text-center mt-8">プロフィール</h2>
      <div className="container">
        <div className="mx-auto mt-4 w-20">
          {isEdit ? (
            <div>
              {form.watch().icon_url ? (
                <div className="image-preview relative flex rounded-full w-20 h-20">
                  <button
                    className="absolute right-1 bottom-1 bg-white w-6 h-6 leading-none border rounded-full text-center p-1"
                    type="button"
                    onClick={() => {
                      form.setValue('icon_url', '')
                      form.setValue('icon_file', '')
                    }}>
                    ✕
                  </button>
                  <img
                    src={form.watch().icon_url}
                    className="object-cover w-full h-full block rounded-full p-2"
                    alt="Uploaded Image"
                  />
                </div>
              ) : (
                <div {...getRootProps()} className="rounded-full border">
                  <input {...getInputProps()} />
                  <div className="h-full flex justify-center items-center p-2">
                    <IconContext.Provider
                      value={{ color: '#ccc', size: '60px' }}>
                      <PiCameraLight />
                    </IconContext.Provider>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <img
              src={user.icon_url}
              className="object-cover w-full h-full block rounded-full"
              alt="ユーザーアイコン"
            />
          )}
        </div>
        <div className="flex mt-8">
          <div className="w-28 mr-2">アカウント ID</div>
          {/* {isEdit ? (
            <div className="w-56 mr-2">
              <input
                type="text"
                {...form.register(`account_id`)}
                className="block border w-full"
              />
            </div>
          ) : ( */}
          <div>{user.account_id}</div>
          {/* )} */}
        </div>
        <hr />
        <div className="flex mt-4">
          <div className="w-28 mr-2">ユーザー名</div>
          {isEdit ? (
            <div className="w-56 mr-2">
              <input
                type="text"
                {...form.register(`name`)}
                className="block border w-full"
              />
            </div>
          ) : (
            <div>{user.name}</div>
          )}
        </div>
        <hr />
        <div className="flex mt-4">
          <div className="w-28 mr-2">ベジタリアンの種類</div>
          {isEdit ? (
            <Form {...form}>
              <FormField
                control={form.control}
                name="vegetarian_type"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="mt-6">
                      <FormControl>
                        <SelectTrigger className="focus:ring-0">
                          <SelectValue
                            placeholder="種類を選択"
                            className="block w-56"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(vegetarian_type).map(([key, value]) => {
                          return (
                            <SelectItem
                              key={key}
                              value={value}
                              className="text-color">
                              {value}
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Form>
          ) : (
            <div>{vegetarian_type[user.vegetarian_type]}</div>
          )}
        </div>
        <hr />
        <div className="flex mt-2">
          <div className="w-28 mr-2">自己紹介</div>
          {isEdit ? (
            <textarea
              {...form.register(`introduction`)}
              rows="5"
              className="border w-56"
            />
          ) : (
            <div>{user.introduction}</div>
          )}
        </div>
        {isEdit && (
          <Button
            type="button"
            onClick={form.handleSubmit(editComplete)}
            className="block h-8 mx-auto leading-none	bg-button border-button-color text-xs mt-2 py-2">
            保存
          </Button>
        )}
      </div>
    </main>
  )
}

export default page
