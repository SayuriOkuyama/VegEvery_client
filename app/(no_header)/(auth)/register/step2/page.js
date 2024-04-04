'use client'

import Logo from '@/components/ui/Logo'
import { Button } from '@/components/ui/button'
// import Image from 'next/image'
import Link from 'next/link'
import React, { useContext } from 'react'
import { FormContext } from '@/contexts/registerProvider'
import { useRouter } from 'next/navigation'

const page = () => {
  const [register, setValue, , watch] = useContext(FormContext)
  const router = useRouter()
  const vegeType = watch('vegeType')

  const noStoreRoute = () => {
    setValue('vegeType', 'none')
    router.push('/register/step3')
  }

  return (
    <>
      <div className="pt-8">
        <Logo size="100" />
      </div>
      <main className="container mx-auto mt-8 pb-24">
        <div className="text-center space-y-3">
          <p className="text-center my-8">ベジタリアンの種類を選択</p>
          <div className="text-center space-y-4">
            <div>
              <label
                htmlFor="vegan"
                className="border flex flex-col w-full py-2 mx-auto text-center rounded-full hover:bg-orange-200 ">
                ヴィーガン
              </label>
              <input
                id="vegan"
                type="radio"
                hidden
                value="vegan"
                {...register(`vegeType`, 'name:vegeType')}
              />
            </div>
            <div>
              <label
                htmlFor="oriental_vegetarian"
                className="border flex flex-col w-full py-2 mx-auto text-center rounded-full hover:bg-orange-200 ">
                <input
                  id="oriental_vegetarian"
                  type="radio"
                  hidden
                  value="oriental_vegetarian"
                  {...register(`vegeType`, 'name:vegeType')}
                />
                オリエンタル・ベジタリアン
              </label>
            </div>
            <div>
              <label
                htmlFor="ovo_vegetarian"
                className="border flex flex-col w-full py-2 mx-auto text-center rounded-full hover:bg-orange-200 ">
                <input
                  id="ovo_vegetarian"
                  name="vegeType"
                  type="radio"
                  hidden
                  value="ovo_vegetarian"
                  {...register(`vegeType`, 'name:vegeType')}
                />
                オボ・ベジタリアン
              </label>
            </div>
            <div>
              <label
                htmlFor="pescatarian"
                className="border flex flex-col w-full py-2 mx-auto text-center rounded-full hover:bg-orange-200 ">
                <input
                  id="pescatarian"
                  name="vegeType"
                  type="radio"
                  hidden
                  value="pescatarian"
                  {...register(`vegeType`, 'name:vegeType')}
                />
                ペスカタリアン
              </label>
            </div>
            <div>
              <label
                htmlFor="lacto_vegetarian"
                className="border flex flex-col w-full py-2 mx-auto text-center rounded-full hover:bg-orange-200 ">
                <input
                  id="lacto_vegetarian"
                  name="vegeType"
                  type="radio"
                  hidden
                  value="lacto_vegetarian"
                  {...register(`vegeType`, 'name:vegeType')}
                />
                ラクト・ベジタリアン
              </label>
            </div>
            <div>
              <label
                htmlFor="pollo_vegetarian"
                className="border flex flex-col w-full py-2 mx-auto text-center rounded-full hover:bg-orange-200 ">
                <input
                  id="pollo_vegetarian"
                  name="vegeType"
                  type="radio"
                  hidden
                  value="pollo_vegetarian"
                  {...register(`vegeType`, 'name:vegeType')}
                />
                ポーヨ・ベジタリアン
              </label>
            </div>
            <div>
              <label
                htmlFor="fruitarian"
                className="border flex flex-col w-full py-2 mx-auto text-center rounded-full hover:bg-orange-200 ">
                <input
                  id="fruitarian"
                  name="vegeType"
                  type="radio"
                  hidden
                  value="fruitarian"
                  {...register(`vegeType`, 'name:vegeType')}
                />
                フルータリアン
              </label>
            </div>
            <div>
              <label
                htmlFor="other_vegetarian"
                className="border flex flex-col w-full py-2 mx-auto text-center rounded-full hover:bg-orange-200 ">
                <input
                  id="other_vegetarian"
                  name="vegeType"
                  type="radio"
                  hidden
                  value="other_vegetarian"
                  {...register(`vegeType`, 'name:vegeType')}
                />
                その他のベジタリアン
              </label>
            </div>
          </div>
        </div>

        {vegeType !== 'none' ? (
          <Link href={'/register/step3'}>
            <Button className="border flex items-center py-3 px-20 mt-8 mx-auto bg-button border-button-color">
              <p className="leading-none">次へ</p>
            </Button>
          </Link>
        ) : (
          <Button className="border flex items-center py-3 px-20 mt-8 mx-auto bg-button border-button-color disabled-text-color">
            <p className="leading-none">次へ</p>
          </Button>
        )}
        <div className="mx-auto w-18 mt-8 text-center">
          <button
            onClick={noStoreRoute}
            className="text-sm text-center border-b-2">
            今はしない
          </button>
        </div>
      </main>
    </>
  )
}

export default page
