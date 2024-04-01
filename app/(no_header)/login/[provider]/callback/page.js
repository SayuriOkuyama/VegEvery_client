'use client'

// import axios from '@/lib/axios'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
// import React, { useEffect } from 'react'
import useSWR from 'swr'
import { getArticles } from '@/lib/utils/fetch.js'
import { useEffect } from 'react'
import Logo from '@/components/ui/Logo'

const page = ({ provider }) => {
  const query = useSearchParams()
  const state = query.get('state')
  const code = query.get('code')
  const scope = query.get('scope')
  const authuser = query.get('authuser')
  const prompt = query.get('prompt')

  const router = useRouter()

  const { data, error } = useSWR(
    `/login/google/callback?state=${state}&code=${code}&scope=${scope}&authuser=${authuser}&prompt=${prompt}`,
    getArticles,
  )

  useEffect(() => {
    if (data) {
      if (data.message === 'login') {
        router.push('/')
      }
    }
  }, [data])

  // useEffect(() => {
  //   // const { code, state } = req.query.searchParams

  //   const sendData = async () => {
  //     const res = await axios.get(
  //       `/login/google/callback?state=${state}&code=${code}&scope=${scope}&authuser=${authuser}&prompt=${prompt}`,
  //     )
  //     console.log(res)
  //   }
  //   sendData()
  // }, [code])

  if (error) return <p>Error: {error.message}</p>
  if (!data) return <p>Loading...</p>

  return (
    <>
      {data && data.message === 'noRegistered' && (
        <>
          <div className="mt-20">
            <Logo size="100" />
          </div>
          <div>
            <p>アカウントが見つかりませんでした</p>
            <p>{provider} アカウントで新規登録しますか？</p>
          </div>
        </>
      )}
    </>
  )
}

export default page
