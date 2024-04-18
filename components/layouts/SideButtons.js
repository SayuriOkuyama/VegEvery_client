'use client'

import { PiShareFatFill } from 'react-icons/pi'
import { IconContext } from 'react-icons'
import { GoHeart } from 'react-icons/go'
import { GoHeartFill } from 'react-icons/go'
import { PiBookBookmarkLight } from 'react-icons/pi'
import { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import SelectBookshelf from '@/components/layouts/bookshelves/SelectBookshelf'

function SideButtons({
  articleId,
  likeableType,
  likes,
  setArticlesData,
  bookshelves,
  setBookshelves,
  user,
  csrf,
  setAlertVisible,
}) {
  const [likeState, setLikeState] = useState()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (likes && user) {
      const userLikes = likes.find(({ user_id }) => user_id == user.id)
      if (userLikes) {
        setLikeState(prev => {
          return {
            ...prev,
            id: userLikes.id,
            likeable_type: userLikes.likeable_type,
            likeable_id: userLikes.likeable_id,
            user_id: userLikes.user_id,
            like: true,
          }
        })
      } else {
        setLikeState(prev => {
          return {
            ...prev,
            id: '',
            likeable_type: likeableType,
            likeable_id: articleId,
            user_id: 1,
            like: false,
          }
        })
      }
    }
  }, [likes, user])

  const handleLike = async () => {
    if (likeState && likeState.user_id) {
      // try {
      const res = await axios.put(`api/likes/${articleId}`, likeState)
      // console.log(res.data)
      // console.log(res.data.like)
      if (res.data.like) {
        setLikeState({
          id: res.data.id,
          likeable_type: res.data.likeable_type,
          likeable_id: res.data.likeable_id,
          user_id: res.data.user_id,
          like: true,
        })
        setArticlesData(prev => ({
          ...prev,
          number_of_likes: res.data.number_of_likes,
        }))
      } else {
        setLikeState({
          id: '',
          likeable_type: likeableType,
          likeable_id: articleId,
          user_id: user.id,
          like: false,
        })
        setArticlesData(prev => ({
          ...prev,
          number_of_likes: res.data.number_of_likes,
        }))
      }
      // } catch (error) {
      //   throw error
      // }
    }
  }

  return (
    <div className="fixed bottom-20 right-0 w-14 mr-1">
      {user ? (
        <>
          <button
            className="side_icon flex flex-col items-center rounded-full py-2 px-1 w-full mb-1"
            onClick={handleLike}>
            <IconContext.Provider value={{ size: '24px', color: '#eb829a' }}>
              {likeState && likeState.like ? <GoHeartFill /> : <GoHeart />}
            </IconContext.Provider>
            <div className="text-xs">いいね</div>
          </button>
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger className="side_icon flex flex-col items-center rounded-full py-1 px-1 w-full mb-1">
              <IconContext.Provider value={{ size: '30px' }}>
                <PiBookBookmarkLight />
              </IconContext.Provider>
              <div className="text-xs">保存</div>
            </PopoverTrigger>
            <PopoverContent className="mr-8">
              <SelectBookshelf
                csrf={csrf}
                setIsOpen={setIsOpen}
                user={user}
                likeableType={likeableType}
                articleId={articleId}
                bookshelves={bookshelves}
                setBookshelves={setBookshelves}
                setAlertVisible={setAlertVisible}
              />
            </PopoverContent>
          </Popover>
        </>
      ) : (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger className="flex flex-col items-center">
            <div className="side_icon flex flex-col items-center rounded-full py-2 px-2 mb-1">
              <IconContext.Provider value={{ size: '24px', color: '#eb829a' }}>
                <GoHeart />
              </IconContext.Provider>
              <div className="text-xs">いいね</div>
            </div>
            <div className="side_icon flex flex-col items-center rounded-full py-1 px-3">
              <IconContext.Provider value={{ size: '30px' }}>
                <PiBookBookmarkLight />
              </IconContext.Provider>
              <div className="text-xs">保存</div>
            </div>
          </PopoverTrigger>
          <PopoverContent className="mr-8">
            <div className="p-4">
              <p className="text-center mb-8">ログインが必要です</p>
              <Link href={'/login'}>
                <Button className="block h-8 mx-auto leading-none	bg-button border-button-color mt-2 py-2">
                  ログインページへ
                </Button>
              </Link>
            </div>
          </PopoverContent>
        </Popover>
      )}

      <button className="side_icon flex flex-col items-center mt-1 rounded-full py-2 px-1 w-full">
        <IconContext.Provider value={{ size: '24px' }}>
          <PiShareFatFill />
        </IconContext.Provider>
        <div className="text-xs">シェア</div>
      </button>
    </div>
  )
}

export default SideButtons
