import { Input } from '@/components/ui/input'
import React, { useRef, useState } from 'react'
import { PiMagnifyingGlassLight } from 'react-icons/pi'
import ArticleCard from '@/components/layouts/ArticleCard.js'
import { Button } from '@/components/ui/button'

const TagWordSort = ({ articles }) => {
  const [searchedArticles, setSearchedArticles] = useState(articles)
  const [searchedWord, setSearchedWord] = useState()
  const refInput = useRef()

  const handleSearch = () => {
    // setSearchedWord(refInput.current.value)
    setSearchedArticles(
      articles.filter(article =>
        article.title.includes(refInput.current.value),
      ),
    )
    console.log(searchedArticles)
  }

  return (
    <>
      <div className="flex my-2">
        <Button onClick={() => handleSearch()}>
          <PiMagnifyingGlassLight className="self-center text-lg ml-4 mr-2" />
        </Button>
        <Input ref={refInput} />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 pt-1 pb-8 py-4 gap-4 ">
        {searchedArticles.length !== 0 ? (
          searchedArticles.map(article => {
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
          })
        ) : (
          <div className="mx-auto">見つかりませんでした</div>
        )}
      </div>
    </>
  )
}

export default TagWordSort
