'use client'
import { Button } from '@/components/ui/button'
import { PiNotePencilLight } from 'react-icons/pi'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import VegeTypeSort from '@/components/layouts/recipes/VegeTypeSort.js'
import Popular from '../../components/layouts/recipes/Popular.js'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const page = () => {
  const router = useRouter()

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
      <Tabs defaultValue="popular" className="flex flex-col">
        <TabsList className="w-100 self-center">
          <TabsTrigger
            value="popular"
            onClick={() => router.push('/food_items')}>
            人気の投稿
          </TabsTrigger>
          <TabsTrigger
            value="search"
            onClick={() => router.push('/food_items/search/vegan')}>
            タグ・ワード検索
          </TabsTrigger>
        </TabsList>
        <TabsContent value="popular">
          <Popular pageType={'food_items'} />
        </TabsContent>
        <TabsContent value="vegetarian_type">
          <VegeTypeSort pageType={'food_items'} />
        </TabsContent>
      </Tabs>
    </main>
  )
}

export default page
