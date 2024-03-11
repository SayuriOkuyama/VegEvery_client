import VegeTag from '@/components/layouts/VegeTag'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Image from 'next/image'
import { PiHeart } from 'react-icons/pi'
import { TfiTimer } from 'react-icons/tfi'
import axios from '@/lib/axios'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useSearchParams } from 'next/navigation'

const page = async ({ params }) => {
  const id = params.id

  const getArticles = async () => {
    try {
      // const response = await axios.get(`/recipes/${article_id}`)
      const response = await axios.get(`/recipes/${id}`)

      const data = await response.data
      console.log(data)

      return data
    } catch (err) {
      console.log(err)
    }
  }
  const data = await getArticles()
  // console.log(data)
  // const user = data.user
  // const materials = data.materials
  // const recipe_steps = data.recipe_steps.sort((a, b) => a.order - b.order)
  // const comments_to_recipe = data.comments_to_recipe
  // const tags = data.tags
  // const vegeTags = [
  //   data.vegan,
  //   data.oriental_vegetarian,
  //   data.ovo_vegetarian,
  //   data.pescatarian,
  //   data.lacto_vegetarian,
  //   data.pollo_vegetarian,
  //   data.fruitarian,
  //   data.other_vegetarian,
  // ]

  return (
    <main className="pb-20">
      {/* <div className="flex justify-center mt-4 mb-2">
        <VegeTag vegeTags={vegeTags} />
      </div>
      <Image
        src={data.thumbnail}
        width={400}
        height={300}
        alt="レシピ画像1"
        className="object-cover m-auto"
      />
      <h2 className="mx-2 mt-2">{data.title}</h2>
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
            <p>{data.cooking_time}分</p>
          </div>
          <div className="flex text-lg">
            <PiHeart className="self-center" />
            <p>{data.number_of_likes}</p>
          </div>
        </div>
      </div>
      <div className="bg-green py-4">
        <div className="container">
          <h3>{`材料（${data.servings}人前）`}</h3>
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
              {recipe_step.image && (
                <Image
                  src={recipe_step.image}
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
          <hr className="accent-color-border my-4" />
          {comments_to_recipe &&
            comments_to_recipe.map(comment_to_recipe => {
              return (
                <>
                  <div key={comment_to_recipe.id} className="flex">
                    <Avatar className="self-end mr-2">
                      <AvatarImage src={user.icon} alt="@shadcn" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="text-md self-center">{user.name}</div>
                  </div>
                  <div className="mx-4 my-2">{comment_to_recipe.text}</div>
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
      </Link> */}
    </main>
  )
}

export default page
