import { Card, CardFooter, CardHeader, CardTitle } from '../ui/card'
import Link from 'next/link'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { PiHeart } from 'react-icons/pi'
import { TfiTimer } from 'react-icons/tfi'
import VegeTag from '@/components/layouts/VegeTag.js'

const ArticleCard = ({
  id,
  title,
  thumbnail,
  user,
  likes,
  time,
  vegeTags,
  tagSize,
  tags,
}) => {
  const url = time ? 'recipes' : 'food_items'

  return (
    <Card className="h-68">
      <Link
        href={`/${url}/${id}`}
        className="h-full flex flex-col justify-between">
        <div className="relative">
          <Image
            src={thumbnail}
            width={300}
            height={300}
            alt="レシピ画像1"
            className="object-cover m-auto"
          />
          <div className="absolute top-0">
            <VegeTag vegeTags={vegeTags} size={tagSize} />
          </div>
          {time && (
            <div className="flex absolute bottom-0 end-0 bg-white text-sm">
              <TfiTimer className="flex self-center" />
              {time}分
            </div>
          )}
        </div>

        <CardHeader className="flex">
          <CardTitle className="text-sm">{title}</CardTitle>
        </CardHeader>

        <CardFooter>
          <div className="flex">
            <Avatar>
              <AvatarImage src={user.icon} alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="text-sm self-end">{user.name}</div>
          </div>
          <div className="flex justify-end">
            <PiHeart className="self-center" />
            <p className="text-xs">{likes}</p>
          </div>
        </CardFooter>
      </Link>
    </Card>
  )
}

export default ArticleCard
