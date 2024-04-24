import ArticleCard from '@/components/layouts/ArticleCard.js'
import { Kite_One } from 'next/font/google'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import axios from '@/lib/axios'
import Header from '@/components/layouts/Header'
import Logo from '@/components/ui/Logo'

const kiteOne = Kite_One({
  subsets: ['latin'],
  weight: ['400'],
})

async function fetchRecipes() {
  // try {
  const response = await axios.get(`/api/recipes?page=top`, {
    headers: {
      'Cache-Control': 'no-store',
    },
  })

  const data = await response.data
  return data
  // } catch (err) {
  //   throw err
  // }
}

async function fetchItems() {
  // try {
  const response = await axios.get(`/api/food_items?page=top`, {
    headers: {
      'Cache-Control': 'no-store',
    },
  })

  const data = await response.data
  return data
  // } catch (err) {
  //   throw err
  // }
}

export default async function Home() {
  const articlesOfRecipes = await fetchRecipes()
  const articlesOfItems = await fetchItems()
  // console.log(articlesOfItems)

  return (
    <>
      <Header />
      <main className="pb-24">
        <div className="hidden sm:block mt-8 sm:mt-16">
          <Logo size="100" />
        </div>
        <h2
          className={`${kiteOne.className} text-center py-8 sm:text-5xl sm:my-16`}>
          for Every Vegetarian
        </h2>
        <section className=" max-w-4xl mx-auto">
          <h3 className="text-center text-lg font-bold sm:text-start sm:text-3xl">
            レシピ
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 pt-4 pb-8 py-4 gap-4 ">
            {articlesOfRecipes &&
              articlesOfRecipes.map(articleOfRecipe => {
                return (
                  <ArticleCard
                    key={articleOfRecipe.id}
                    tagSize="small"
                    id={articleOfRecipe.id}
                    title={articleOfRecipe.title}
                    thumbnail={articleOfRecipe.thumbnail_url}
                    user={articleOfRecipe.user}
                    likes={articleOfRecipe.number_of_likes}
                    time={articleOfRecipe.cooking_time}
                    tags={articleOfRecipe.tags}
                    vegeTags={[
                      articleOfRecipe.vegan,
                      articleOfRecipe.oriental_vegetarian,
                      articleOfRecipe.ovo_vegetarian,
                      articleOfRecipe.pescatarian,
                      articleOfRecipe.lacto_vegetarian,
                      articleOfRecipe.pollo_vegetarian,
                      articleOfRecipe.fruitarian,
                      articleOfRecipe.other_vegetarian,
                    ]}
                  />
                )
              })}
          </div>
          <div>
            <Link href={'/recipes'} className="flex pb-8 sm:my-8 w-fit mx-auto">
              <Button className="mx-auto bg-button border-button-color">
                もっと見る
              </Button>
            </Link>
          </div>
        </section>
        <section className="bg-green pt-8 sm:pt-16">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-center text-lg font-bold sm:text-start sm:text-3xl">
              フードアイテム情報
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 pt-8 pb-8 py-4 gap-4 ">
              {articlesOfItems &&
                articlesOfItems.map(articlesOfItem => {
                  return (
                    <ArticleCard
                      key={articlesOfItem.id}
                      tagSize="small"
                      id={articlesOfItem.id}
                      title={articlesOfItem.title}
                      thumbnail={articlesOfItem.thumbnail_url}
                      user={articlesOfItem.user}
                      likes={articlesOfItem.number_of_likes}
                      time={articlesOfItem.cooking_time}
                      tags={articlesOfItem.tags}
                      vegeTags={[
                        articlesOfItem.vegan,
                        articlesOfItem.oriental_vegetarian,
                        articlesOfItem.ovo_vegetarian,
                        articlesOfItem.pescatarian,
                        articlesOfItem.lacto_vegetarian,
                        articlesOfItem.pollo_vegetarian,
                        articlesOfItem.fruitarian,
                        articlesOfItem.other_vegetarian,
                      ]}
                    />
                  )
                })}
            </div>
            <div>
              <Link
                href={'/food_items'}
                className="flex pb-8 sm:pb-16 sm:pt-8 w-fit mx-auto">
                <Button className="mx-auto bg-button border-button-color">
                  もっと見る
                </Button>
              </Link>
            </div>
          </div>
        </section>
        <section className="pt-8 sm:pt-16 max-w-4xl mx-auto">
          <h3 className="text-center text-lg font-bold sm:text-start sm:text-3xl">
            レストラン Map
          </h3>
          <div className="mt-8 w-full h-80 bg-slate-50 flex justify-center items-center max-w-lg mx-auto">
            <Link href={'/map'} className="flex items-center relative bg-map">
              <Button className="mx-auto bg-button border-button-color">
                現在地から探す
              </Button>
            </Link>
          </div>
        </section>
        {/* <div>X アカウント</div> */}
      </main>
    </>
  )
}
