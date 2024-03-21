import { useRouter } from 'next/navigation'
import React from 'react'

async function CommentSubmit() {
  const router = useRouter()
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/${data.article.id}/comment`,
    { userId: 2, text: data },
  )
  console.log(response)
  // router.push(`/recipes/${data.article.id}`)

  // return <div>CommentSubmit</div>
}

export default CommentSubmit
