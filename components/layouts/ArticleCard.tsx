import { Card, CardFooter, CardHeader, CardTitle } from '../ui/card'
import Link from 'next/link'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { PiHeart } from 'react-icons/pi'
import { TfiTimer } from 'react-icons/tfi'

const ArticleCard = () => {
  return (
    <Card className="h-60">
      <Link
        href={'/article_of_recipe/1'}
        className="h-full flex flex-col justify-between">
        <div className="relative">
          <Image
            src={'/burger.jpg'}
            width={300}
            height={300}
            alt="レシピ画像1"
            className="object-cover m-auto"
          />
          <div className="flex absolute top-0">
            <Avatar className="bg-color-v w-6 h-6 justify-center items-center text-sm">
              V
            </Avatar>
            <Avatar className="bg-color-ori w-6 h-6 justify-center items-center text-sm">
              Ori
            </Avatar>
            <Avatar className="bg-color-ovo w-6 h-6 justify-center items-center text-sm">
              Ovo
            </Avatar>
            <Avatar className="bg-color-psc w-6 h-6 justify-center items-center text-sm">
              Psc
            </Avatar>
            <Avatar className="bg-color-lct w-6 h-6 justify-center items-center text-sm">
              Lct
            </Avatar>
            <Avatar className="bg-color-pol w-6 h-6 justify-center items-center text-sm">
              Pol
            </Avatar>
            <Avatar className="bg-color-flu w-6 h-6 justify-center items-center text-sm">
              Flu
            </Avatar>
          </div>
          <div className="flex absolute bottom-0 end-0 bg-white text-sm">
            <TfiTimer className="flex self-center" />
            30分
          </div>
        </div>
        <CardHeader className="flex">
          <CardTitle className="text-sm">
            ケチャップで【時短】豆腐ハンバーグ弁当
          </CardTitle>
        </CardHeader>
        <CardFooter>
          <div className="flex">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="text-sm self-end">ベジタベル子</div>
          </div>
          <div className="flex justify-end">
            <PiHeart className="self-center" />
            <p className="text-xs">63</p>
          </div>
        </CardFooter>
      </Link>
    </Card>
  )
}

export default ArticleCard
