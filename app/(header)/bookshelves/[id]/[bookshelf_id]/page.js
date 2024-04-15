'use client'

import { useAuth } from '@/hooks/auth'
import { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import ArticleCard from '@/components/layouts/ArticleCard.js'
import PaginationParts from '@/components/layouts/PaginationParts'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const page = ({ params }) => {
  const { user, csrf } = useAuth()
  const [bookshelfData, setBookshelfData] = useState()
  const bookshelfId = params.bookshelf_id
  // console.log(bookshelfData)
  useEffect(() => {
    const getArticles = async () => {
      await csrf()
      const res = await axios.get(`/api/bookshelves/bookshelf/${bookshelfId}`)
      // console.log(res.data)
      setBookshelfData(res.data)
    }
    getArticles()
  }, [])

  if (!user || !bookshelfData) return <p>Loading...</p>
  return (
    <div>
      <>
        {bookshelfData && bookshelfData.data.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 pt-1 pb-8 py-4 gap-4 ">
            {bookshelfData.data.map(article => {
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
          <div className="pt-1 pb-8 py-4 ">
            <div className="container mt-32">
              <p className="text-center">お気に入りが保存されていません</p>
              <Link href={`/bookshelves/${user.id}`}>
                <Button className="border border-button-color bg-button flex mx-auto items-center mt-8">
                  <p>本棚一覧にもどる</p>
                </Button>
              </Link>
            </div>
          </div>
        )}
        {bookshelfData && bookshelfData.data && (
          <PaginationParts
            pageData={bookshelfData.articles}
            path={`/bookshelves/${user.id}/${bookshelfData.bookshelf_id}`}
          />
        )}
      </>
    </div>
  )
}

export default page
