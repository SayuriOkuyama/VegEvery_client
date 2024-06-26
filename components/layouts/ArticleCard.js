'use client'

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
}) => {
  const url = time ? 'recipes' : 'food_items'

  return (
    <Card className="h-68">
      <Link
        href={`/${url}/${id}`}
        className="h-full flex flex-col justify-between">
        <div className="aspect-[4/3] relative">
          <Image
            src={thumbnail}
            sizes="600px"
            fill
            alt="サムネイル画像"
            style={{
              objectFit: 'cover',
            }}
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
              <AvatarImage
                src={
                  user.icon_storage_path
                    ? `${process.env.NEXT_PUBLIC_CLOUD_FRONT_URL}/${user.icon_storage_path}`
                    : user.icon_url
                }
                alt="ユーザーアイコン"
                // src={user.icon_url}
              />
              {/* <AvatarImage
                src="https://static.vegevery.my-raga-bhakti.com/recipes/thumbnail/pasta.jpg"
                alt="ユーザーアイコン"
              /> */}
              <AvatarFallback />
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
