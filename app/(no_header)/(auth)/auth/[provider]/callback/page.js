'use client'

import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import useSWR from 'swr'
import { getArticles } from '@/lib/utils/fetch.js'
import { useContext, useEffect } from 'react'
import Logo from '@/components/ui/Logo'
import { Button } from '@/components/ui/button'
import { FormContext } from '@/contexts/registerProvider'
import Loading from '@/components/layouts/Loading'
import { useAuth } from '@/hooks/auth'
import { useState } from 'react'

const page = ({ params }) => {
  const provider = params.provider
  const query = useSearchParams()
  const state = query.get('state')
  const code = query.get('code')
  const scope = query.get('scope')
  const authuser = query.get('authuser')
  const prompt = query.get('prompt')
  const [, setValue] = useContext(FormContext)
  const router = useRouter()
  const [, setErrors] = useState([])
  // const [errors, setErrors] = useState([])
  const [, setStatus] = useState(null)
  // const [status, setStatus] = useState(null)

  const { data, error } = useSWR(
    `/api/user/auth/google/callback?state=${state}&code=${code}&scope=${scope}&authuser=${authuser}&prompt=${prompt}`,
    getArticles,
  )

  const { login } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/',
  })

  // console.log(errors)
  // console.log(status)

  useEffect(() => {
    if (data) {
      // console.log(data)
      if (data.message === 'registered') {
        login({
          provider: provider,
          providerId: data.socialAccountId,
          setErrors,
          setStatus,
        })
      }
    }
  }, [data])

  const toRegister = () => {
    let name
    if (data.socialUser.nickName) {
      name = data.socialUser.nickName
    } else {
      name = data.socialUser.name
    }
    setValue('name', name)
    setValue('iconUrl', data.socialUser.avatar)
    setValue('provider', provider)
    setValue('providerId', data.socialUser.id)

    router.push('/register/step1')
  }

  if (error) return <p>Error: {error.message}</p>
  if (!data) return <Loading />

  return (
    <>
      {data && data.message === 'noRegistered' && (
        <div className="container mx-auto">
          <div className="pt-8">
            <Logo size="100" />
          </div>
          <div className="mt-16">
            <p className="text-center">追加の情報を登録します</p>
            <Button
              onClick={toRegister}
              className="border flex items-center py-3 px-20 mt-16 mx-auto bg-button border-button-color">
              <p className="leading-none">次へ</p>
            </Button>
          </div>
        </div>
      )}
      {data && data.message === 'registered' && (
        <div className="container mx-auto sm:h-screen">
          <div className="pt-8">
            <Logo size="100" />
          </div>
          <div className="mt-16">
            <p className="text-center">トップページに移動します</p>
          </div>
        </div>
      )}
    </>
  )
}

export default page
