'use client'
import ArticleCard from '@/components/layouts/ArticleCard.js'
import axios from '@/lib/axios'
import { useEffect, useState } from 'react'
import PaginationParts from '../PaginationParts'
import { useSearchParams } from 'next/navigation'

const Popular = () => {
  const [articles, setArticles] = useState([])
  const [pageData, setPageData] = useState()
  const searchParams = useSearchParams()
  const page = searchParams.get('page')

  useEffect(() => {
    console.log('effect')

    const getArticles = async () => {
      try {
        const response = await axios.get(`/recipes?page=${page}`)

        const data = await response.data
        setArticles(data.data)
        setPageData(data)
        console.log(pageData)
      } catch (err) {}
    }
    getArticles()
  }, [])
  console.log(pageData)

  return (
    <>
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
      {pageData && <PaginationParts pageData={pageData} />}
    </>
  )
}

export default Popular
