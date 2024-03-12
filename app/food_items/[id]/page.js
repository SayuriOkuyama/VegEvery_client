import VegeTag from '@/components/layouts/VegeTag'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Image from 'next/image'
import { PiHeart } from 'react-icons/pi'
import axios from '@/lib/axios'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const page = async ({ params }) => {
  const id = params.id

  const getArticles = async () => {
    try {
      const response = await axios.get(`/food_items/${id}`)

      const data = await response.data

      return data
    } catch (err) {
      console.log(err)
    }
  }

  const data = await getArticles()

  const user = data.article.user
  const items = data.article.items
  const reports = data.article.reports.sort((a, b) => a.order - b.order)
  const commentsToItem = data.comments
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
      <div className="flex justify-center mt-4 mb-2">
        <VegeTag vegeTags={vegeTags} />
      </div>
      <Image
        src={data.article.thumbnail}
        width={400}
        height={300}
        alt="レシピ画像1"
        className="object-cover m-auto"
      />
      <h2 className="mx-2 mt-2">{data.article.title}</h2>
      <div className="flex flex-row flex-wrap container space-x-1">
        {tags &&
          tags.map(tag => {
            console.log(tag)
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
          <div className="flex text-lg">
            <PiHeart className="self-center" />
            <p>{data.article.number_of_likes}</p>
          </div>
        </div>
      </div>
      <div className="bg-green py-4">
        <ul className="container">
          {/* <h3>{`材料（${data.servings}人前）`}</h3> */}
          {items.map((item, index) => {
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
                {index !== items.length - 1 && <hr className="mx-2 my-4" />}
              </li>
            )
          })}
        </ul>
      </div>
      <div className="container py-8">
        <h3 className="mb-4">レポート</h3>
        {reports.map(report => {
          return (
            <div key={report.id} className="pb-4">
              <p>{report.order}.</p>
              {report.image && (
                <Image
                  src={report.image}
                  width={400}
                  height={300}
                  alt="レシピ画像1"
                  className="object-cover m-auto mb-4 mt-2"
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
          <hr className="accent-color-border my-4" />
          {commentsToItem &&
            commentsToItem.map(commentToItem => {
              return (
                <div key={commentToItem.id}>
                  <div className="flex">
                    <Avatar className="self-end mr-2">
                      <AvatarImage src={commentToItem.userIcon} alt="@shadcn" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="text-md self-center">
                      {commentToItem.userName}
                    </div>
                  </div>
                  <div className="mx-4 my-2">{commentToItem.text}</div>
                  <div className="flex text-sm justify-end mr-4">
                    <PiHeart className="self-center" />
                    <p>{commentToItem.likes}</p>
                  </div>
                  <hr className="accent-color-border my-4" />
                </div>
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
