'use client'

import { Button } from '@/components/ui/button'
import { PiNotePencilLight } from 'react-icons/pi'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Popular from '@/components/layouts/recipes/Popular.js'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import { Skeleton } from '@/components/ui/skeleton'

const page = () => {
  const router = useRouter()
  const [user, setUser] = useState()

  useEffect(() => {
    const getUser = async () => {
      axios.get('/sanctum/csrf-cookie')
      axios.get('/api/user').then(res => setUser(res.data))
    }
    getUser()
  }, [])

  const handleRouteCreate = () => {
    if (!user) {
      router.push('/login')
    } else {
      router.push('/food_items/create')
    }
  }

  return (
    <main className="pb-24 max-w-4xl mx-auto min-h-screen">
      <h3 className="text-center text-lg font-bold mt-8 sm:text-4xl sm:tracking-wide sm:mt-16">
        フードアイテム情報
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
      <Tabs defaultValue="popular" className="flex flex-col">
        <TabsList className="w-100 self-center sm:mb-8 sm:space-x-4">
          <TabsTrigger
            value="popular"
            onClick={() => router.push('/food_items')}
            className="sm:text-base">
            人気の投稿
          </TabsTrigger>
          <TabsTrigger
            value="search"
            onClick={() => router.push('/food_items/search?type=vegan')}
            className="sm:text-base">
            ワード検索
          </TabsTrigger>
        </TabsList>
        <TabsContent value="popular">
          <Popular path={'food_items'} />
        </TabsContent>
        <TabsContent value="search">
          <div className="grid grid-cols-2 sm:grid-cols-3 pt-1 pb-8 py-4 gap-4 ">
            <div className="flex flex-col space-y-3">
              <Skeleton className="h-[125px] w-[250px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
            <div className="flex flex-col space-y-3">
              <Skeleton className="h-[125px] w-[250px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
            <div className="flex flex-col space-y-3">
              <Skeleton className="h-[125px] w-[250px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
            <div className="flex flex-col space-y-3">
              <Skeleton className="h-[125px] w-[250px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
            <div className="flex flex-col space-y-3">
              <Skeleton className="h-[125px] w-[250px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
            <div className="flex flex-col space-y-3">
              <Skeleton className="h-[125px] w-[250px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  )
}

export default page
