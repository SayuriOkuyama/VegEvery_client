import ArticleCard from '@/components/layouts/ArticleCard'
import { Button } from '@/components/ui/button'
import { PiNotePencilLight } from 'react-icons/pi'
import { PiMagnifyingGlassLight } from 'react-icons/pi'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'

const page = () => {
  return (
    <main className="pb-24">
      <h3 className="text-center text-lg font-bold mt-8">レシピ一覧</h3>
      <div className="flex justify-end mt-4 mb-1">
        <Button className="py-0 pr-4">
          <div className="flex items-end">
            <PiNotePencilLight className="self-end text-lg text-bold" />
            投稿する
          </div>
        </Button>
      </div>
      <Tabs defaultValue="vegetarian_type" className="flex flex-col">
        <TabsList className="w-100 self-center">
          <TabsTrigger value="vegetarian_type">ベジタリアンの種類</TabsTrigger>
          <TabsTrigger value="tags">タグ・ワード</TabsTrigger>
          <TabsTrigger value="popular">人気のレシピ</TabsTrigger>
        </TabsList>
        <TabsContent value="vegetarian_type">
          <Tabs defaultValue="V" className="flex flex-col">
            <TabsList className="">
              <TabsTrigger value="V" className="rounded-full bg-color-v">
                V
              </TabsTrigger>
              <TabsTrigger value="Ori" className="rounded-full bg-color-ori">
                Ori
              </TabsTrigger>
              <TabsTrigger value="Ovo" className="rounded-full bg-color-ovo">
                Ovo
              </TabsTrigger>
              <TabsTrigger value="Psc" className="rounded-full bg-color-psc">
                Psc
              </TabsTrigger>
              <TabsTrigger value="Lct" className="rounded-full bg-color-lct">
                Lct
              </TabsTrigger>
              <TabsTrigger value="Pol" className="rounded-full bg-color-pol">
                Pol
              </TabsTrigger>
              <TabsTrigger value="flu" className="rounded-full bg-color-flu">
                Flu
              </TabsTrigger>
            </TabsList>
            <TabsContent value="V">
              <div className="grid grid-cols-2 sm:grid-cols-3 pt-1 pb-8 py-4 gap-4 ">
                <ArticleCard />
                <ArticleCard />
                <ArticleCard />
                <ArticleCard />
                <ArticleCard />
                <ArticleCard />
              </div>
            </TabsContent>
            <TabsContent value="Ori">
              <div className="grid grid-cols-2 sm:grid-cols-3 pt-1 pb-8 py-4 gap-4 ">
                <ArticleCard />
                <ArticleCard />
                <ArticleCard />
                <ArticleCard />
                <ArticleCard />
                <ArticleCard />
              </div>
            </TabsContent>
            <TabsContent value="Ovo">
              <div className="grid grid-cols-2 sm:grid-cols-3 pt-1 pb-8 py-4 gap-4 ">
                <ArticleCard />
                <ArticleCard />
                <ArticleCard />
                <ArticleCard />
                <ArticleCard />
                <ArticleCard />
              </div>
            </TabsContent>
            <TabsContent value="Psc">
              <div className="grid grid-cols-2 sm:grid-cols-3 pt-1 pb-8 py-4 gap-4 ">
                <ArticleCard />
                <ArticleCard />
                <ArticleCard />
                <ArticleCard />
                <ArticleCard />
                <ArticleCard />
              </div>
            </TabsContent>
            <TabsContent value="Lct">
              <div className="grid grid-cols-2 sm:grid-cols-3 pt-1 pb-8 py-4 gap-4 ">
                <ArticleCard />
                <ArticleCard />
                <ArticleCard />
                <ArticleCard />
                <ArticleCard />
                <ArticleCard />
              </div>
            </TabsContent>
            <TabsContent value="Lct">
              <div className="grid grid-cols-2 sm:grid-cols-3 pt-1 pb-8 py-4 gap-4 ">
                <ArticleCard />
                <ArticleCard />
                <ArticleCard />
                <ArticleCard />
                <ArticleCard />
                <ArticleCard />
              </div>
            </TabsContent>
            <TabsContent value="Pol">
              <div className="grid grid-cols-2 sm:grid-cols-3 pt-1 pb-8 py-4 gap-4 ">
                <ArticleCard />
                <ArticleCard />
                <ArticleCard />
                <ArticleCard />
                <ArticleCard />
                <ArticleCard />
              </div>
            </TabsContent>
            <TabsContent value="flu">
              <div className="grid grid-cols-2 sm:grid-cols-3 pt-1 pb-8 py-4 gap-4 ">
                <ArticleCard />
                <ArticleCard />
                <ArticleCard />
                <ArticleCard />
                <ArticleCard />
                <ArticleCard />
              </div>
            </TabsContent>
          </Tabs>
        </TabsContent>
        <TabsContent value="tags">
          <div className="flex my-2">
            <PiMagnifyingGlassLight className="self-center text-lg ml-4 mr-2" />
            <Input />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 pt-1 pb-8 py-4 gap-4 ">
            <ArticleCard />
            <ArticleCard />
            <ArticleCard />
            <ArticleCard />
            <ArticleCard />
            <ArticleCard />
          </div>
        </TabsContent>
        <TabsContent value="popular">
          <div className="grid grid-cols-2 sm:grid-cols-3 pt-1 pb-8 py-4 gap-4 ">
            <ArticleCard />
            <ArticleCard />
            <ArticleCard />
            <ArticleCard />
            <ArticleCard />
            <ArticleCard />
          </div>
        </TabsContent>
      </Tabs>
      {/* <div className="grid grid-cols-2 sm:grid-cols-3 pt-1 pb-8 py-4 gap-4 ">
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
      </div> */}
      <div className="flex pb-8">ページネーション</div>
    </main>
  )
}

export default page
