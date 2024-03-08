'use client'
import ArticleCard from '@/components/layouts/ArticleCard.js'
import { Button } from '@/components/ui/button'
import { PiNotePencilLight } from 'react-icons/pi'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import VegeTypeSort from '@/components/layouts/recipes/VegeTypeSort.js'
import TagWordSort from '@/components/layouts/recipes/TagWordSort.js'
import axios from '@/lib/axios'
import { useEffect, useState } from 'react'
import PaginationParts from '@/components/layouts/PaginationParts.js'
import Popular from '../../components/layouts/recipes/Popular.js'
import { useRouter } from 'next/navigation'

const page = () => {
  const router = useRouter()
  // const [articles, setArticles] = useState()
  // const [pageData, setPageData] = useState()

  // useEffect(() => {
  //   const getArticles = async () => {
  //     try {
  //       const response = await axios.get('/recipes')

  //       const data = await response.data
  //       console.log(data.data)
  //       setArticles(data.data)
  //       setPageData(data)
  //     } catch (err) {}
  //   }
  //   getArticles()
  // }, [])

  // console.log(`articles:${articles}`)

  return (
    <main className="pb-24">
      <h3 className="text-center text-lg font-bold mt-8">レシピ一覧</h3>
      <div className="flex justify-end mt-4 mb-1">
        <Button className="py-0 px-2 mr-2 bg-button border-button-color">
          <div className="flex items-end">
            <PiNotePencilLight className="self-end text-lg text-bold" />
            投稿する
          </div>
        </Button>
      </div>
      <Tabs defaultValue="popular" className="flex flex-col">
        <TabsList className="w-100 self-center">
          <TabsTrigger value="popular" onClick={() => router.push('/recipes')}>
            人気のレシピ
          </TabsTrigger>
          <TabsTrigger
            value="search"
            onClick={() => router.push('/recipes/search/vegan')}>
            タグ・ワード検索
          </TabsTrigger>
        </TabsList>
        <TabsContent value="vegetarian_type">
          <VegeTypeSort />
        </TabsContent>
        <TabsContent value="tags">
          <TagWordSort />
        </TabsContent>
        <TabsContent value="popular">
          <Popular />
        </TabsContent>
      </Tabs>
    </main>
  )
}

export default page
