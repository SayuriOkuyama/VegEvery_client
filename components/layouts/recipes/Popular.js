'use client'
import ArticleCard from '@/components/layouts/ArticleCard.js'
import { useEffect, useState } from 'react'
import PaginationParts from '../PaginationParts'
import { useSearchParams } from 'next/navigation'
import { Skeleton } from '@/components/ui/skeleton'
import useSWR from 'swr'
import { getArticles } from '@/lib/utils/fetch.js'

const Popular = ({ path }) => {
  const [articles, setArticles] = useState([])
  const [pageData, setPageData] = useState()
  const params = useSearchParams()
  const page = params.get('page')
  const type = params.get('type')

  const { data, isLoading } = useSWR(`/api/${path}?page=${page}`, getArticles)

  useEffect(() => {
    if (data) {
      setArticles(data.data)
      setPageData(data)
    }
  }, [data, path, params, page, type])

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 pt-1 pb-8 py-4 gap-4 ">
        {isLoading ? (
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
        ) : (
          <>
            {articles &&
              articles.map(article => {
                return (
                  <ArticleCard
                    key={article.id}
                    tagSize="small"
                    id={article.id}
                    title={article.title}
                    thumbnail={`${process.env.NEXT_PUBLIC_CLOUD_FRONT_URL}/${article.thumbnail_path}`}
                    // thumbnail={article.thumbnail_url}
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
          </>
        )}
      </div>
      {pageData && (
        <PaginationParts pageData={pageData} path={path} type={type} />
      )}
    </>
  )
}

export default Popular
