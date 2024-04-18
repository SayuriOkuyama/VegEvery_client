'use client'

import { useAuth } from '@/hooks/auth'
import { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import ArticleCard from '@/components/layouts/ArticleCard.js'
import PaginationParts from '@/components/layouts/PaginationParts'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const page = ({ params }) => {
  const { user, csrf, error } = useAuth()
  const router = useRouter()

  if (error) {
    if (error.request.status === 401) {
      router.push('/login')
    }
  }
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
        {bookshelfData && Object.keys(bookshelfData.data).length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 pt-1 pb-8 py-4 gap-4 ">
            {Object.keys(bookshelfData.data).map(key => {
              // console.log(bookshelfData.data[key].user)
              return (
                <ArticleCard
                  key={bookshelfData.data[key].id}
                  tagSize="small"
                  id={bookshelfData.data[key].id}
                  title={bookshelfData.data[key].title}
                  thumbnail={bookshelfData.data[key].thumbnail_url}
                  user={bookshelfData.data[key].user}
                  likes={bookshelfData.data[key].number_of_likes}
                  time={bookshelfData.data[key].cooking_time}
                  vegeTags={[
                    bookshelfData.data[key].vegan,
                    bookshelfData.data[key].oriental_vegetarian,
                    bookshelfData.data[key].ovo_vegetarian,
                    bookshelfData.data[key].pescatarian,
                    bookshelfData.data[key].lacto_vegetarian,
                    bookshelfData.data[key].pollo_vegetarian,
                    bookshelfData.data[key].fruitarian,
                    bookshelfData.data[key].other_vegetarian,
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
            pageData={bookshelfData}
            path={`/bookshelves/${user.id}/${bookshelfData.bookshelf_id}`}
          />
        )}
      </>
    </div>
  )
}

export default page
