import { Card, CardFooter, CardHeader, CardTitle } from '../ui/card'
import Link from 'next/link'
import Image from 'next/image'

const ArticleCard = () => {
  return (
    <Card className="h-64">
      <Link href={'/article_of_recipe/1'} className="">
        <Image
          src={'/burger.jpg'}
          width={300}
          height={300}
          alt="レシピ画像1"></Image>
        <CardHeader className="flex">
          <CardTitle className="text-sm">
            ケチャップで【時短】豆腐ハンバーグ弁当
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex justify-between">
          <div>アイコン</div>
          <div>ベジタベル子</div>
        </CardFooter>
      </Link>
    </Card>
  )
}

export default ArticleCard
