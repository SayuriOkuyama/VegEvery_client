import ArticleCard from '@/components/layouts/ArticleCard.js'
import { Kite_One } from 'next/font/google'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import axios from '@/lib/axios'

const kiteOne = Kite_One({
  subsets: ['latin'],
  weight: ['400'],
})

async function getRecipes() {
  try {
    const response = await axios.get(`/recipes?page=top`, {
      headers: {
        'Cache-Control': 'no-store',
      },
    })

    const data = await response.data
    console.log(data)
    return data
  } catch (err) {}
}

export default async function Home() {
  const articlesOfRecipe = await getRecipes()
  console.log(articlesOfRecipe)

  return (
    <main className="pb-24">
      <h2 className={`${kiteOne.className} text-center py-8`}>
        for Every Vegetarian
      </h2>
      <section>
        <h3 className="text-center text-lg font-bold">レシピ</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 pt-4 pb-8 py-4 gap-4 ">
          {articlesOfRecipe &&
            articlesOfRecipe.map(articleOfRecipe => {
              return (
                <ArticleCard
                  key={articleOfRecipe.id}
                  title={articleOfRecipe.title}
                  thumbnail={articleOfRecipe.thumbnail}
                  user={articleOfRecipe.user.name}
                  likes={articleOfRecipe.number_of_likes}
                  time={articleOfRecipe.cooking_time}
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
          <Link href={'/recipes'} className="flex pb-8">
            <Button className="mx-auto bg-button border-button-color">
              もっと見る
            </Button>
          </Link>
        </div>
      </section>
      <section className="bg-green pt-8">
        <h3 className="text-center text-lg font-bold">フードアイテム情報</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 pt-8 pb-8 py-4 gap-4 ">
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
        </div>
        <div>
          <Link href={'/food_items'} className="flex pb-8">
            <Button className="mx-auto bg-button border-button-color">
              もっと見る
            </Button>
          </Link>
        </div>
      </section>
      <section className="pt-8">
        <h3 className="text-center text-lg font-bold">レストラン Map</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 pt-4 pb-20 py-8 gap-4 ">
          マップ
        </div>
      </section>
      <div>X アカウント</div>
    </main>
  )
}
