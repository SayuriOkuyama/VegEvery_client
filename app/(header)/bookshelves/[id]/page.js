'use client'

import { PiBooksThin } from 'react-icons/pi'
import { IconContext } from 'react-icons'
import { CiCirclePlus } from 'react-icons/ci'
import { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import Shelf from '@/components/layouts/bookshelves/Shelf'
import { useAuth } from '@/hooks/auth'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const page = () => {
  const [bookshelves, setBookshelves] = useState()
  const { user, csrf } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!user) return

    const getBookshelves = async () => {
      await csrf()
      const res = await axios.get(`/api/bookshelves/${user.id}`)
      // console.log(res.data)
      setBookshelves(res.data)
    }
    getBookshelves()
  }, [user])

  const bookshelfFormSchema = z.object({
    name: z
      .string()
      .min(1, {
        message: '※ 入力が必須です。',
      })
      .max(30, {
        message: '※ 30 文字以内で入力してください。',
      }),
  })

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bookshelfFormSchema),
    defaultValues: {
      name: '',
    },
    mode: 'onChange',
  })

  const onSubmit = async value => {
    const response = await axios.post(`/api/bookshelves/${user.id}`, {
      user_id: user.id,
      name: value.name,
    })
    // console.log(response.data)
    const newBookshelf = response.data
    setBookshelves(prevState => {
      return {
        ...prevState,
        newBookshelf,
      }
    })
    reset()
    setIsOpen(false)
  }

  if (!user || !bookshelves) return <p>Loading...</p>
  return (
    <main className="pb-24 container mt-8">
      <h2 className="text-center mb-4">本棚一覧</h2>
      <p className="text-center mb-4">お気に入りの投稿を保存・整理</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 pt-1 pb-8 py-4 gap-4 ">
        {bookshelves.data &&
          bookshelves.data.length > 0 &&
          bookshelves.data.map(bookshelf => {
            return (
              <Shelf
                key={bookshelf.id}
                userId={bookshelf.user_id}
                bookshelfId={bookshelf.id}
                thumbnailUrl={bookshelf.thumbnailUrl}
                name={bookshelf.name}
              />
            )
          })}
        <div className="border border-button-color h-44">
          <div className="relative flex items-center flex-col justify-center h-full pt-4">
            <Popover open={isOpen} onOpenChange={setIsOpen}>
              <PopoverTrigger className="mx-auto px-8 py-2 opacity-70">
                <IconContext.Provider
                  value={{ size: '70px', className: 'mx-auto h-full block' }}>
                  <PiBooksThin />
                </IconContext.Provider>
                <IconContext.Provider
                  value={{
                    size: '32px',
                    className: 'mx-auto h-30 absolute right-6 top-1/4',
                  }}>
                  <CiCirclePlus />
                </IconContext.Provider>
              </PopoverTrigger>
              <PopoverContent className="h-fit">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <input
                    cols="30"
                    rows="10"
                    className="block mx-auto w-full"
                    {...register(`name`)}
                    placeholder="本棚名を入力"
                  />
                  {errors.name && (
                    <div className="text-red-400">{errors.name.message}</div>
                  )}
                  <Button
                    type="submit"
                    className="block h-8 mx-auto leading-none	bg-button border-button-color text-xs mt-2 py-2">
                    作成
                  </Button>
                </form>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </main>
  )
}

export default page
