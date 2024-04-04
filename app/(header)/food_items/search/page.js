'use client'
import { Button } from '@/components/ui/button'
import { PiNotePencilLight } from 'react-icons/pi'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import VegeTypeSort from '@/components/layouts/recipes/VegeTypeSort.js'
import axios from '@/lib/axios'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

const page = () => {
  const [articles, setArticles] = useState()
  const [pageData, setPageData] = useState()
  const router = useRouter()
  const params = useSearchParams()
  const page = params.get('page')
  const type = params.get('type')
  const search = params.get('search')

  // console.log(articles)
  // console.log(pageData)

  useEffect(() => {
    const getArticles = async () => {
      // try {
      const response = await axios.get(
        `/api/food_items/search?type=${type}&search=${search}&page=${page}`,
      )

      const data = await response.data
      setArticles(data.data)
      setPageData(data)
      // } catch (err) {
      //   throw error
      // }
    }
    getArticles()
  }, [page, search, type])

  return (
    <main className="pb-24">
      <h3 className="text-center text-lg font-bold mt-8">フードアイテム情報</h3>
      <div className="flex justify-end mt-4 mb-1">
        <Link href={'/food_items/create'}>
          <Button className="py-0 px-2 mr-2 bg-button border-button-color">
            <div className="flex items-end">
              <PiNotePencilLight className="self-end text-lg text-bold" />
              投稿する
            </div>
          </Button>
        </Link>
      </div>
      <Tabs defaultValue="search" className="flex flex-col">
        <TabsList className="w-100 self-center">
          <TabsTrigger
            value="popular"
            onClick={() => router.push('/food_items?page=1')}>
            人気の投稿
          </TabsTrigger>
          <TabsTrigger
            value="search"
            onClick={() => router.push('/food_items/search?type=vegan&page=1')}>
            タグ・ワード検索
          </TabsTrigger>
        </TabsList>
        <TabsContent value="search">
          <VegeTypeSort
            type={type}
            pageData={pageData}
            articles={articles}
            search={search}
            path={'food_items/search'}
          />
        </TabsContent>
      </Tabs>
    </main>
  )
}

export default page
