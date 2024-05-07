import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useState } from 'react'
import { LiaSpinnerSolid } from 'react-icons/lia'

const CheckSecretAnswer = ({ setPage, user }) => {
  const [isCheckingAnswer, setIsCheckingAnswer] = useState()
  const [isError, setIsError] = useState(false)

  const FormSchema = z.object({
    answer: z.string().min(1, {
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
      answer: '',
    },
    mode: 'onChange',
  })

  const submit = async values => {
    setIsCheckingAnswer(true)

    if (values.answer === user.answer) {
      reset()
      setPage('resetPassword')
    } else {
      reset()
      setIsError(true)
    }
  }

  return (
    <div className="container">
      {isCheckingAnswer ? (
        <div>
          {isError ? (
            <>
              <div className="text-center mt-16">
                秘密の質問の答えが間違っています。
              </div>
              <Button
                type="button"
                onClick={() => {
                  setIsCheckingAnswer(false)
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
                <p>確認中</p>
              </div>
            </>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit(submit)} className="mt-8">
          <div className="mb-4">
            <p className="mb-2">秘密の質問</p>
            <p>{user.question}</p>
          </div>
          <div className="flex flex-col">
            <label htmlFor="answer" className="block text-start">
              秘密の質問の答え
            </label>
            <input
              id="answer"
              type="text"
              className="border w-full text-sm pl-1 h-8"
              {...register(`answer`)}
            />
            {errors.id && errors.answer.message && (
              <div>{errors.answer.message}</div>
            )}
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

export default CheckSecretAnswer
