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
import EditUserFormSchema from '@/lib/zod/EditUserFormSchema'
import axios from '@/lib/axios'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
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
import Link from 'next/link'
import SettingPassword from '@/components/layouts/user/SettingPassword'
import { LiaSpinnerSolid } from 'react-icons/lia'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import Loading from '@/components/layouts/Loading'

const page = () => {
  const { user } = useAuth({ middleware: 'auth' })
  const [isEdit, setIsEdit] = useState(false)
  const [isResettingPassword, setIsResettingPassword] = useState(false)
  const [isDeletingAccount, setIsDeletingAccount] = useState(false)
  const [deletedAccount, setDeletedAccount] = useState(false)

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

  const form = useForm({
    resolver: zodResolver(EditUserFormSchema),
    mode: 'onChange',
  })
  // console.log(form.formState.errors)
  // console.log(user)
  // console.log(form.watch())
  const editProfile = () => {
    setIsEdit(true)
    let icon_url
    if (user.icon_storage_path) {
      icon_url = `${process.env.NEXT_PUBLIC_CLOUD_FRONT_URL}/${user.icon_storage_path}`
    } else {
      icon_url = user.icon_url
    }

    form.reset({
      account_id: user.account_id,
      name: user.name,
      icon_path: user.icon_storage_path,
      icon_url: icon_url,
      // icon_url: user.icon_url,
      icon_file: '',
      vegetarian_type: vegetarian_type[user.vegetarian_type],
      introduction: user.introduction ? user.introduction : '',
    })
  }

  const editComplete = async values => {
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

    user.name = res.data.name
    user.vegetarian_type = res.data.vegetarian_type
    user.introduction = res.data.introduction
    user.icon_path = res.data.icon_storage_path
    user.icon_url = `${process.env.NEXT_PUBLIC_CLOUD_FRONT_URL}/${res.data.icon_storage_path}`

    // console.log(res.data)

    setIsEdit(false)
  }

  const onDrop = acceptedFiles => {
    const file = acceptedFiles[0]
    form.setValue('icon_url', URL.createObjectURL(file))
    form.setValue('icon_file', file)
  }

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  const handleDelete = async () => {
    setIsDeletingAccount(true)
    await axios.delete(`/api/user/delete/account/${user.id}`)
    setDeletedAccount(true)
  }

  if (!user) return <Loading />
  // console.log(
  //   `${process.env.NEXT_PUBLIC_CLOUD_FRONT_URL}/${user.icon_storage_path}`,
  // )
  // console.log(user)
  return (
    <main className="pb-24 max-w-3xl sm:min-h-[60svh]">
      {isDeletingAccount && (
        <div className="w-screen h-svh mt-32">
          <div className="flex justify-center container">
            <Alert>
              {deletedAccount ? (
                <>
                  <AlertTitle className="text-center mt-4 text-color">
                    アカウントを削除しました。
                  </AlertTitle>
                  <AlertDescription className="flex justify-center text-color mb-4">
                    <div className="flex flex-col justify-center mt-4 text-base">
                      <p className="mt-4">これまでご利用いただき</p>
                      <p className="mt-2">ありがとうございました！</p>
                      <Link href={`/`} className="block mt-8">
                        <Button
                          type="button"
                          className="border border-button-color bg-button flex items-center">
                          <p>トップページへ</p>
                        </Button>
                      </Link>
                    </div>
                  </AlertDescription>
                </>
              ) : (
                <AlertTitle className="text-center text-color">
                  <div className="flex justify-center items-center space-x-1">
                    <LiaSpinnerSolid className="animate-spin" />
                    <p>アカウントを削除しています。</p>
                  </div>
                </AlertTitle>
              )}
            </Alert>
          </div>
        </div>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className="fixed top-3 right-3 w-10 h-10 sm:hidden">
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
            <DropdownMenuItem
              onClick={() => setIsResettingPassword(true)}
              className="text-base">
              パスワード変更
            </DropdownMenuItem>
            <Dialog className="mx-auto mt-0">
              <DialogTrigger>
                <div className="px-2 py-1.5">アカウント削除</div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>本当にアカウントを削除しますか？</DialogTitle>
                  <DialogDescription className="flex">
                    <Button
                      onClick={() => handleDelete()}
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
      {isResettingPassword ? (
        <>
          <h2 className="text-center mt-8">パスワード変更</h2>
          {user.secret_question ? (
            <SettingPassword
              user={user}
              type="reset"
              setIsResettingPassword={setIsResettingPassword}
            />
          ) : (
            <>
              <div className="mt-16 mx-auto">
                <p className="text-center">パスワードは未登録です。</p>
                <p className="text-center mt-4">パスワードを設定しますか？</p>
              </div>
              <div className="flex justify-around mt-16">
                <Button
                  type="button"
                  onClick={() => setIsResettingPassword(false)}
                  className="border border-button-color bg-button flex items-center">
                  <p>やめる</p>
                </Button>
                <Link href={`/account/setting_password`} className="block">
                  <Button
                    type="button"
                    className="border border-button-color bg-button flex items-center">
                    <p>設定する</p>
                  </Button>
                </Link>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <h2 className="text-center mt-8 sm:mb-16">プロフィール</h2>
          <div className="container justify-around sm:flex">
            <ul className="hidden sm:block space-y-4 border rounded-md p-3 h-fit">
              <li>
                <button onClick={() => editProfile()} className="text-lg">
                  プロフィール編集
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsResettingPassword(true)}
                  className="text-lg">
                  パスワード変更
                </button>
              </li>
              <li>
                <Dialog className="mt-0">
                  <DialogTrigger>
                    <div className="text-lg text-start">アカウント削除</div>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        本当にアカウントを削除しますか？
                      </DialogTitle>
                      <DialogDescription className="flex">
                        <Button
                          onClick={() => handleDelete()}
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
              </li>
            </ul>
            <div>
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
                  <Link href={`/account/user/${user.id}?article=recipes`}>
                    <img
                      src={
                        user.icon_storage_path
                          ? `${process.env.NEXT_PUBLIC_CLOUD_FRONT_URL}/${user.icon_storage_path}`
                          : user.icon_url
                      }
                      className="object-cover w-full h-full block rounded-full"
                      alt="ユーザーアイコン"
                    />
                  </Link>
                )}
              </div>
              <div className="flex mt-8">
                <div className="w-1/3 mr-2">アカウント ID</div>
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
                <div className="w-1/3 mr-2">ユーザー名</div>
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
                <div className="w-1/3 mr-2">ベジタリアンの種類</div>
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
                              {Object.entries(vegetarian_type).map(
                                ([key, value]) => {
                                  return (
                                    <SelectItem
                                      key={key}
                                      value={value}
                                      className="text-color">
                                      {value}
                                    </SelectItem>
                                  )
                                },
                              )}
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
                <div className="w-1/3 mr-2">自己紹介</div>
                {isEdit ? (
                  <div className="flex flex-col">
                    <textarea
                      {...form.register(`introduction`)}
                      rows="5"
                      className="border w-56"
                    />
                    {form.formState.errors.introduction && (
                      <div className="text-red-400">
                        {form.formState.errors.introduction.message}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="w-2/3">{user.introduction}</div>
                )}
              </div>
              {isEdit && (
                <div className="flex space-x-4">
                  <Button
                    type="button"
                    onClick={() => setIsEdit(false)}
                    className="block h-8 mx-auto leading-none	bg-button border-button-color text-xs mt-2 py-2">
                    やめる
                  </Button>
                  <Button
                    type="button"
                    onClick={form.handleSubmit(editComplete)}
                    className="block h-8 mx-auto leading-none	bg-button border-button-color text-xs mt-2 py-2">
                    保存
                  </Button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </main>
  )
}

export default page
