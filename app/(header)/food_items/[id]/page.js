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

const page = ({ params }) => {
  const id = params.id
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

  const { data, error } = useSWR(`food_items/${id}`, getArticles)
  console.log(data)

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
      })
    }
  }, [data])

  const { register, reset, handleSubmit, control, getValues } = useForm({
    // resolver: zodResolver(formSchema),
    defaultValues: {
      comment: '',
    },
  })

  const onSubmit = async value => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/food_items/${articlesData.article_id}/comment`,
      { text: value.comment },
    )
    console.log(response.data)
    const newComment = response.data
    setArticlesData(prevState => {
      console.log({
        ...prevState,
        commentsToItem: [...prevState.commentsToItem, newComment],
      })
      return {
        ...prevState,
        commentsToItem: [...prevState.commentsToItem, newComment],
      }
    })
    reset()
    setIsOpen(false)
  }

  const handleCommentDelete = async commentId => {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/food_items/comment`,
      { data: { id: commentId } },
    )
    router.replace()
  }

  if (error) return <p>Error: {error.message}</p>
  if (!data) return <p>Loading...</p>

  return (
    <main className="pb-20">
      {articlesData.user.id === 1 && (
        <Link
          href={`/food_items/edit?id=${articlesData.article_id}`}
          className="fixed top-3 right-3">
          <div className="rounded-full p-1 side_icon">
            <PiNotePencilLight size="28px" />
          </div>
        </Link>
      )}
      <div className="flex justify-center mt-4 mb-2">
        <VegeTag vegeTags={articlesData.vegeTags} />
      </div>
      <Image
        src={articlesData.thumbnail_url}
        width={400}
        height={300}
        alt="フードアイテム画像"
        className="object-cover m-auto h-72"
      />
      <h2 className="mx-2 mt-2">{articlesData.title}</h2>
      <div className="flex flex-row flex-wrap container space-x-1">
        {articlesData.tags &&
          articlesData.tags.map(tag => {
            return (
              <div
                key={tag.id}
                className="border rounded-full text-xs px-1 mt-2">
                #{tag.name}
              </div>
            )
          })}
      </div>
      <div className="container flex py-4 justify-between">
        <div className="flex">
          <Avatar className="self-end mr-2">
            <AvatarImage src={articlesData.user.icon} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="text-lg self-end">{articlesData.user.name}</div>
        </div>
        <div className="">
          <div className="flex text-lg">
            <PiHeart className="self-center" />
            <p>{articlesData.number_of_likes}</p>
          </div>
        </div>
      </div>
      <div className="bg-green py-4">
        <ul className="container">
          {articlesData.items.map((item, index) => {
            return (
              <li key={item.id} className="list-none">
                <div className="border-button-color-b w-fit">
                  <div className="font-bold">{item.name}</div>
                </div>
                <div className="flex justify-end">
                  <span className="my-1 text-xs ml-auto border rounded-full border-button-color bg-button px-1 text-end">
                    レシピを探す
                  </span>
                </div>
                <div>
                  <div className=" py-2">
                    <p className="font-bold text-sm">購入場所</p>
                    <p className="text-sm">{item.where_to_buy}</p>
                  </div>
                  <div className="flex justify-between py-2">
                    <p className="font-bold text-sm">購入価格</p>
                    <p className="text-sm">{item.price}</p>
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
        <h3 className="mb-4">レポート</h3>
        {articlesData.reports.map(report => {
          return (
            <div key={report.id} className="pb-4">
              <hr className="" />
              <p>{report.order}.</p>
              {report.image_url && (
                <Image
                  src={report.image_url}
                  width={400}
                  height={300}
                  alt="レシピ画像1"
                  className="object-cover m-auto mb-4 mt-2 h-60"
                />
              )}
              {report.text && <div>{report.text}</div>}
            </div>
          )
        })}
      </div>
      <div className="bg-orange py-8">
        <div className="container">
          <h3 className="mb-4">コメント</h3>
          {(articlesData.commentsToItem &&
            articlesData.commentsToItem.length) !== 0 ? (
            <hr className="accent-color-border my-4" />
          ) : (
            <div className="text-center opacity-70 text-sm">
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
              <PopoverTrigger className="mx-auto bg-button border-button-color rounded-full px-8 py-2">
                コメントする
              </PopoverTrigger>
              <PopoverContent className="h-fit">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                    className="outline-none"
                    {...register(`comment`)}
                    placeholder="コメントを入力"></textarea>
                  <Button
                    type="submit"
                    className="block h-8 mx-auto leading-none	bg-button border-button-color text-xs mt-2 py-2">
                    送信
                  </Button>
                </form>
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
    </main>
  )
}

export default page
