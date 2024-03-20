'use client'
import { Button } from '@/components/ui/button'
import { PiNotePencilLight } from 'react-icons/pi'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import VegeTypeSort from '@/components/layouts/recipes/VegeTypeSort.js'
import axios from '@/lib/axios'
import { useEffect, useRef, useState } from 'react'
import Popular from '@/components/layouts/recipes/Popular.js'
import { useRouter, useSearchParams } from 'next/navigation'

const page = () => {
  const [articles, setArticles] = useState()
  const [pageData, setPageData] = useState()
  const router = useRouter()
  const params = useSearchParams()
  const page = params.get('page')
  const type = params.get('type')
  const search = params.get('search')

  console.log(articles)
  console.log(pageData)

  useEffect(() => {
    const getArticles = async () => {
      try {
        const response = await axios.get(
          `/recipes/search?search=${search}&page=${page}`,
        )

        const data = await response.data
        setArticles(data.data)
        setPageData(data)
      } catch (err) {}
    }
    getArticles()
  }, [page, search])

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
      <Tabs defaultValue="search" className="flex flex-col">
        <TabsList className="w-100 self-center">
          <TabsTrigger
            value="popular"
            onClick={() => router.push('/recipes?page=1')}>
            人気のレシピ
          </TabsTrigger>
          <TabsTrigger
            value="search"
            onClick={() => router.push('/recipes/search/vegan?page=1')}>
            タグ・ワード検索
          </TabsTrigger>
        </TabsList>
        <TabsContent value="search">
          <VegeTypeSort
            type={type}
            pageData={pageData}
            articles={articles}
            path={'recipes'}
          />
        </TabsContent>
      </Tabs>
    </main>
  )
}

export default page
