'use client'

import { IconContext } from 'react-icons' //IconContextをインポート
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React, { useEffect, useRef } from 'react'
import ArticleCard from '@/components/layouts/ArticleCard.js'
import PaginationParts from '../PaginationParts'
import { Button } from '@/components/ui/button'
import { PiMagnifyingGlassLight } from 'react-icons/pi'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { Skeleton } from '@/components/ui/skeleton'

const VegeTypeSort = ({
  type,
  pageData,
  articles,
  path,
  search,
  isLoading,
}) => {
  const router = useRouter()
  const refInput = useRef()
  // const [isLoading, setIsLoading] = useState()

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

  useEffect(() => {
    if (isLoading) return
    // setIsLoading(true)
    // クエリパラメータを props で受け取り、セット
    if (!search || search === 'null') {
      refInput.current.value = ''
    } else {
      refInput.current.value = search
    }
  }, [search])

  // console.log(search)

  const handleSearch = () => {
    const search = refInput.current.value
    if (type === null) {
      type = 'vegan'
    }

    router.push(`/${path}?type=${type}&search=${search}&page=1`)
  }

  // console.log(isLoading)

  // if (isLoading) return <div>loading</div>

  return (
    <Tabs defaultValue={type ? type : 'vegan'} className="flex flex-col">
      <div className="flex flex-col sm:flex-row justify-center space-x-0 mb-4">
        <TabsList className="w-fit sm:m-0">
          <TabsTrigger
            value="vegan"
            className="rounded-full bg-color-v opacity-60 mr-1 text-xs h-8"
            onClick={() => {
              router.push(`/${path}?type=vegan&search=${search}&page=1`)
            }}>
            V
          </TabsTrigger>
          <TabsTrigger
            value="oriental_vegetarian"
            className="rounded-full bg-color-ori opacity-60 mr-1 text-sm w-8 h-8"
            onClick={() => {
              router.push(
                `/${path}?type=oriental_vegetarian&search=${search}&page=1`,
              )
            }}>
            Ori
          </TabsTrigger>
          <TabsTrigger
            value="ovo_vegetarian"
            className="rounded-full bg-color-ovo opacity-60 mr-1 text-sm w-8 h-8"
            onClick={() => {
              router.push(
                `/${path}?type=ovo_vegetarian&search=${search}&page=1`,
              )
            }}>
            Ovo
          </TabsTrigger>
          <TabsTrigger
            value="pescatarian"
            className="rounded-full bg-color-psc opacity-60 mr-1 text-sm w-8 h-8"
            onClick={() => {
              router.push(`/${path}?type=pescatarian&search=${search}&page=1`)
            }}>
            Psc
          </TabsTrigger>
          <TabsTrigger
            value="lacto_vegetarian"
            className="rounded-full bg-color-lct opacity-60 mr-1 text-sm w-8 h-8"
            onClick={() => {
              router.push(
                `/${path}?type=lacto_vegetarian&search=${search}&page=1`,
              )
            }}>
            Lct
          </TabsTrigger>
          <TabsTrigger
            value="pollo_vegetarian"
            className="rounded-full bg-color-pol opacity-60 mr-1 text-sm w-8 h-8"
            onClick={() => {
              router.push(
                `/${path}?type=pollo_vegetarian&search=${search}&page=1`,
              )
            }}>
            Pol
          </TabsTrigger>
          <TabsTrigger
            value="fruitarian"
            className="rounded-full bg-color-flu opacity-60 mr-1 text-sm w-8 h-8"
            onClick={() => {
              router.push(`/${path}?type=fruitarian&search=${search}&page=1`)
            }}>
            Flu
          </TabsTrigger>
          <TabsTrigger
            value="other_vegetarian"
            className="rounded-full bg-color-oth opacity-60 text-sm w-8 h-8"
            onClick={() => {
              router.push(
                `/${path}?type=other_vegetarian&search=${search}&page=1`,
              )
            }}>
            Oth
          </TabsTrigger>
        </TabsList>
        <div className="container flex items-center justify-end sm:justify-start sm:w-fit sm:pl-2 sm:pr-0">
          <Input
            ref={refInput}
            type="text"
            placeholder="search"
            className="pr-0 block w-64 sm:text-base"
          />
          <Button onClick={() => handleSearch()} className="p-0 ml-0">
            <IconContext.Provider
              value={{ size: '25px', className: 'p-0 ml-0 mr-0' }}>
              <PiMagnifyingGlassLight className="self-center text-lg ml-4 mr-2" />
            </IconContext.Provider>
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 pt-1 pb-8 py-4 gap-4 ">
          <>
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
          </>
        </div>
      ) : (
        <>
          {vegeTags.map(vegeTag => {
            return (
              <TabsContent key={vegeTag} value={vegeTag}>
                {/* {loading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 pt-1 pb-8 py-4 gap-4 ">
                  <>
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
                  </>
                </div>
              ) : ( */}
                <>
                  {articles && (
                    <>
                      {articles.length ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 pt-1 pb-8 py-4 gap-4 ">
                          {articles.map(article => {
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
                      ) : (
                        <div className="text-center mx-auto my-8 text-sm">
                          見つかりませんでした
                        </div>
                      )}
                    </>
                  )}
                </>

                {pageData && (
                  <PaginationParts
                    pageData={pageData}
                    type={type}
                    path={path}
                  />
                )}
              </TabsContent>
            )
          })}
        </>
      )}
    </Tabs>
  )
}

export default VegeTypeSort
