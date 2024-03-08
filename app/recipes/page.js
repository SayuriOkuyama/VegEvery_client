'use client'
import ArticleCard from '@/components/layouts/ArticleCard.js'
import { Button } from '@/components/ui/button'
import { PiNotePencilLight } from 'react-icons/pi'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import VegeTypeSort from '@/components/layouts/recipes/VegeTypeSort.js'
import TagWordSort from '@/components/layouts/recipes/TagWordSort.js'
import axios from '@/lib/axios'
import { useEffect, useState } from 'react'

const page = () => {
  const [articles, setArticles] = useState()

  useEffect(() => {
    const getArticles = async () => {
      try {
        const response = await axios.get('/recipes')

        const data = await response.data
        console.log(data.data)
        setArticles(data.data)
      } catch (err) {}
    }
    getArticles()
  }, [])

  console.log(`articles:${articles}`)

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
      <Tabs defaultValue="vegetarian_type" className="flex flex-col">
        <TabsList className="w-100 self-center">
          <TabsTrigger value="vegetarian_type">ベジタリアンの種類</TabsTrigger>
          <TabsTrigger value="tags">タグ・ワード</TabsTrigger>
          <TabsTrigger value="popular">人気のレシピ</TabsTrigger>
        </TabsList>
        <TabsContent value="vegetarian_type">
          <VegeTypeSort articles={articles} />
        </TabsContent>
        <TabsContent value="tags">
          <TagWordSort articles={articles} />
        </TabsContent>
        <TabsContent value="popular">
          <div className="grid grid-cols-2 sm:grid-cols-3 pt-1 pb-8 py-4 gap-4 ">
            {articles &&
              articles.map(article => {
                return (
                  <ArticleCard
                    key={article.id}
                    title={article.title}
                    thumbnail={article.thumbnail}
                    user={article.user.name}
                    likes={article.number_of_likes}
                    time={article.cooking_time}
                    vegeTags={[
                      article.vegan,
                      article.oriental_vegetarian,
                      article.ovo_vegetarian,
                      article.pescatarian,
                      article.lacto_vegetarian,
                      article.pollo_vegetarian,
                      article.fruitarian,
                      article.other_vegetarian,
                    ]}
                  />
                )
              })}
          </div>
        </TabsContent>
      </Tabs>
      <div className="flex pb-8">ページネーション</div>
    </main>
  )
}

export default page
