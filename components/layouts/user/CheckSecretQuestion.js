import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import axios from '@/lib/axios'
import Link from 'next/link'
import { useState } from 'react'
import { LiaSpinnerSolid } from 'react-icons/lia'

const CheckSecretQuestion = ({ setPage, setUser }) => {
  const [isSearchingAccount, setIsSearchingAccount] = useState()
  const [isError, setIsError] = useState(false)

  const FormSchema = z.object({
    id: z.string(),
  })

  const {
    register,
    handleSubmit,
    reset,
    // watch,
  } = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: '',
    },
    mode: 'onChange',
  })

  const submit = async values => {
    setIsSearchingAccount(true)
    try {
      const res = await axios.post(
        `api/user/forget_password/search_user`,
        values,
      )
      setUser(res.data)
      reset()
      setPage('resetPassword')
    } catch (error) {
      if (error.response.status !== 401) {
        reset()
        setIsError(true)
      }
    }
  }

  return (
    <div className="container">
      {isSearchingAccount ? (
        <div>
          {isError ? (
            <>
              <div className="text-center mt-16">
                アカウントが見つかりませんでした。
              </div>
              <Button
                type="button"
                onClick={() => {
                  setIsSearchingAccount(false)
                  setIsError(false)
                }}
                className="border border-button-color bg-button flex items-center mt-16 mx-auto">
                <p>戻る</p>
              </Button>
            </>
          ) : (
            <>
              <div className="flex justify-center items-center space-x-1 mt-16">
                <LiaSpinnerSolid className="animate-spin" />
                <p>アカウントを検索しています。</p>
              </div>
            </>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit(submit)} className="mt-8">
          <div className="flex flex-col">
            <label htmlFor="password" className="block text-start">
              アカウント ID
            </label>
            <input
              id="password"
              type="password"
              placeholder="password#123!"
              className="border w-full text-sm pl-1 h-8"
              {...register(`id`)}
            />
          </div>
          <div className="flex justify-around mt-16">
            <>
              <Link href={`/login`} className="block">
                <Button
                  type="button"
                  className="border border-button-color bg-button flex items-center">
                  <p>戻る</p>
                </Button>
              </Link>
              <Button
                type="submit"
                className="border border-button-color bg-button flex items-center">
                <p>確認</p>
              </Button>
            </>
          </div>
        </form>
      )}
    </div>
  )
}

export default CheckSecretQuestion
