'use client'

import axios from '@/lib/axios'
import { useRouter, useSearchParams } from 'next/navigation'
// import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const page = req => {
  // const router = useRouter()
  console.log(req)
  const router = useRouter()

  const query = useSearchParams()
  const state = query.get('state')
  const code = query.get('code')
  const scope = query.get('scope')
  const authuser = query.get('authuser')
  const prompt = query.get('prompt')

  useEffect(() => {
    // const { code, state } = req.query.searchParams

    const sendData = async () => {
      const res = await axios.get(
        `/login/google/callback?state=${state}&code=${code}&scope=${scope}&authuser=${authuser}&prompt=${prompt}`,
      )
      console.log(res)
    }
    sendData()
  }, [])

  return <div>callback</div>
}

export default page
