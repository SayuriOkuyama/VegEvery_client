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
    id: z.string().min(1, {
      message: '※ 入力が必須です。',
    }),
  })

  const {
    register,
    handleSubmit,
    reset,
    // watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: '',
    },
    mode: 'onChange',
  })

  const submit = async values => {
    setIsSearchingAccount(true)

    const res = await axios.post(`api/user/forget_password/search_user`, values)

    if (res.data.message === 'failed') {
      reset()
      setIsError('id')
    } else {
      setUser(res.data)
      console.log(res.data)

      reset()
      if (res.data.answer) {
        setPage('checkSecretAnswer')
      } else {
        setIsError('noQuestion')
      }
    }
  }
  console.log(isError)

  return (
    <div className="container sm:mt-16">
      {isSearchingAccount ? (
        <div>
          {isError ? (
            <>
              {isError === 'id' ? (
                <div className="text-center mt-16">
                  アカウントが見つかりませんでした。
                </div>
              ) : (
                <div className="text-center mt-16">
                  <p>パスワードは設定されていません。</p>
                  <p>ソーシャルアカウントでログインしてください。</p>
                </div>
              )}
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
            <label htmlFor="id" className="block text-start">
              アカウント ID
            </label>
            <input
              id="id"
              type="text"
              placeholder="VegEvery"
              className="border w-full text-sm pl-1 h-8 focus:text-base"
              {...register(`id`)}
            />
            {errors.id && errors.id.message && <div>{errors.id.message}</div>}
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
