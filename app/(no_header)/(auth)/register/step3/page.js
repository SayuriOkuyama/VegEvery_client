'use client'

import Logo from '@/components/ui/Logo'
import { Button } from '@/components/ui/button'
// import Image from 'next/image'
import Link from 'next/link'
import React, { useContext, useState } from 'react'
import { FormContext } from '@/contexts/registerProvider'
import { useDropzone } from 'react-dropzone'
import { PiCameraLight } from 'react-icons/pi'
import { IconContext } from 'react-icons'
import { useRouter } from 'next/navigation'

const page = () => {
  const [, setValue] = useContext(FormContext)
  const [image, setImage] = useState(null)
  const router = useRouter()

  const noStoreRoute = () => {
    setValue('iconUrl', '')
    setValue('iconFile', '')
    router.push('/register/step4')
  }

  const onDrop = acceptedFiles => {
    const file = acceptedFiles[0]
    setValue('iconUrl', URL.createObjectURL(file))
    setValue('iconFile', file)
    setImage({
      file,
      image: URL.createObjectURL(file),
    })
  }

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  return (
    <>
      <div className="pt-8">
        <Logo size="100" />
      </div>
      <main className="container mx-auto mt-8">
        <div className="text-center space-y-3">
          <p className="text-center my-4">プロフィール画像を選択</p>
          <div className="bg-orange rounded-full h-40 w-40 mx-auto">
            {image ? (
              <div className="image-preview relative flex h-40 w-40 rounded-full">
                <button
                  className="absolute right-1 bottom-1 bg-white w-10 h-10 leading-none border rounded-full text-center"
                  type="button"
                  onClick={() => {
                    setValue('iconUrl', '')
                    setValue('iconFile', '')
                    setImage('')
                  }}>
                  ✕
                </button>
                <img
                  src={image.image}
                  className="object-cover w-full h-full block rounded-full"
                  alt="Uploaded Image"
                />
              </div>
            ) : (
              <div {...getRootProps()} className="h-40 w-40 rounded-full">
                <input {...getInputProps()} />
                <div className="h-full flex justify-center items-center">
                  <IconContext.Provider value={{ color: '#ccc', size: '80px' }}>
                    <PiCameraLight />
                  </IconContext.Provider>
                </div>
              </div>
            )}
          </div>
        </div>
        {image ? (
          <Link href={'/register/step4'}>
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
