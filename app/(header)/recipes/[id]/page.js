'use client'

import VegeTag from '@/components/layouts/VegeTag'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Image from 'next/image'
import { PiHeart } from 'react-icons/pi'
import { TfiTimer } from 'react-icons/tfi'
import axios from '@/lib/axios'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PiNotePencilLight } from 'react-icons/pi'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import SideButtons from '@/components/layouts/SideButtons'
import useSWR from 'swr'
import { getArticles } from '@/lib/utils/fetch.js'
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
import { useAuth } from '@/hooks/auth'
import { Alert, AlertDescription } from '@/components/ui/alert'
import Loading from '@/components/layouts/Loading'

const page = ({ params }) => {
  const id = params.id
  const { user, csrf } = useAuth()
  const [isAlertVisible, setAlertVisible] = useState(false)

  const [articlesData, setArticlesData] = useState({
    article_id: '',
    title: '',
    servings: '',
    thumbnail_url: '',
    number_of_likes: '',
    user: '',
    materials: [],
    recipe_steps: [],
    commentsToRecipe: '',
    tags: '',
    vegeTags: '',
  })
  const [isOpen, setIsOpen] = useState(false)
  const [bookshelves, setBookshelves] = useState()

  const { data, error } = useSWR(`/api/recipes/${id}`, getArticles)
  // console.log(articlesData)
  useEffect(() => {
    if (data) {
      const recipe_steps = data.article.recipe_steps.sort(
        (a, b) => a.order - b.order,
      )

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
        thumbnail_path: data.article.thumbnail_path,
        cooking_time: data.article.cooking_time,
        number_of_likes: data.article.number_of_likes,
        user: data.article.user,
        materials: data.article.materials,
        recipe_steps: recipe_steps,
        commentsToRecipe: data.comments,
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

  const router = useRouter()

  const onSubmit = async value => {
    const response = await axios.post(
      `/api/recipes/${articlesData.article_id}/comment`,
      { user_id: user.id, text: value.comment },
    )
    // console.log(response.data)
    const newComment = response.data
    setArticlesData(prevState => {
      // console.log({
      //   ...prevState,
      //   commentsToRecipe: [...prevState.commentsToRecipe, newComment],
      // })
      return {
        ...prevState,
        commentsToRecipe: [...prevState.commentsToRecipe, newComment],
      }
    })
    reset()
    setIsOpen(false)
  }

  const handleCommentDelete = async commentId => {
    await axios.delete(`/api/recipes/comment`, { data: { id: commentId } })
    router.replace()
  }

  if (error) return <p>Error: {error.message}</p>
  if (!data || (user && !bookshelves)) return <Loading />

  return (
    <main className="pb-20 max-w-2xl">
      {isAlertVisible && (
        <div className="z-50 w-screen max-w-2xl absolute animate-bounce flex justify-center">
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
      <div className="relative">
        <div className="flex justify-center mt-4 mb-2 sm:my-8">
          <VegeTag vegeTags={articlesData.vegeTags} />
        </div>
        {user && articlesData.user.id === user.id && (
          <Link
            href={`/recipes/edit?id=${articlesData.article_id}`}
            className="fixed top-3 right-3 sm:block sm:absolute sm:top-0 sm:left-3 w-fit">
            <div className="rounded-full p-1 side_icon">
              <PiNotePencilLight size="28px" />
            </div>
          </Link>
        )}
      </div>
      <div className="aspect-[4/3] max-w-xl mx-auto relative">
        <Image
          src={`${process.env.NEXT_PUBLIC_CLOUD_FRONT_URL}/${articlesData.thumbnail_path}`}
          // src={articlesData.thumbnail_url}
          sizes="600px"
          fill
          style={{
            objectFit: 'cover',
          }}
          priority
          alt="レシピサムネイル画像"
        />
      </div>

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
                <Link href={`/recipes/search?search=${tag.name}`}>
                  #{tag.name}
                </Link>
              </div>
            )
          })}
      </div>
      <div className="container flex py-4 justify-between">
        <Link
          href={`/account/user/${articlesData.user.id}?article=recipes`}
          className="flex">
          <Avatar className="self-end mr-2">
            <AvatarImage
              src={
                articlesData.user.icon_storage_path
                  ? `${process.env.NEXT_PUBLIC_CLOUD_FRONT_URL}/${articlesData.user.icon_storage_path}`
                  : articlesData.user.icon_url
              }
              // src={articlesData.user.icon_url}
              alt="ユーザーアイコン"
            />
            <AvatarFallback />
          </Avatar>
          <div className="text-lg sm:text-2xl self-end">
            {articlesData.user.name}
          </div>
        </Link>
        <div>
          <div className="flex text-lg ml-auto justify-end">
            <TfiTimer className="flex self-center" />
            <p> {articlesData.cooking_time} 分</p>
          </div>
          <div className="flex text-lg">
            <PiHeart className="self-center" />
            <p>{articlesData.number_of_likes}</p>
          </div>
        </div>
      </div>
      <div className="bg-green py-4">
        <div className="container">
          <h3 className="sm:text-2xl">{`材料（${articlesData.servings}人前）`}</h3>
          <div className="sm:grid sm:grid-cols-2 sm:gap-4 mt-2">
            {articlesData.materials.map(material => {
              return (
                <li
                  key={material.id}
                  className="flex justify-between border-b-slate-200 border-b">
                  <div className="sm:text-lg">・{material.name}</div>
                  <div>
                    <span className="sm:text-lg">{material.quantity}</span>
                    <span className="sm:text-lg">
                      {material.unit === 'null' ? '' : material.unit}
                    </span>
                  </div>
                </li>
              )
            })}
          </div>
        </div>
      </div>
      <div className="container py-8">
        <h3 className="mb-4 sm:text-2xl">作り方</h3>
        {articlesData.recipe_steps.map(recipe_step => {
          return (
            <div key={recipe_step.id} className="pb-4">
              <hr />
              <p className="sm:text-2xl">{recipe_step.order}.</p>
              {recipe_step.image_url && (
                <div className="aspect-[4/3] max-w-lg mx-auto relative mb-4 mt-2">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_CLOUD_FRONT_URL}/${recipe_step.image_path}`}
                    // src={recipe_step.image_url}
                    sizes="600px"
                    fill
                    style={{
                      objectFit: 'cover',
                    }}
                    alt="レシピ画像"
                  />
                </div>
              )}
              {recipe_step.text && (
                <div className="sm:text-xl py-2 sm:py-4">
                  {recipe_step.text}
                </div>
              )}
            </div>
          )
        })}
      </div>
      <div className="bg-orange py-8">
        <div className="container">
          <h3 className="mb-4 sm:text-2xl">コメント</h3>
          {(articlesData.commentsToRecipe &&
            articlesData.commentsToRecipe.length) !== 0 ? (
            <hr className="accent-color-border my-4" />
          ) : (
            <div className="text-center opacity-70 text-sm sm:text-lg">
              まだコメントがありません
            </div>
          )}
          {articlesData.commentsToRecipe &&
            articlesData.commentsToRecipe.length !== 0 &&
            articlesData.commentsToRecipe.map(commentToRecipe => {
              return (
                <div key={commentToRecipe.id} className="relative">
                  {user && commentToRecipe.user_id === user.id && (
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
                                handleCommentDelete(commentToRecipe.id)
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
                    <Link
                      href={`/account/user/${commentToRecipe.user_id}?article=recipes`}
                      className="flex">
                      <Avatar className="self-end mr-2">
                        <AvatarImage
                          src={
                            commentToRecipe.userIconPath
                              ? `${process.env.NEXT_PUBLIC_CLOUD_FRONT_URL}/${commentToRecipe.userIconPath}`
                              : commentToRecipe.userIcon
                          }
                          // src={commentToRecipe.userIcon}
                          alt="ユーザーアイコン"
                        />
                        <AvatarFallback />
                      </Avatar>
                      <div className="text-md self-center">
                        {commentToRecipe.userName}
                      </div>
                    </Link>
                  </div>
                  <div className="mx-4 my-2">{commentToRecipe.text}</div>
                  <div className="flex text-sm justify-end mr-4">
                    <PiHeart className="self-center" />
                    <p>{commentToRecipe.likes}</p>
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
      <Link href={'/recipes'} className="flex py-8">
        <Button className="mx-auto bg-button border-button-color sm:text-xl">
          一覧に戻る
        </Button>
      </Link>
      <SideButtons
        articleId={articlesData.article_id}
        likeableType="ArticleOfRecipe"
        likes={articlesData.likes}
        setArticlesData={setArticlesData}
        bookshelves={bookshelves}
        setBookshelves={setBookshelves}
        user={user}
        csrf={csrf}
        isAlertVisible={isAlertVisible}
        setAlertVisible={setAlertVisible}
      />
    </main>
  )
}

export default page
