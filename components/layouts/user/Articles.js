'use client'

import useSWR from 'swr'
import PaginationParts from '../PaginationParts'
import ArticleCard from '@/components/layouts/ArticleCard.js'
import { useSearchParams } from 'next/navigation'
import { getArticles } from '@/lib/utils/fetch.js'
// import { useState } from 'react'

const Articles = ({ userId, articleType }) => {
  const params = useSearchParams()
  const page = params.get('page')
  // const [articles, setArticles] = useState([])
  // const [pageData, setPageData] = useState()

  const { data } = useSWR(
    `/api/user/articles/${userId}?articleType=${articleType}&page=${page}`,
    getArticles,
  )

  if (!data) return <p>Loading...</p>

  return (
    <>
      {data && data.data && data.data.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 pt-1 pb-8 py-4 gap-4 ">
            {data.data.map(article => {
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
        </>
      ) : (
        <div className="container flex justify-center mt-8 mb-16">
          <div className="text-center">
            {articleType === 'recipes'
              ? 'レシピがありません。'
              : 'フードアイテム情報がありません。'}
          </div>
        </div>
      )}

      {data && data.data.length > 0 && (
        <PaginationParts
          pageData={data}
          path={`account/user/${userId}/${articleType}`}
        />
      )}
    </>
  )
}

export default Articles
