'use client'

import useSWR from 'swr'
import { getArticles } from '@/lib/utils/fetch.js'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useRouter } from 'next/navigation'
import Articles from '@/components/layouts/user/Articles'

const page = ({ params }) => {
  const userId = params.id
  const router = useRouter()
  const { data, error } = useSWR(`/api/user/get/${userId}`, getArticles)

  if (error) return <p>Error: {error.message}</p>
  if (!data) return <p>Loading...</p>
  return (
    <main className="pb-24 mt-8">
      <div className="container flex items-center">
        <div className="h-20 w-20">
          <img
            src={data.icon_url}
            className="object-cover w-full h-full block rounded-full"
            alt="ユーザーアイコン"
          />
        </div>
        <div className="ml-8">
          <p className="text-2xl">{data.name}</p>
          <p className="text-base">@{data.account_id}</p>
        </div>
      </div>
      <Tabs defaultValue="items" className="flex flex-col mt-4">
        <TabsList className="w-100 self-center">
          <TabsTrigger
            value="recipes"
            onClick={() => router.push(`/account/user/${userId}/recipes`)}>
            レシピ
          </TabsTrigger>
          <TabsTrigger
            value="items"
            onClick={() => router.push(`/account/user/${userId}/food_items`)}>
            フードアイテム情報
          </TabsTrigger>
        </TabsList>
        <TabsContent value="recipes">
          {/* <Articles userId={userId} articleType={'recipes'} /> */}
        </TabsContent>
        <TabsContent value="food_items">
          <Articles userId={userId} articleType={'food_items'} />
        </TabsContent>
      </Tabs>
    </main>
  )
}

export default page
