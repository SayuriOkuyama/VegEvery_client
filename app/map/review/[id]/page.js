'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Image from 'next/image'
import { PiHeart } from 'react-icons/pi'
import axios from '@/lib/axios'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import SideButtons from '@/components/layouts/SideButtons'
import useSWR from 'swr'
import { getArticles } from '@/lib/utils/fetch.js'
import { GoTrash } from 'react-icons/go'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'
import ShowStars from '@/components/layouts/reviews/ShowStars'
import VegeTag from '@/components/layouts/VegeTag'
import { PiNotePencilLight } from 'react-icons/pi'

const page = ({ params }) => {
  const id = params.id
  const [user, setUser] = useState()

  useEffect(() => {
    const getUser = async () => {
      axios.get('/sanctum/csrf-cookie')
      axios.get('/api/user').then(res => setUser(res.data))
    }
    getUser()
  }, [])

  const [restaurantData, setRestaurantData] = useState({
    name: '',
    stars: '',
    thumbnail_url: '',
    restaurantVegeTags: [],
    reviews: [],
  })
  const [isOpen, setIsOpen] = useState(false)
  console.log(restaurantData)

  const { data, error } = useSWR(`/api/maps/reviews/${id}`, getArticles)
  // console.log(restaurantData)
  useEffect(() => {
    if (data) {
      const restaurantVegeTags = [
        data.restaurant.vegan,
        data.restaurant.oriental_vegetarian,
        data.restaurant.ovo_vegetarian,
        data.restaurant.pescatarian,
        data.restaurant.lacto_vegetarian,
        data.restaurant.pollo_vegetarian,
        data.restaurant.fruitarian,
        data.restaurant.other_vegetarian,
      ]
      setRestaurantData({
        placeId: data.restaurant.place_id,
        name: data.restaurant.name,
        stars: data.restaurant.star,
        thumbnail_url: data.restaurant.thumbnail_url,
        restaurantVegeTags: restaurantVegeTags,
        reviews: data.reviews,
      })
    }
  }, [data])

  const router = useRouter()

  const handleCommentDelete = async reviewId => {
    await axios.delete(`/api/maps/reviews/${reviewId}`)
    router.replace()
  }

  if (error) return <p>Error: {error.message}</p>
  if (!data) return <p>Loading...</p>

  return (
    <main className="pb-20">
      <div className="mt-8 container flex justify-end">
        <ShowStars num={restaurantData.stars} />
      </div>
      <h2 className="text-center my-8">{restaurantData.name}</h2>
      <div className="flex justify-center mb-4">
        <VegeTag vegeTags={restaurantData.restaurantVegeTags} />
      </div>
      <div className="py-8">
        <div className="container">
          <hr className="mb-8" />
          {restaurantData.reviews &&
            restaurantData.reviews.length !== 0 &&
            restaurantData.reviews.map(review => {
              return (
                <div key={review.id} className="relative">
                  <div className="flex mb-4 items-center justify-between">
                    <div className="flex">
                      <Avatar className="self-end mr-2">
                        <AvatarImage
                          src={review.userIcon}
                          alt="ユーザーアイコン"
                        />
                        <AvatarFallback>icon</AvatarFallback>
                      </Avatar>
                      <div className="text-md self-center">
                        {review.userName}
                      </div>
                    </div>
                    <div className="h-fit leading-none">
                      <ShowStars num={review.stars} />
                    </div>
                  </div>
                  <Image
                    src={review.thumbnail_url}
                    width={400}
                    height={300}
                    alt="レビューサムネイル画像"
                    className="object-cover m-auto h-72"
                  />
                  <div className="mx-4 my-4">{review.text}</div>
                  {review.menus.map((menu, index) => {
                    let vegeTags = [
                      menu.vegan,
                      menu.oriental_vegetarian,
                      menu.ovo_vegetarian,
                      menu.pescatarian,
                      menu.lacto_vegetarian,
                      menu.pollo_vegetarian,
                      menu.fruitarian,
                      menu.other_vegetarian,
                    ]
                    return (
                      <React.Fragment key={index}>
                        <div className="container bg-green p-2">
                          <div className="flex">
                            <p>注文したメニュー：</p>
                            <p>{menu.name}</p>
                          </div>
                          <div className="flex">
                            <p>価格：</p>
                            <p>{menu.price}円</p>
                          </div>
                          <div className="flex justify-center mt-4 mb-2">
                            <VegeTag vegeTags={vegeTags} />
                          </div>
                        </div>
                        {index !== review.menus.length - 1 && (
                          <hr className="border-white my-1 mx-2" />
                        )}
                      </React.Fragment>
                    )
                  })}
                  <div className="flex text-sm justify-end mr-4">
                    <PiHeart className="self-center" />
                    <p>{review.likes}</p>
                  </div>
                  {user && review.user_id === user.id && (
                    <div className="flex justify-center mt-2">
                      <Link
                        href={`/maps/reviews/edit?id=${review.id}`}
                        className="block mr-2">
                        <Button className="rounded-full px-2 border-button-color flex bg-button">
                          <PiNotePencilLight size="20px" />
                        </Button>
                      </Link>
                      <Dialog className="mt-0">
                        <DialogTrigger className="rounded-full px-2 border-button-color bg-button">
                          <div className="flex items-center">
                            <GoTrash size={18} />
                          </div>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>レビューを削除しますか？</DialogTitle>
                            <DialogDescription className="flex">
                              <Button
                                onClick={() => handleCommentDelete(review.id)}
                                type="button"
                                className="mx-auto bg-button block py-1 mt-8 border-button-color">
                                削除する
                              </Button>
                              <DialogClose asChild>
                                <Button
                                  type="button"
                                  className="mx-auto bg-button block py-1 mt-8 border-button-color ">
                                  戻る
                                </Button>
                              </DialogClose>
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                    </div>
                  )}
                  <hr className="my-4" />
                </div>
              )
            })}

          <div className="flex justify-center mt-8 mb-4">
            <Popover open={isOpen} onOpenChange={setIsOpen}>
              <PopoverTrigger className="mx-auto bg-button border-button-color rounded-full px-8 py-2">
                レビューを投稿
              </PopoverTrigger>
              <PopoverContent className="h-fit">
                {user ? (
                  <div className="p-4">
                    <p className="text-center mb-8">ログインが必要です</p>
                    <Link href={`/map/review/${restaurantData.placeId}`}>
                      <Button className="block h-8 mx-auto leading-none	bg-button border-button-color mt-2 py-2">
                        レビュー投稿ページへ
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="p-4">
                    <p className="text-center mb-8">ログインが必要です</p>
                    <Link href={'/login'}>
                      <Button className="block h-8 mx-auto leading-none	bg-button border-button-color mt-2 py-2">
                        ログインページへ
                      </Button>
                    </Link>
                  </div>
                )}
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
      <Link href={'/map'} className="flex py-8">
        <Button className="mx-auto bg-button border-button-color">
          マップに戻る
        </Button>
      </Link>
      <SideButtons
        articleId={restaurantData.placeId}
        likeableType="Review"
        likes={restaurantData.likes}
        setRestaurantData={setRestaurantData}
        user={user}
      />
    </main>
  )
}

export default page
