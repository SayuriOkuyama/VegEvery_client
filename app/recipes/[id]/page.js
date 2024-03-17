import VegeTag from '@/components/layouts/VegeTag'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Image from 'next/image'
import { PiHeart } from 'react-icons/pi'
import { TfiTimer } from 'react-icons/tfi'
import axios from '@/lib/axios'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PiNotePencilLight } from 'react-icons/pi'
import { IconContext } from 'react-icons'

const page = async ({ params }) => {
  const id = params.id

  const getArticles = async () => {
    try {
      const response = await axios.get(`/recipes/${id}`)

      const data = await response.data

      return data
    } catch (err) {
      console.log(err)
    }
  }

  const data = await getArticles()

  const user = data.article.user
  const materials = data.article.materials
  const recipe_steps = data.article.recipe_steps.sort(
    (a, b) => a.order - b.order,
  )
  const commentsToRecipe = data.comments
  const tags = data.article.tags
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

  return (
    <main className="pb-20">
      {user.id === 2 && (
        <Link
          href={`/recipes/edit?id=${data.article.id}`}
          className="fixed top-3 right-3">
          <div className="rounded-full p-1 side_icon">
            <PiNotePencilLight size="28px" />
          </div>
        </Link>
      )}
      <div className="flex justify-center mt-4 mb-2">
        <VegeTag vegeTags={vegeTags} />
      </div>
      <Image
        src={data.article.thumbnail_url}
        width={400}
        height={300}
        alt="レシピ画像1"
        className="object-cover m-auto"
      />
      <h2 className="mx-2 mt-2">{data.article.title}</h2>
      <div className="flex flex-row flex-wrap container space-x-1">
        {tags &&
          tags.map(tag => {
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
            <AvatarImage src={user.icon} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="text-lg self-end">{user.name}</div>
        </div>
        <div className="">
          <div className="flex text-lg ml-auto justify-end">
            <TfiTimer className="flex self-center" />
            <p>{data.article.cooking_time}分</p>
          </div>
          <div className="flex text-lg">
            <PiHeart className="self-center" />
            <p>{data.article.number_of_likes}</p>
          </div>
        </div>
      </div>
      <div className="bg-green py-4">
        <div className="container">
          <h3>{`材料（${data.article.servings}人前）`}</h3>
          {materials.map(material => {
            return (
              <li key={material.id} className="flex justify-between">
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
        {recipe_steps.map(recipe_step => {
          return (
            <div key={recipe_step.id} className="pb-4">
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
          {(commentsToRecipe && commentsToRecipe.length) !== 0 ? (
            <hr className="accent-color-border my-4" />
          ) : (
            <div className="text-center opacity-70 text-sm">
              まだコメントがありません
            </div>
          )}
          {commentsToRecipe &&
            commentsToRecipe.length !== 0 &&
            commentsToRecipe.map(commentToRecipe => {
              return (
                <>
                  <div key={commentToRecipe.id} className="flex">
                    <Avatar className="self-end mr-2">
                      <AvatarImage src={user.icon} alt="@shadcn" />
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
                </>
              )
            })}

          <div className="flex justify-center mt-8 mb-4">
            <Button className="mx-auto bg-button border-button-color">
              コメントする
            </Button>
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
