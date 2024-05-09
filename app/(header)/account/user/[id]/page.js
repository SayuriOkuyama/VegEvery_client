'use client'

import useSWR from 'swr'
import { getArticles } from '@/lib/utils/fetch.js'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useRouter, useSearchParams } from 'next/navigation'
import Articles from '@/components/layouts/user/Articles'
import Loading from '@/components/layouts/Loading'

const page = ({ params }) => {
  const userId = params.id
  const router = useRouter()
  const query = useSearchParams()
  const articleType = query.get('article')
  const { data, error } = useSWR(`/api/user/get/${userId}`, getArticles)

  if (error) return <p>Error: {error.message}</p>
  if (!data) return <Loading />

  return (
    <main className="pb-24 mt-8 sm:min-h-[60vh]">
      <div className="container flex items-center">
        <div className="h-20 w-20">
          <img
            src={
              data.icon_storage_path
                ? `${process.env.NEXT_PUBLIC_CLOUD_FRONT_URL}/${data.icon_storage_path}`
                : data.icon_url
            }
            className="object-cover w-full h-full block rounded-full"
            alt="ユーザーアイコン"
          />
        </div>
        <div className="ml-8">
          <p className="text-2xl">{data.name}</p>
          <p className="text-base">@{data.account_id}</p>
        </div>
      </div>
      <div className="mx-auto w-4/5 bg-green mt-4 rounded-sm p-4">
        {data.introduction ? (
          <div>{data.introduction}</div>
        ) : (
          <div className="text-center">自己紹介がありません。</div>
        )}
      </div>
      <Tabs defaultValue={articleType} className="flex flex-col mt-4">
        <TabsList className="w-100 self-center">
          <TabsTrigger
            value="recipes"
            onClick={() =>
              router.push(`/account/user/${userId}?article=recipes`)
            }>
            レシピ
          </TabsTrigger>
          <TabsTrigger
            value="food_items"
            onClick={() =>
              router.push(`/account/user/${userId}?article=food_items`)
            }>
            フードアイテム情報
          </TabsTrigger>
        </TabsList>
        <TabsContent value="recipes">
          <Articles userId={userId} articleType={articleType} />
        </TabsContent>
        <TabsContent value="food_items">
          <Articles userId={userId} articleType={articleType} />
        </TabsContent>
      </Tabs>
    </main>
  )
}

export default page
