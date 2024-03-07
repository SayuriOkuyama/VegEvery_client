import { Input } from '@/components/ui/input'
import React from 'react'
import { PiMagnifyingGlassLight } from 'react-icons/pi'
import ArticleCard from '@/components/layouts/ArticleCard.js'

const TagWordSort = ({ articles }) => {
  return (
    <>
      <div className="flex my-2">
        <PiMagnifyingGlassLight className="self-center text-lg ml-4 mr-2" />
        <Input />
      </div>
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
    </>
  )
}

export default TagWordSort
