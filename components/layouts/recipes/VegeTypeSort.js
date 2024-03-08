import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React, { useState } from 'react'
import ArticleCard from '@/components/layouts/ArticleCard.js'

const VegeTypeSort = ({ articles }) => {
  const [filteredArticles, setFilteredArticles] = useState(articles)

  const handleVegeTags = value => {
    setFilteredArticles(
      articles.filter(article => {
        const vegeTags = {
          V: article.vegan,
          Ori: article.oriental_vegetarian,
          Ovo: article.ovo_vegetarian,
          Psc: article.pescatarian,
          Lct: article.lacto_vegetarian,
          Pol: article.pollo_vegetarian,
          Flu: article.fruitarian,
          Oth: article.other_vegetarian,
        }
        return vegeTags[value] === 1
      }),
    )
  }

  return (
    <Tabs defaultValue="vegan" className="flex flex-col">
      <TabsList className="">
        <TabsTrigger
          value="vegan"
          className="rounded-full bg-color-v opacity-60 mr-1 text-xs h-8"
          onClick={e => {
            handleVegeTags(e.target.innerText)
          }}>
          V
        </TabsTrigger>
        <TabsTrigger
          value="oriental_vegetarian"
          className="rounded-full bg-color-ori opacity-60 mr-1 text-sm w-8 h-8"
          onClick={e => {
            handleVegeTags(e.target.innerText)
          }}>
          Ori
        </TabsTrigger>
        <TabsTrigger
          value="ovo_vegetarian"
          className="rounded-full bg-color-ovo opacity-60 mr-1 text-sm w-8 h-8"
          onClick={e => {
            handleVegeTags(e.target.innerText)
          }}>
          Ovo
        </TabsTrigger>
        <TabsTrigger
          value="pescatarian"
          className="rounded-full bg-color-psc opacity-60 mr-1 text-sm w-8 h-8"
          onClick={e => {
            handleVegeTags(e.target.innerText)
          }}>
          Psc
        </TabsTrigger>
        <TabsTrigger
          value="Lct"
          className="rounded-full bg-color-lct opacity-60 mr-1 text-sm w-8 h-8"
          onClick={e => {
            handleVegeTags(e.target.innerText)
          }}>
          Lct
        </TabsTrigger>
        <TabsTrigger
          value="pollo_vegetarian"
          className="rounded-full bg-color-pol opacity-60 mr-1 text-sm w-8 h-8"
          onClick={e => {
            handleVegeTags(e.target.innerText)
          }}>
          Pol
        </TabsTrigger>
        <TabsTrigger
          value="fruitarian"
          className="rounded-full bg-color-flu opacity-60 mr-1 text-sm w-8 h-8"
          onClick={e => {
            handleVegeTags(e.target.innerText)
          }}>
          Flu
        </TabsTrigger>
        <TabsTrigger
          value="other_vegetarian"
          className="rounded-full bg-color-oth opacity-60 text-sm w-8 h-8"
          onClick={e => {
            handleVegeTags(e.target.innerText)
          }}>
          Oth
        </TabsTrigger>
      </TabsList>
      <TabsContent value="vegan">
        <div className="grid grid-cols-2 sm:grid-cols-3 pt-1 pb-8 py-4 gap-4 ">
          {filteredArticles &&
            filteredArticles.map(article => {
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
      </TabsContent>
      <TabsContent value="oriental_vegetarian">
        <div className="grid grid-cols-2 sm:grid-cols-3 pt-1 pb-8 py-4 gap-4 ">
          {filteredArticles &&
            filteredArticles.map(article => {
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
      </TabsContent>
      <TabsContent value="ovo_vegetarian">
        <div className="grid grid-cols-2 sm:grid-cols-3 pt-1 pb-8 py-4 gap-4 ">
          {filteredArticles &&
            filteredArticles.map(article => {
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
      </TabsContent>
      <TabsContent value="pescatarian">
        <div className="grid grid-cols-2 sm:grid-cols-3 pt-1 pb-8 py-4 gap-4 ">
          {filteredArticles &&
            filteredArticles.map(article => {
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
      </TabsContent>
      <TabsContent value="Lct">
        <div className="grid grid-cols-2 sm:grid-cols-3 pt-1 pb-8 py-4 gap-4 ">
          {filteredArticles &&
            filteredArticles.map(article => {
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
      </TabsContent>
      <TabsContent value="pollo_vegetarian">
        <div className="grid grid-cols-2 sm:grid-cols-3 pt-1 pb-8 py-4 gap-4 ">
          {filteredArticles &&
            filteredArticles.map(article => {
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
      </TabsContent>
      <TabsContent value="fruitarian">
        <div className="grid grid-cols-2 sm:grid-cols-3 pt-1 pb-8 py-4 gap-4 ">
          {filteredArticles &&
            filteredArticles.map(article => {
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
      </TabsContent>
      <TabsContent value="other_vegetarian">
        <div className="grid grid-cols-2 sm:grid-cols-3 pt-1 pb-8 py-4 gap-4 ">
          {filteredArticles &&
            filteredArticles.map(article => {
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
      </TabsContent>
    </Tabs>
  )
}

export default VegeTypeSort
