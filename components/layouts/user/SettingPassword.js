'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import axios from '@/lib/axios'
import { useState } from 'react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import SettingSecret from '@/components/layouts/user/SettingSecret'

const SettingPassword = ({ user, type, setIsResettingPassword, setPage }) => {
  const [isComplete, setIsComplete] = useState(false)
  const [settingPage, setSettingPage] = useState('secret')

  const FormSchema = z
    .object({
      password: z.string(),
      passwordConfirmation: z.string(),
      secretQuestion: z.string(),
      secretAnswer: z.string(),
    })
    .superRefine((data, ctx) => {
      if (
        !data.password ||
        data.password.length < 8 ||
        data.password.length > 225 ||
        !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+={}[\]:;"'<>,.?/~`-]).{8,}$/.test(
          data.password,
        )
      ) {
        ctx.addIssue({
          path: ['password'],
          message:
            'パスワードは半角英字、数字、記号を含めた 8 文字以上で入力してください。',
          code: z.ZodIssueCode.custom,
        })
      }
      if (data.password !== data.passwordConfirmation) {
        ctx.addIssue({
          message: 'パスワードが異なります。',
          path: ['passwordConfirmation'],
          code: z.ZodIssueCode.custom,
        })
      }
      if (!user.secretQuestion) {
        if (
          !data.secretQuestion ||
          data.secretQuestion.length < 2 ||
          data.secretQuestion.length > 100
        ) {
          if (!data.secretQuestion || data.secretQuestion.length < 2) {
            ctx.addIssue({
              message: '2 文字以上で入力してください。',
              path: ['secretQuestion'],
              code: z.ZodIssueCode.custom,
            })
          }
          if (data.secretQuestion.length > 100) {
            ctx.addIssue({
              message: '100 文字以内で入力してください。',
              path: ['secretQuestion'],
              code: z.ZodIssueCode.custom,
            })
          }
        }
        if (
          !data.secretAnswer ||
          data.secretAnswer.length < 1 ||
          data.secretAnswer.length > 100
        ) {
          if (!data.secretAnswer || data.secretAnswer.length < 1) {
            ctx.addIssue({
              message: '入力が必須です。',
              path: ['secretAnswer'],
              code: z.ZodIssueCode.custom,
            })
          }
          if (data.secretAnswer.length > 100) {
            ctx.addIssue({
              message: '100 文字以内で入力してください。',
              path: ['secretAnswer'],
              code: z.ZodIssueCode.custom,
            })
          }
        }
      }
    })

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: '',
      passwordConfirmation: '',
    },
    mode: 'onChange',
  })
  const watcher = watch()

  const submit = async values => {
    if (type === 'forget') {
      await axios.post(`api/user/forget_password/reset/${user.id}`, values)
      setIsComplete(true)
    } else {
      await axios.post(`api/user/password/reset/${user.id}`, values)
      setIsComplete(true)
    }
  }

  return (
    <main className="pb-24 max-w-md">
      {isComplete && (
        <div className="w-screen h-svh mt-32 max-w-sm">
          <div className="flex justify-center container">
            <Alert>
              {type === 'setting' ? (
                <AlertTitle className="text-center mt-4 text-color">
                  パスワードを登録しました。
                </AlertTitle>
              ) : (
                <AlertTitle className="text-center mt-4 text-color">
                  パスワードを変更しました。
                </AlertTitle>
              )}
              <AlertDescription className="flex justify-center text-color">
                {type === 'setting' || type === 'forget' ? (
                  <Link
                    href={
                      type === 'setting'
                        ? `/account/profile/${user.id}`
                        : `/login`
                    }
                    className="block mt-8">
                    <Button
                      type="button"
                      onClick={() => {
                        if (type === 'forget') {
                          setPage('checkSecretQuestion')
                        }
                      }}
                      className="border border-button-color bg-button flex items-center">
                      <p>戻る</p>
                    </Button>
                  </Link>
                ) : (
                  <Button
                    type="button"
                    onClick={() => setIsResettingPassword(false)}
                    className="border border-button-color bg-button flex items-center mt-8">
                    <p>戻る</p>
                  </Button>
                )}
              </AlertDescription>
            </Alert>
          </div>
        </div>
      )}
      {type === 'setting' && settingPage === 'secret' ? (
        <SettingSecret
          register={register}
          errors={errors}
          watcher={watcher}
          setSettingPage={setSettingPage}
        />
      ) : (
        <>
          {type === 'setting' && settingPage === 'password' && (
            <h2 className="mt-16 text-center">新しいパスワードを登録</h2>
          )}
          <form onSubmit={handleSubmit(submit)} className="container mt-8">
            <div className="flex flex-col">
              <label htmlFor="password" className="block text-start">
                パスワード
              </label>
              <input
                id="password"
                type="password"
                placeholder="password#123!"
                className="border w-full text-sm pl-1 h-8"
                {...register(`password`)}
              />
              <small className="block text-start">
                半角英字、数字、記号をそれぞれ１文字以上含め、
                <br />8 文字以上で入力してください。
              </small>
              {errors.password && (
                <div className="text-red-400 w-full text-start text-sm">
                  {errors.password.message}
                </div>
              )}
            </div>
            <div className="mt-8">
              <label
                htmlFor="passwordConfirmation"
                className="block text-start">
                パスワード再入力
              </label>
              <input
                id="passwordConfirmation"
                type="password"
                placeholder="password#123!"
                className="border w-full text-sm pl-1 h-8"
                {...register(`passwordConfirmation`)}
              />
              {errors.passwordConfirmation && (
                <div className="text-red-400 w-full text-start text-sm">
                  {errors.passwordConfirmation.message}
                </div>
              )}
            </div>
            <div className="flex justify-around mt-16">
              {type === 'setting' ? (
                <>
                  <Link href={`/account/profile/${user.id}`} className="block">
                    <Button
                      type="button"
                      className="border border-button-color bg-button flex items-center">
                      <p>戻る</p>
                    </Button>
                  </Link>
                  <Button
                    type="submit"
                    className="border border-button-color bg-button flex items-center">
                    <p>登録</p>
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    type="button"
                    onClick={() => setIsResettingPassword(false)}
                    className="border border-button-color bg-button flex mx-auto items-center">
                    <p>やめる</p>
                  </Button>
                  <Button
                    type="submit"
                    className="border border-button-color bg-button flex mx-auto items-center">
                    <p>変更</p>
                  </Button>
                </>
              )}
            </div>
          </form>
        </>
      )}
    </main>
  )
}

export default SettingPassword
