import { PiShareFatFill } from 'react-icons/pi'
import { IconContext } from 'react-icons'
import { GoHeart } from 'react-icons/go'
import { GoHeartFill } from 'react-icons/go'
import { useEffect, useState } from 'react'
import axios from '@/lib/axios'

function SideButtons({ articleId, likeableType, likes, setArticlesData }) {
  const [likeState, setLikeState] = useState()

  console.log(likeState)

  useEffect(() => {
    if (likes) {
      const userLikes = likes.find(({ user_id }) => user_id == 1)
      console.log(userLikes)
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
  }, [likes])

  const handleLike = async () => {
    if (likeState && likeState.user_id) {
      try {
        const res = await axios.put(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/likes/${articleId}`,
          likeState,
        )
        console.log(res.data)
        console.log(res.data.like)
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
            user_id: 1,
            like: false,
          })
          setArticlesData(prev => ({
            ...prev,
            number_of_likes: res.data.number_of_likes,
          }))
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div className="fixed bottom-20 right-0 w-12 ">
      <button className="flex flex-col items-center" onClick={handleLike}>
        <IconContext.Provider value={{ size: '24px', color: '#eb829a' }}>
          {likeState && likeState.like ? <GoHeartFill /> : <GoHeart />}
        </IconContext.Provider>
        <div className="text-xs">いいね</div>
      </button>
      <button className="flex flex-col items-center mt-1">
        <IconContext.Provider value={{ size: '24px' }}>
          <PiShareFatFill />
        </IconContext.Provider>
        <div className="text-xs">シェア</div>
      </button>
    </div>
  )
}

export default SideButtons
