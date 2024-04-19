'use client'

import { useAuth } from '@/hooks/auth'
import { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import ArticleCard from '@/components/layouts/ArticleCard.js'
import PaginationParts from '@/components/layouts/PaginationParts'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import CustomCheckbox from '@/components/ui/CustomCheckbox'
import { PiNotePencilLight } from 'react-icons/pi'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { LiaSpinnerSolid } from 'react-icons/lia'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'

const page = ({ params }) => {
  const { user, csrf, error } = useAuth()
  const router = useRouter()
  const [showCheckbox, setShowCheckbox] = useState(false)
  const [showDeleteMessage, setShowDeleteMessage] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  if (error) {
    if (error.request.status === 401) {
      router.push('/login')
    }
  }
  const [bookshelfData, setBookshelfData] = useState()
  const bookshelfId = params.bookshelf_id
  // console.log(bookshelfData)
  useEffect(() => {
    const getArticles = async () => {
      await csrf()
      const res = await axios.get(`/api/bookshelves/bookshelf/${bookshelfId}`)
      // console.log(res.data)
      setBookshelfData(res.data)
    }
    getArticles()
  }, [])

  const FormSchema = z.object({
    checkboxes: z.array(
      z.object({
        delete: z.boolean(),
        id: z.string(),
        type: z.string(),
      }),
    ),
  })

  const {
    register,
    handleSubmit,
    watch,
    // formState: { errors },
  } = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      checkboxes: [{ delete: false }],
    },
    mode: 'onChange',
  })

  const watcher = watch()
  // console.log(watcher)
  // console.log(errors)

  const deleteFavorite = async values => {
    // console.log(values)

    setIsDeleting(true)
    const request = []
    values.checkboxes.map(value => {
      // console.log(value)
      if (value.delete) {
        request.push({ type: value.type, id: value.id })
      }
    })
    // console.log(request)
    await axios.delete(`/api/bookshelves/delete/favorites/${bookshelfId}`, {
      data: request,
    })

    // console.log(res.data)
    setShowDeleteMessage(true)

    // setIsDeleting(false)
    router.refresh()
  }

  const handleDelete = async () => {
    await axios.delete(`/api/bookshelves/delete/bookshelf/${bookshelfId}`)
    // console.log(res.data)

    router.push(`bookshelves/${user.id}`)
  }

  if (!user || !bookshelfData) return <p>Loading...</p>
  return (
    <main className="pb-20">
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="fixed top-3 right-3 w-10 h-10">
          <button className="flex justify-center items-center rounded-full p-1 side_icon">
            <PiNotePencilLight size="28px" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          <DropdownMenuGroup className="text-color">
            <DropdownMenuItem
              onClick={() => setShowCheckbox(true)}
              className="text-base">
              保存した投稿の削除
            </DropdownMenuItem>
            {/* <DropdownMenuItem value="changeName">本棚名の変更</DropdownMenuItem> */}
            <Dialog className="mx-auto mt-0">
              <DialogTrigger className="">
                <div className="px-2 py-1.5">本棚の削除</div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>本棚を削除してよろしいですか？</DialogTitle>
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
      <h2 className="text-center mt-8 mb-4">{bookshelfData.bookshelf.name}</h2>
      <>
        {bookshelfData &&
        Object.keys(bookshelfData.pagination.data).length > 0 ? (
          <form className="space-y-6">
            {showCheckbox && (
              <div className="text-center">削除する投稿を選択してください</div>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-3 pt-1 pb-8 py-4 gap-4 ">
              {Object.keys(bookshelfData.pagination.data).map(key => {
                const articleType = bookshelfData.pagination.data[key]
                  .cooking_time
                  ? 'recipe'
                  : 'Item'
                return (
                  <div
                    key={bookshelfData.pagination.data[key].id}
                    className="relative">
                    <ArticleCard
                      tagSize="small"
                      id={bookshelfData.pagination.data[key].id}
                      title={bookshelfData.pagination.data[key].title}
                      thumbnail={
                        bookshelfData.pagination.data[key].thumbnail_url
                      }
                      user={bookshelfData.pagination.data[key].user}
                      likes={bookshelfData.pagination.data[key].number_of_likes}
                      time={bookshelfData.pagination.data[key].cooking_time}
                      vegeTags={[
                        bookshelfData.pagination.data[key].vegan,
                        bookshelfData.pagination.data[key].oriental_vegetarian,
                        bookshelfData.pagination.data[key].ovo_vegetarian,
                        bookshelfData.pagination.data[key].pescatarian,
                        bookshelfData.pagination.data[key].lacto_vegetarian,
                        bookshelfData.pagination.data[key].pollo_vegetarian,
                        bookshelfData.pagination.data[key].fruitarian,
                        bookshelfData.pagination.data[key].other_vegetarian,
                      ]}
                    />
                    {showCheckbox && (
                      <div className="absolute right-0 top-0 w-full h-full bg-black-20">
                        <div className="flex mx-auto mb-2">
                          <div className="flex items-center">
                            <CustomCheckbox
                              register={register}
                              id={key}
                              watcher={watcher}
                            />
                            <input
                              hidden
                              {...register(`checkboxes.${key}.id`)}
                              value={bookshelfData.pagination.data[key].id}
                            />
                            <input
                              hidden
                              {...register(`checkboxes.${key}.type`)}
                              value={articleType}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
            {showCheckbox && (
              <>
                <div className="flex">
                  <Button
                    type="button"
                    onClick={() => setShowCheckbox(false)}
                    className="border border-button-color bg-button flex mx-auto items-center">
                    <p>やめる</p>
                  </Button>
                  <Button
                    onClick={handleSubmit(deleteFavorite)}
                    type="submit"
                    className="border border-button-color bg-button flex mx-auto items-center">
                    <p>削除</p>
                  </Button>
                </div>
              </>
            )}
            {bookshelfData && (
              <PaginationParts
                pageData={bookshelfData.pagination}
                path={`/bookshelves/${user.id}/${bookshelfData.bookshelf_id}`}
              />
            )}
            {isDeleting && (
              <div className="fixed top-0 left-0 flex justify-center z-50 w-full h-full">
                <div className="mt-48">
                  <div className="bg-white mt-32 p-8 rounded-sm shadow-md">
                    {showDeleteMessage ? (
                      <div className="">削除しました</div>
                    ) : (
                      <div className="flex items-center space-x-1">
                        <LiaSpinnerSolid className="animate-spin" />
                        <p>削除しています</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </form>
        ) : (
          <>
            <div className="pt-1 pb-8 py-4 ">
              <div className="container mt-32">
                <p className="text-center">お気に入りが保存されていません</p>
                <Link href={`/bookshelves/${user.id}`}>
                  <Button className="border border-button-color bg-button flex mx-auto items-center mt-8">
                    <p>本棚一覧にもどる</p>
                  </Button>
                </Link>
              </div>
            </div>
            {bookshelfData && (
              <PaginationParts
                pageData={bookshelfData.pagination}
                path={`/bookshelves/${user.id}/${bookshelfData.bookshelf_id}`}
              />
            )}
          </>
        )}
      </>
    </main>
  )
}

export default page
