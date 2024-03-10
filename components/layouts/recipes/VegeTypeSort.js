import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React, { useEffect, useRef, useState } from 'react'
import ArticleCard from '@/components/layouts/ArticleCard.js'
import PaginationParts from '../PaginationParts'
import { Button } from '@/components/ui/button'
import { PiMagnifyingGlassLight } from 'react-icons/pi'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'

const VegeTypeSort = ({ page, pageData, articles, pageType }) => {
  const router = useRouter()
  const refInput = useRef()

  const vegeTags = [
    'vegan',
    'oriental_vegetarian',
    'ovo_vegetarian',
    'pescatarian',
    'lacto_vegetarian',
    'pollo_vegetarian',
    'fruitarian',
    'other_vegetarian',
  ]

  const url = pageType === 'recipes/search/vegan' ? 'recipes' : 'food_items'

  return (
    <Tabs defaultValue={page} className="flex flex-col">
      <TabsList className="">
        <TabsTrigger
          value="vegan"
          className="rounded-full bg-color-v opacity-60 mr-1 text-xs h-8"
          onClick={() => {
            router.push(`/${url}/search/vegan?page=1`)
          }}>
          V
        </TabsTrigger>
        <TabsTrigger
          value="oriental_vegetarian"
          className="rounded-full bg-color-ori opacity-60 mr-1 text-sm w-8 h-8"
          onClick={() => {
            router.push(`/${url}/search/oriental_vegetarian?page=1`)
          }}>
          Ori
        </TabsTrigger>
        <TabsTrigger
          value="ovo_vegetarian"
          className="rounded-full bg-color-ovo opacity-60 mr-1 text-sm w-8 h-8"
          onClick={() => {
            router.push(`/${url}/search/ovo_vegetarian?page=1`)
          }}>
          Ovo
        </TabsTrigger>
        <TabsTrigger
          value="pescatarian"
          className="rounded-full bg-color-psc opacity-60 mr-1 text-sm w-8 h-8"
          onClick={() => {
            router.push(`/${url}/search/pescatarian?page=1`)
          }}>
          Psc
        </TabsTrigger>
        <TabsTrigger
          value="lacto_vegetarian"
          className="rounded-full bg-color-lct opacity-60 mr-1 text-sm w-8 h-8"
          onClick={() => {
            router.push(`/${url}/search/lacto_vegetarian?page=1`)
          }}>
          Lct
        </TabsTrigger>
        <TabsTrigger
          value="pollo_vegetarian"
          className="rounded-full bg-color-pol opacity-60 mr-1 text-sm w-8 h-8"
          onClick={() => {
            router.push(`/${url}/search/pollo_vegetarian?page=1`)
          }}>
          Pol
        </TabsTrigger>
        <TabsTrigger
          value="fruitarian"
          className="rounded-full bg-color-flu opacity-60 mr-1 text-sm w-8 h-8"
          onClick={() => {
            router.push(`/${url}/search/fruitarian?page=1`)
          }}>
          Flu
        </TabsTrigger>
        <TabsTrigger
          value="other_vegetarian"
          className="rounded-full bg-color-oth opacity-60 text-sm w-8 h-8"
          onClick={() => {
            router.push(`/${url}/search/other_vegetarian?page=1`)
          }}>
          Oth
        </TabsTrigger>
      </TabsList>
      {vegeTags.map(vegeTag => {
        return (
          <TabsContent key={vegeTag} value={vegeTag}>
            <div className="flex my-2">
              <Button onClick={() => handleSearch()}>
                <PiMagnifyingGlassLight className="self-center text-lg ml-4 mr-2" />
              </Button>
              <Input ref={refInput} />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 pt-1 pb-8 py-4 gap-4 ">
              {articles &&
                articles.map(article => {
                  return (
                    <ArticleCard
                      key={article.id}
                      id={article.id}
                      title={article.title}
                      thumbnail={article.thumbnail}
                      user={article.user}
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
            {pageData && (
              <PaginationParts
                pageData={pageData}
                page={page}
                pageType={pageType}
              />
            )}
          </TabsContent>
        )
      })}
    </Tabs>
  )
}

export default VegeTypeSort
