import ArticleCard from '@/components/layouts/ArticleCard.js'
import { Kite_One } from 'next/font/google'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const kiteOne = Kite_One({
  subsets: ['latin'],
  weight: ['400'],
})

export default function Home() {
  return (
    <main className="pb-24">
      <h2 className="text-center py-8">for Every Vegetarian</h2>
      <section>
        <h3 className="text-center text-lg font-bold">レシピ</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 pt-4 pb-8 py-4 gap-4 ">
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
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
