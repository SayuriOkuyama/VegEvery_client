'use client'

import Link from 'next/link'
import { PiBooksThin } from 'react-icons/pi'
import { IconContext } from 'react-icons'
import { PiUserRectangleThin } from 'react-icons/pi'
import { Suspense } from 'react'
import Loading from '@/components/layouts/Loading'
import { PiNotebookLight } from 'react-icons/pi'
import { CiLogout } from 'react-icons/ci'
import { useAuth } from '@/hooks/auth'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const page = () => {
  const { user, logout } = useAuth({ middleware: 'auth' })
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [])

  // console.log(user)

  if (!user) return <Loading />
  return (
    <>
      <main className="pb-24 mt-16 container flex justify-around items-center">
        <Suspense fallback={<Loading />}>
          <div className="grid grid-cols-2 gap-4 sm:gap-20">
            {/* <div className="flex justify-around"> */}
            <div className="border border-button-color rounded-md w-36 h-40">
              <Link
                href={`/bookshelves/${user.id}`}
                className="h-40 flex flex-col justify-around pb-2">
                <p className="text-center pt-2 h-10">本棚一覧</p>
                <IconContext.Provider
                  value={{ size: '85px', className: 'mx-auto h-30' }}>
                  <PiBooksThin />
                </IconContext.Provider>
              </Link>
            </div>
            <div className="border border-button-color rounded-md w-36 h-40">
              {/* <Link
              href={'/account/memo'}
              className="h-40 flex flex-col justify-around pb-2"> */}
              <div className="h-40 flex flex-col justify-around pb-2">
                <p className="text-center p-2">メモの作成</p>
                <small className="block text-center">(※準備中)</small>
                <IconContext.Provider
                  value={{ size: '75px', className: 'mx-auto' }}>
                  <PiNotebookLight />
                </IconContext.Provider>
              </div>

              {/* </Link> */}
            </div>
            {/* </div>
          <div className="flex justify-around"> */}
            <div className="border border-button-color rounded-md w-36 h-40 mt-8">
              <Link
                href={`/account/profile/${user.id}`}
                className="h-40 flex flex-col justify-around pb-2">
                <p className="text-center p-2">アカウント設定</p>
                <IconContext.Provider
                  value={{ size: '90px', className: 'mx-auto' }}>
                  <PiUserRectangleThin />
                </IconContext.Provider>
              </Link>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <div className="border border-button-color rounded-md w-36 h-40 mt-8">
                  <button className="h-40 w-36 flex flex-col justify-around pb-2">
                    <p className="text-center w-full p-2">ログアウト</p>
                    <IconContext.Provider
                      value={{
                        size: '80px',
                        className: 'mx-auto flex items-center',
                      }}>
                      <CiLogout />
                    </IconContext.Provider>
                  </button>
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>本当にログアウトしますか？</DialogTitle>
                </DialogHeader>
                <DialogFooter>
                  <Button
                    onClick={logout}
                    className="mx-auto bg-button border-button-color">
                    ログアウト
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            {/* </div> */}
          </div>
        </Suspense>
      </main>
    </>
  )
}

export default page
