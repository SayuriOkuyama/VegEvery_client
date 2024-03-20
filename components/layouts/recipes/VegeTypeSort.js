import { IconContext } from 'react-icons' //IconContextをインポート
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React, { useEffect, useRef, useState } from 'react'
import ArticleCard from '@/components/layouts/ArticleCard.js'
import PaginationParts from '../PaginationParts'
import { Button } from '@/components/ui/button'
import { PiMagnifyingGlassLight } from 'react-icons/pi'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
// import { CiSearch } from 'react-icons/ci'

const VegeTypeSort = ({ type, pageData, articles, path }) => {
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

  const handleSearch = () => {
    const search = refInput.current.value
    router.push(`/${path}/search?type=${type}&search=${search}&page=1`)
  }

  return (
    <Tabs defaultValue={type} className="flex flex-col">
      <TabsList className="">
        <TabsTrigger
          value="vegan"
          className="rounded-full bg-color-v opacity-60 mr-1 text-xs h-8"
          onClick={() => {
            router.push(`/${path}/search?type=vegan&page=1`)
          }}>
          V
        </TabsTrigger>
        <TabsTrigger
          value="oriental_vegetarian"
          className="rounded-full bg-color-ori opacity-60 mr-1 text-sm w-8 h-8"
          onClick={() => {
            router.push(`/${path}/search?type=oriental_vegetarian&page=1`)
          }}>
          Ori
        </TabsTrigger>
        <TabsTrigger
          value="ovo_vegetarian"
          className="rounded-full bg-color-ovo opacity-60 mr-1 text-sm w-8 h-8"
          onClick={() => {
            router.push(`/${path}/search?type=ovo_vegetarian&page=1`)
          }}>
          Ovo
        </TabsTrigger>
        <TabsTrigger
          value="pescatarian"
          className="rounded-full bg-color-psc opacity-60 mr-1 text-sm w-8 h-8"
          onClick={() => {
            router.push(`/${path}/search?type=pescatarian&page=1`)
          }}>
          Psc
        </TabsTrigger>
        <TabsTrigger
          value="lacto_vegetarian"
          className="rounded-full bg-color-lct opacity-60 mr-1 text-sm w-8 h-8"
          onClick={() => {
            router.push(`/${path}/search?type=lacto_vegetarian&page=1`)
          }}>
          Lct
        </TabsTrigger>
        <TabsTrigger
          value="pollo_vegetarian"
          className="rounded-full bg-color-pol opacity-60 mr-1 text-sm w-8 h-8"
          onClick={() => {
            router.push(`/${path}/search?type=pollo_vegetarian&page=1`)
          }}>
          Pol
        </TabsTrigger>
        <TabsTrigger
          value="fruitarian"
          className="rounded-full bg-color-flu opacity-60 mr-1 text-sm w-8 h-8"
          onClick={() => {
            router.push(`/${path}/search?type=fruitarian&page=1`)
          }}>
          Flu
        </TabsTrigger>
        <TabsTrigger
          value="other_vegetarian"
          className="rounded-full bg-color-oth opacity-60 text-sm w-8 h-8"
          onClick={() => {
            router.push(`/${path}/search?type=other_vegetarian&page=1`)
          }}>
          Oth
        </TabsTrigger>
      </TabsList>
      {vegeTags.map(vegeTag => {
        return (
          <TabsContent key={vegeTag} value={vegeTag}>
            <div className="container flex items-center justify-end">
              {/* <Input ref={refInput} /> */}
              {/* <Button type="submit">
                  <CiSearch />
                </Button> */}
              <Input
                ref={refInput}
                type="text"
                placeholder="search"
                className="pr-0 block w-64"
              />
              {/* <Button type="submit">
                  <CiSearch />
                </Button> */}
              <Button
                // onClick={e =>
                //   router.push(
                //     `/${path}/search?type=${type}&search=${e.target.value}&page=1`,
                //   )
                // }
                onClick={() => handleSearch()}
                className="p-0 ml-0">
                <IconContext.Provider
                  value={{ size: '25px', className: 'p-0 ml-0 mr-0' }}>
                  <PiMagnifyingGlassLight className="self-center text-lg ml-4 mr-2" />
                </IconContext.Provider>
              </Button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 pt-1 pb-8 py-4 gap-4 ">
              {articles &&
                articles.map(article => {
                  return (
                    <ArticleCard
                      key={article.id}
                      tagSize="small"
                      id={article.id}
                      title={article.title}
                      thumbnail={article.thumbnail_url}
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
              <PaginationParts pageData={pageData} type={type} path={path} />
            )}
          </TabsContent>
        )
      })}
    </Tabs>
  )
}

export default VegeTypeSort
