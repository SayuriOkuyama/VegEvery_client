'use client'
import { Button } from '@/components/ui/button'
import { PiNotePencilLight } from 'react-icons/pi'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Popular from '@/components/layouts/recipes/Popular.js'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import axios from '@/lib/axios'

const page = () => {
  const router = useRouter()
  const [user, setUser] = useState()

  useEffect(() => {
    const getUser = async () => {
      await axios.get('/sanctum/csrf-cookie')
      await axios.get('/api/user').then(res => setUser(res.data))
    }
    getUser()
  }, [])

  const handleRouteCreate = () => {
    if (!user) {
      router.push('/login')
    } else {
      router.push('/recipes/create')
    }
  }

  return (
    <main className="pb-24 max-w-4xl mx-auto">
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
      <Tabs defaultValue="popular" className="flex flex-col">
        <TabsList className="w-100 self-center sm:mb-8 sm:space-x-4">
          <TabsTrigger
            value="popular"
            onClick={() => router.push('/recipes')}
            className="sm:text-base">
            人気のレシピ
          </TabsTrigger>
          <TabsTrigger
            value="search"
            onClick={() => router.push('/recipes/search')}
            className="sm:text-base">
            ワード検索
          </TabsTrigger>
        </TabsList>
        <TabsContent value="popular">
          <Popular path={'recipes'} />
        </TabsContent>
      </Tabs>
    </main>
  )
}

export default page
