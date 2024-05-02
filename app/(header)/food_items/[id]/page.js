'use client'

import VegeTag from '@/components/layouts/VegeTag'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Image from 'next/image'
import { PiHeart } from 'react-icons/pi'
import axios from '@/lib/axios'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PiNotePencilLight } from 'react-icons/pi'
import { useEffect, useState } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { getArticles } from '@/lib/utils/fetch.js'
import useSWR from 'swr'
import { GoTrash } from 'react-icons/go'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'
import { useRouter } from 'next/navigation'
import SideButtons from '@/components/layouts/SideButtons'
import { useAuth } from '@/hooks/auth'
import { Alert, AlertDescription } from '@/components/ui/alert'

const page = ({ params }) => {
  const id = params.id
  const { user, csrf } = useAuth()
  const [articlesData, setArticlesData] = useState({
    article_id: '',
    title: '',
    thumbnail_url: '',
    number_of_likes: '',
    user: '',
    items: [],
    reports: [],
    commentsToItem: [],
    tags: '',
    vegeTags: '',
  })
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const [bookshelves, setBookshelves] = useState()
  const [isAlertVisible, setAlertVisible] = useState(false)

  const { data, error } = useSWR(`/api/food_items/${id}`, getArticles)

  useEffect(() => {
    if (data) {
      const reports = data.article.reports.sort((a, b) => a.order - b.order)

      const vegeTags = [
        data.article.vegan,
        data.article.oriental_vegetarian,
        data.article.ovo_vegetarian,
        data.article.pescatarian,
        data.article.lacto_vegetarian,
        data.article.pollo_vegetarian,
        data.article.fruitarian,
        data.article.other_vegetarian,
      ]

      setArticlesData({
        article_id: data.article.id,
        title: data.article.title,
        servings: data.article.servings,
        thumbnail_url: data.article.thumbnail_url,
        cooking_time: data.article.cooking_time,
        number_of_likes: data.article.number_of_likes,
        user: data.article.user,
        items: data.article.items,
        reports: reports,
        commentsToItem: data.comments,
        tags: data.article.tags,
        vegeTags: vegeTags,
        likes: data.likes,
      })
    }
  }, [data])

  useEffect(() => {
    if (user) {
      const getBookshelves = async () => {
        await csrf()
        const res = await axios.get(`/api/bookshelves/${user.id}`)

        setBookshelves(res.data.data)
      }
      getBookshelves()
    }
  }, [user])

  const commentFormSchema = z.object({
    comment: z
      .string()
      .min(1, {
        message: '※ 入力が必須です。',
      })
      .max(225, {
        message: '※ 225 文字以内で入力してください。',
      }),
  })

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(commentFormSchema),
    defaultValues: {
      comment: '',
    },
    mode: 'onChange', // リアルタイムで入力値を取得する
  })

  const onSubmit = async value => {
    const response = await axios.post(
      `/api/food_items/${articlesData.article_id}/comment`,
      { user_id: user.id, text: value.comment },
    )
    // console.log(response.data)
    const newComment = response.data
    setArticlesData(prevState => {
      // console.log({
      //   ...prevState,
      //   commentsToItem: [...prevState.commentsToItem, newComment],
      // })
      return {
        ...prevState,
        commentsToItem: [...prevState.commentsToItem, newComment],
      }
    })
    reset()
    setIsOpen(false)
  }

  const handleCommentDelete = async commentId => {
    await axios.delete(`/api/food_items/comment`, { data: { id: commentId } })
    router.replace()
  }

  if (error) return <p>Error: {error.message}</p>
  if (!data) return <p>Loading...</p>

  return (
    <main className="pb-20 max-w-2xl">
      {isAlertVisible && (
        <div className="w-screen max-w-2xl z-50 absolute animate-bounce flex justify-center">
          <button
            className="block w-fit"
            onClick={() => setAlertVisible(false)}>
            <Alert>
              <AlertDescription className="text-color text-center text-base">
                保存しました
              </AlertDescription>
            </Alert>
          </button>
        </div>
      )}
      {user && articlesData.user.id === user.id && (
        <Link
          href={`/food_items/edit?id=${articlesData.article_id}`}
          className="fixed top-3 right-3 sm:block sm:absolute sm:top-0 sm:left-3 w-fit">
          <div className="rounded-full p-1 side_icon">
            <PiNotePencilLight size="28px" />
          </div>
        </Link>
      )}
      <div className="relative">
        <div className="flex justify-center mt-4 mb-2 sm:my-8">
          <VegeTag vegeTags={articlesData.vegeTags} />
        </div>
        {user && articlesData.user.id === user.id && (
          <Link
            href={`/food_items/edit?id=${articlesData.article_id}`}
            className="fixed top-3 right-3 sm:block w-fit sm:absolute sm:top-0 sm:left-3">
            <div className="rounded-full p-1 side_icon">
              <PiNotePencilLight size="28px" />
            </div>
          </Link>
        )}
      </div>
      {articlesData.thumbnail_url && (
        <div className="aspect-[4/3] max-w-xl mx-auto relative">
          <Image
            src={articlesData.thumbnail_url}
            sizes="600px"
            fill
            style={{
              objectFit: 'cover',
            }}
            priority
            alt="フードアイテムサムネイル画像"
          />
        </div>
      )}
      <h2 className="mx-2 mt-2 sm:mx-8 sm:my-8 sm:text-3xl">
        {articlesData.title}
      </h2>
      <div className="flex flex-row flex-wrap container space-x-1">
        {articlesData.tags &&
          articlesData.tags.map(tag => {
            return (
              <div
                key={tag.id}
                className="border rounded-full text-sm sm:text-base px-1 mt-2">
                #{tag.name}
              </div>
            )
          })}
      </div>
      <div className="container flex py-4 justify-between">
        <Link
          href={`/account/user/${articlesData.user.id}?article=food_items`}
          className="flex">
          <Avatar className="self-end mr-2">
            <AvatarImage
              src={articlesData.user.icon_url}
              alt="ユーザーアイコン"
            />
            <AvatarFallback />
          </Avatar>
          <div className="text-lg sm:text-2xl self-end">
            {articlesData.user.name}
          </div>
        </Link>
        <div className="flex text-lg">
          <PiHeart className="self-center" />
          <p>{articlesData.number_of_likes}</p>
        </div>
      </div>
      <div className="bg-green py-4">
        <ul className="container">
          {articlesData.items.map((item, index) => {
            return (
              <li key={item.id} className="list-none">
                <div className="border-button-color-b w-fit">
                  <div className="font-bold sm:text-2xl">{item.name}</div>
                </div>
                <div className="flex justify-end">
                  <span className="my-1 text-xs ml-auto border rounded-full border-button-color bg-button px-1 text-end">
                    レシピを探す
                  </span>
                </div>
                <div>
                  <div className=" py-2">
                    <p className="font-bold text-sm sm:text-lg">購入場所</p>
                    <p className="text-sm sm:text-lg">{item.where_to_buy}</p>
                  </div>
                  <div className="flex justify-between py-2">
                    <p className="font-bold text-sm sm:text-lg">購入価格</p>
                    <p className="text-sm sm:text-lg">{item.price}</p>
                  </div>
                </div>
                {index !== articlesData.items.length - 1 && (
                  <hr className="mx-2 my-4" />
                )}
              </li>
            )
          })}
        </ul>
      </div>
      <div className="container py-8">
        <h3 className="mb-4 sm:text-2xl">レポート</h3>
        {articlesData.reports.map(report => {
          return (
            <div key={report.id} className="pb-4">
              <hr />
              <p className="sm:text-2xl">{report.order}.</p>
              {report.image_url && (
                <div className="aspect-[4/3] max-w-lg mx-auto relative mb-4 mt-2">
                  <Image
                    src={report.image_url}
                    sizes="600px"
                    fill
                    style={{
                      objectFit: 'cover',
                    }}
                    alt="アイテム画像"
                  />
                </div>
              )}
              {report.text && (
                <div className="sm:text-xl  py-2 sm:py-4">{report.text}</div>
              )}
            </div>
          )
        })}
      </div>
      <div className="bg-orange py-8">
        <div className="container">
          <h3 className="mb-4 sm:text-2xl">コメント</h3>
          {(articlesData.commentsToItem &&
            articlesData.commentsToItem.length) !== 0 ? (
            <hr className="accent-color-border my-4" />
          ) : (
            <div className="text-center opacity-70 text-sm sm:text-lg">
              まだコメントがありません
            </div>
          )}
          {articlesData.commentsToItem &&
            articlesData.commentsToItem.map(commentToItem => {
              return (
                <div key={commentToItem.id} className="relative">
                  {commentToItem.user_id === 1 && (
                    <Dialog className="mx-auto mt-0">
                      <DialogTrigger className="absolute right-4">
                        <div className=" bg-white/80 p-1 rounded-full">
                          <GoTrash />
                        </div>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>コメントを削除しますか？</DialogTitle>
                          <DialogDescription className="flex">
                            <Button
                              onClick={() =>
                                handleCommentDelete(commentToItem.id)
                              }
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
                  )}
                  <div className="flex">
                    <Avatar className="self-end mr-2">
                      <AvatarImage src={commentToItem.userIcon} alt="@shadcn" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="text-md self-center text-sm">
                      {commentToItem.userName}
                    </div>
                  </div>
                  <div className="mx-4 my-2 text-sm">{commentToItem.text}</div>
                  <div className="flex text-sm justify-end mr-4">
                    <PiHeart className="self-center" />
                    <p>{commentToItem.likes}</p>
                  </div>
                  <hr className="accent-color-border my-4" />
                </div>
              )
            })}
          <div className="flex justify-center mt-8 mb-4">
            <Popover open={isOpen} onOpenChange={setIsOpen}>
              <PopoverTrigger className="mx-auto bg-button border-button-color rounded-full px-8 py-2 sm:text-xl">
                コメントする
              </PopoverTrigger>
              <PopoverContent className="h-fit">
                {user ? (
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <textarea
                      cols="30"
                      rows="10"
                      className="outline-none"
                      {...register(`comment`)}
                      placeholder="コメントを入力"
                    />
                    {errors.comment && (
                      <div className="text-red-400">
                        {errors.comment.message}
                      </div>
                    )}
                    <Button
                      type="submit"
                      className="block h-8 sm:h-12 mx-auto leading-none	bg-button border-button-color text-xs mt-2 py-2 sm:text-xl">
                      送信
                    </Button>
                  </form>
                ) : (
                  <div className="p-4">
                    <p className="text-center mb-8 sm:text-xl">
                      ログインが必要です
                    </p>
                    <Link href={'/login'}>
                      <Button className="block h-8 sm:h-12 mx-auto leading-none	bg-button border-button-color mt-2 py-2 sm:text-xl">
                        ログインページへ
                      </Button>
                    </Link>
                  </div>
                )}
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
      <Link href={'/food_items'} className="flex py-8">
        <Button className="mx-auto bg-button border-button-color">
          一覧に戻る
        </Button>
      </Link>
      <SideButtons
        articleId={articlesData.article_id}
        likeableType="ArticleOfItem"
        likes={articlesData.likes}
        setArticlesData={setArticlesData}
        user={user}
        bookshelves={bookshelves}
        setBookshelves={setBookshelves}
        csrf={csrf}
        isAlertVisible={isAlertVisible}
        setAlertVisible={setAlertVisible}
      />
    </main>
  )
}

export default page
