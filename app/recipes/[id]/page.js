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
import { useRouter } from 'next/navigation'

const page = ({ params }) => {
  const id = params.id
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

  useEffect(() => {
    const getArticles = async () => {
      try {
        const response = await axios.get(`/recipes/${id}`)

        const data = await response.data

        console.log(data)

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
          cooking_time: data.article.cooking_time,
          number_of_likes: data.article.number_of_likes,
          user: data.article.user,
          materials: data.article.materials,
          recipe_steps: recipe_steps,
          commentsToRecipe: data.comments,
          tags: data.article.tags,
          vegeTags: vegeTags,
        })
      } catch (err) {
        console.log(err)
      }
    }

    const data = getArticles()
  }, [])
  console.log(articlesData)

  const { register, reset, handleSubmit, control, getValues } = useForm({
    // resolver: zodResolver(formSchema),
    defaultValues: {
      comment: '',
    },
  })
  const form = useForm()
  const router = useRouter()

  const onSubmit = async value => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/recipes/${articlesData.article_id}/comment`,
      { text: value.comment },
    )
    console.log(response.data)
    const newComment = response.data
    setArticlesData(prevState => {
      console.log({
        ...prevState,
        commentsToRecipe: [...prevState.commentsToRecipe, newComment],
      })
      return {
        ...prevState,
        commentsToRecipe: [...prevState.commentsToRecipe, newComment],
      }
    })
    reset()
    setIsOpen(false)
  }

  return (
    <main className="pb-20">
      {articlesData.user.id === 1 && (
        <Link
          href={`/recipes/edit?id=${articlesData.article_id}`}
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
        alt="レシピ画像1"
        className="object-cover m-auto"
      />
      <h2 className="mx-2 mt-2">{articlesData.title}</h2>
      <div className="flex flex-row flex-wrap container space-x-1">
        {articlesData.tags &&
          articlesData.tags.map(tag => {
            return (
              <div
                key={tag.id}
                className="border rounded-full text-sm px-1 mt-2">
                <Link href={`/recipes/search?search=${tag.name}`}>
                  #{tag.name}
                </Link>
              </div>
            )
          })}
      </div>
      <div className="container flex py-4 justify-between">
        <div className="flex">
          <Avatar className="self-end mr-2">
            <AvatarImage src={articlesData.user.icon} alt="@shadcn" />
            <AvatarFallback></AvatarFallback>
          </Avatar>
          <div className="text-lg self-end">{articlesData.user.name}</div>
        </div>
        <div className="">
          <div className="flex text-lg ml-auto justify-end">
            <TfiTimer className="flex self-center" />
            <p>{articlesData.cooking_time}分</p>
          </div>
          <div className="flex text-lg">
            <PiHeart className="self-center" />
            <p>{articlesData.number_of_likes}</p>
          </div>
        </div>
      </div>
      <div className="bg-green py-4">
        <div className="container">
          <h3>{`材料（${articlesData.servings}人前）`}</h3>
          {articlesData.materials.map(material => {
            return (
              <li
                key={material.id}
                className="flex justify-between border-b-slate-200 border-b">
                <div>・{material.name}</div>
                <div>
                  <span>{material.quantity}</span>
                  <span>{material.unit}</span>
                </div>
              </li>
            )
          })}
        </div>
      </div>
      <div className="container py-8">
        <h3 className="mb-4">作り方</h3>
        {articlesData.recipe_steps.map(recipe_step => {
          return (
            <div key={recipe_step.id} className="pb-4">
              <hr className="" />
              <p>{recipe_step.order}.</p>
              {recipe_step.image_url && (
                <Image
                  src={recipe_step.image_url}
                  width={400}
                  height={300}
                  alt="レシピ画像1"
                  className="object-cover m-auto mb-4 mt-2"
                />
              )}
              {recipe_step.text && <div>{recipe_step.text}</div>}
            </div>
          )
        })}
      </div>
      <div className="bg-orange py-8">
        <div className="container">
          <h3 className="mb-4">コメント</h3>
          {(articlesData.commentsToRecipe &&
            articlesData.commentsToRecipe.length) !== 0 ? (
            <hr className="accent-color-border my-4" />
          ) : (
            <div className="text-center opacity-70 text-sm">
              まだコメントがありません
            </div>
          )}
          {articlesData.commentsToRecipe &&
            articlesData.commentsToRecipe.length !== 0 &&
            articlesData.commentsToRecipe.map(commentToRecipe => {
              return (
                <div key={commentToRecipe.id}>
                  <div className="flex">
                    <Avatar className="self-end mr-2">
                      <AvatarImage
                        src={commentToRecipe.userIcon}
                        alt="@shadcn"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="text-md self-center">
                      {commentToRecipe.userName}
                    </div>
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
      <Link href={'/recipes'} className="flex py-8">
        <Button className="mx-auto bg-button border-button-color">
          一覧に戻る
        </Button>
      </Link>
    </main>
  )
}

export default page
