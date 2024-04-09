'use client'

import Logo from '@/components/ui/Logo'
import { useContext } from 'react'
import { FormContext } from '@/contexts/registerProvider'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const page = () => {
  const [register, , , watch, errors] = useContext(FormContext)
  // const [errors, setErrors] = useState([])
  const watcher = watch()

  console.log(watcher)
  console.log(errors)
  console.log(errors.length)

  return (
    <>
      <div className="pt-8">
        <Logo size="100" />
      </div>
      <main className="container mx-auto mt-8">
        <div className="text-center space-y-4">
          <p className="text-center my-8">秘密の質問を設定</p>
          <div>
            <label htmlFor="name" className="block text-start">
              秘密の質問
            </label>
            <input
              id="name"
              type="text"
              placeholder="初めての海外旅行で行った場所は？"
              className="border w-full text-sm pl-1 h-8"
              {...register(`secretQuestion`)}
            />
            {errors.secretQuestion && (
              <div className="text-red-400 w-full text-start text-sm">
                {errors.secretQuestion.message}
              </div>
            )}
          </div>
          <div>
            <label htmlFor="password" className="block text-start">
              秘密の質問の答え
            </label>
            <input
              id="password"
              type="text"
              placeholder="フランスのルーヴル美術館"
              className="border w-full text-sm pl-1 h-8"
              {...register(`secretAnswer`)}
            />
            {errors.secretAnswer && (
              <div className="text-red-400 w-full text-start text-sm">
                {errors.secretAnswer.message}
              </div>
            )}
          </div>
        </div>
        {!errors.length && watcher.secretAnswer && watcher.secretAnswer ? (
          <Link href={'/register/check'}>
            <Button className="border flex items-center py-3 px-20 mt-8 mx-auto bg-button border-button-color">
              <p className="leading-none">次へ</p>
            </Button>
          </Link>
        ) : (
          <Button className="border flex items-center py-3 px-20 mt-8 mx-auto bg-button border-button-color disabled-text-color">
            <p className="leading-none">次へ</p>
          </Button>
        )}
      </main>
    </>
  )
}

export default page
