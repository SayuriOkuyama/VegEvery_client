'use client'

import { Button } from '@/components/ui/button'
import { PiNotePencilLight } from 'react-icons/pi'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import VegeTypeSort from '@/components/layouts/recipes/VegeTypeSort.js'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import useSWR from 'swr'
import { getArticles } from '@/lib/utils/fetch.js'
import { useAuth } from '@/hooks/auth'

const page = () => {
  const [articles, setArticles] = useState()
  const [pageData, setPageData] = useState()
  const router = useRouter()
  const params = useSearchParams()
  const page = params.get('page')
  const type = params.get('type')
  const search = params.get('search')
  const { user } = useAuth()

  // console.log(articles)
  // console.log(pageData)

  const { data, isLoading } = useSWR(
    `/api/recipes/search?type=${type}&search=${search}&page=${page}`,
    getArticles,
  )

  useEffect(() => {
    if (data) {
      setArticles(data.data)
      setPageData(data)
    }
  }, [data, params, page, type])
  // useEffect(() => {
  //   const getArticles = async () => {
  //     // try {
  //     const response = await axios.get(
  //       `/api/recipes/search?type=${type}&search=${search}&page=${page}`,
  //     )

  //     const data = await response.data

  //     setArticles(data.data)
  //     setPageData(data)
  //     // } catch (err) {
  //     //   throw err
  //     // }
  //   }
  //   getArticles()
  // }, [page, search, type])

  const handleRouteCreate = () => {
    if (!user) {
      router.push('/login')
    } else {
      router.push('/recipes/create')
    }
  }

  return (
    <main className="pb-24 max-w-4xl mx-auto min-h-screen">
      <h3 className="text-center text-lg font-bold mt-8 sm:mt-16 sm:text-4xl sm:tracking-wide">
        レシピ
      </h3>
      <div className="flex justify-end mt-4 mb-1">
        <Button
          onClick={handleRouteCreate}
          className="py-0 px-2 mr-2 bg-button border-button-color">
          <div className="flex items-end">
            <PiNotePencilLight className="self-end text-lg text-bold" />
            投稿する
          </div>
        </Button>
      </div>
      <Tabs defaultValue="search" className="flex flex-col">
        <TabsList className="w-100 self-center sm:mb-8 sm:space-x-4">
          <TabsTrigger
            value="popular"
            onClick={() => router.push('/recipes?page=1')}
            className="sm:text-base">
            人気のレシピ
          </TabsTrigger>
          <TabsTrigger
            value="search"
            onClick={() => router.push('/recipes/search/vegan?page=1')}
            className="sm:text-base">
            ワード検索
          </TabsTrigger>
        </TabsList>
        <TabsContent value="search">
          <VegeTypeSort
            type={type}
            pageData={pageData}
            articles={articles}
            path={'recipes/search'}
            search={search}
            isLoading={isLoading}
          />
        </TabsContent>
      </Tabs>
    </main>
  )
}

export default page
